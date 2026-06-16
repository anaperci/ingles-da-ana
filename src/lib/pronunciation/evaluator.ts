/**
 * Avaliador de pronúncia por comparação textual (pura, sem DOM, testável).
 *
 * Recebe a frase de referência e a transcrição do reconhecedor de fala,
 * alinha palavra a palavra (distância de edição) e classifica cada palavra
 * da referência como matched / partial / missing, além de listar inserções
 * (extras). Produz o shape agnóstico `PronunciationAssessment`.
 *
 * Trocar isto por uma avaliação fonética (Azure) é só fazer o outro motor
 * devolver o mesmo `PronunciationAssessment` — a UI não muda.
 */
import type {
  PronunciationAssessment,
  WordAssessment,
  WordStatus,
} from './types'

/** Limiar de similaridade de caracteres para considerar uma palavra "parcial". */
const PARTIAL_THRESHOLD = 0.6

/** Normaliza texto: minúsculas, sem pontuação, espaços colapsados. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // tira acentos
    .replace(/[^a-z0-9\s]/g, ' ') // pontuação/apóstrofos viram espaço
    .replace(/\s+/g, ' ')
    .trim()
}

export function tokenize(text: string): string[] {
  const n = normalize(text)
  return n.length ? n.split(' ') : []
}

/** Distância de Levenshtein entre duas strings (nível de caractere). */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  let curr = new Array<number>(b.length + 1)
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost)
    }
    ;[prev, curr] = [curr, prev]
  }
  return prev[b.length]
}

/** Similaridade 0-1 entre duas palavras (1 = idênticas). */
export function wordSimilarity(a: string, b: string): number {
  if (!a && !b) return 1
  const max = Math.max(a.length, b.length)
  if (max === 0) return 1
  return 1 - levenshtein(a, b) / max
}

type Op = 'equal' | 'sub' | 'del' | 'ins'
interface Step {
  op: Op
  ref?: string
  hyp?: string
}

/**
 * Alinhamento de sequências de palavras (referência × transcrição) via
 * programação dinâmica com backtrace, devolvendo as operações em ordem.
 */
function alignWords(ref: string[], hyp: string[]): Step[] {
  const m = ref.length
  const n = hyp.length
  const d: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0)
  )
  for (let i = 0; i <= m; i++) d[i][0] = i
  for (let j = 0; j <= n; j++) d[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = ref[i - 1] === hyp[j - 1] ? 0 : 1
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deleção (palavra da referência não dita)
        d[i][j - 1] + 1, // inserção (palavra dita a mais)
        d[i - 1][j - 1] + cost // match / substituição
      )
    }
  }

  // backtrace
  const steps: Step[] = []
  let i = m
  let j = n
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0) {
      const cost = ref[i - 1] === hyp[j - 1] ? 0 : 1
      if (d[i][j] === d[i - 1][j - 1] + cost) {
        steps.push({
          op: cost === 0 ? 'equal' : 'sub',
          ref: ref[i - 1],
          hyp: hyp[j - 1],
        })
        i--
        j--
        continue
      }
    }
    if (i > 0 && d[i][j] === d[i - 1][j] + 1) {
      steps.push({ op: 'del', ref: ref[i - 1] })
      i--
      continue
    }
    steps.push({ op: 'ins', hyp: hyp[j - 1] })
    j--
  }
  return steps.reverse()
}

function round(n: number): number {
  return Math.round(n)
}

/** Avalia a fala comparando a transcrição com a frase de referência. */
export function evaluatePronunciation(
  reference: string,
  transcript: string
): PronunciationAssessment {
  const refTokens = tokenize(reference)
  const hypTokens = tokenize(transcript)
  const steps = alignWords(refTokens, hypTokens)

  const words: WordAssessment[] = []
  const extras: string[] = []

  for (const step of steps) {
    if (step.op === 'ins') {
      if (step.hyp) extras.push(step.hyp)
      continue
    }
    // qualquer passo com palavra de referência (equal/sub/del)
    const ref = step.ref as string
    let status: WordStatus
    let score: number
    if (step.op === 'equal') {
      status = 'matched'
      score = 100
    } else if (step.op === 'del') {
      status = 'missing'
      score = 0
    } else {
      // substituição: usa similaridade de caracteres
      const sim = wordSimilarity(ref, step.hyp ?? '')
      if (sim >= PARTIAL_THRESHOLD) {
        status = 'partial'
        score = round(sim * 100)
      } else {
        status = 'missing'
        score = 0
      }
    }
    words.push({ word: ref, status, score })
  }

  const total = words.length
  const attempted = words.filter((w) => w.status !== 'missing')
  const accuracyScore =
    attempted.length > 0
      ? round(attempted.reduce((s, w) => s + w.score, 0) / attempted.length)
      : 0
  const completenessScore =
    total > 0 ? round((attempted.length / total) * 100) : 0
  // compreensibilidade: média sobre TODAS as palavras da referência
  // (faltantes entram como 0), refletindo quanto da frase chegou.
  const overallScore =
    total > 0 ? round(words.reduce((s, w) => s + w.score, 0) / total) : 0

  return {
    overallScore,
    accuracyScore,
    completenessScore,
    transcript: transcript.trim(),
    words,
    extras,
  }
}
