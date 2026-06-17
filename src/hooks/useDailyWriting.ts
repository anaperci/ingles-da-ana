import { useCallback, useMemo } from 'react'
import { useLocalStore } from './useLocalStore'
import { useProgress } from './useProgress'
import { STORAGE_KEYS } from '@/lib/keys'
import { todayKey } from '@/lib/storage'
import { COMMON_WORDS } from '@/data/commonWords'
import {
  initialSrsState,
  reviewSrs,
  isMastered,
  type SrsState,
} from '@/lib/srs'
import {
  DAILY_SENTENCE_GOAL,
  type DailySentence,
  type DailyWritingDay,
  type DailyWritingStore,
  type WritingFeedback,
} from '@/types/writing'

const DAY_MS = 24 * 60 * 60 * 1000

/** Quantas palavras de revisão, no máximo, podem ocupar o dia (deixa espaço pra palavras novas). */
const REVIEW_CAP = 15

type SrsMap = Record<string, SrsState>

/** Busca rápida da palavra pelo id. */
const WORD_BY_ID = new Map(COMMON_WORDS.map((w) => [w.id, w]))

/** Índice estável do dia (dias desde a época) a partir de YYYY-MM-DD. */
function dayIndex(dateKey: string): number {
  const ms = Date.parse(`${dateKey}T00:00:00`)
  return Number.isNaN(ms) ? 0 : Math.floor(ms / DAY_MS)
}

/** Fim do dia (ms) — usado para “está vencido para revisão hoje?” com granularidade de dia. */
function endOfDayMs(dateKey: string): number {
  const ms = Date.parse(`${dateKey}T23:59:59`)
  return Number.isNaN(ms) ? Date.now() : ms
}

/**
 * Palavras vencidas para revisão até o fim de `dateKey`, mais atrasadas primeiro.
 * Só entram palavras que já foram avaliadas (têm estado SRS), que existem na
 * lista e que ainda NÃO foram dominadas.
 */
function dueReviewIds(srs: SrsMap, dateKey: string): string[] {
  const cutoff = endOfDayMs(dateKey)
  const ids = Object.keys(srs).filter(
    (id) =>
      WORD_BY_ID.has(id) &&
      srs[id].lastReviewed != null &&
      !isMastered(srs[id]) &&
      srs[id].dueDate <= cutoff
  )
  ids.sort((a, b) => srs[a].dueDate - srs[b].dueDate)
  return ids
}

function sentenceFor(id: string, review: boolean): DailySentence {
  const w = WORD_BY_ID.get(id)!
  return { wordId: id, word: w.word, translation: w.translation, text: '', review }
}

/**
 * Seleciona as 30 palavras-alvo do dia: primeiro as que voltaram da fila de
 * revisão (erradas antes), depois palavras novas de uma janela rotativa pela
 * lista das 1000. A seleção é estável dentro do dia (não muda ao recarregar).
 */
function pickTargets(dateKey: string, srs: SrsMap): DailySentence[] {
  const reviewIds = dueReviewIds(srs, dateKey).slice(0, REVIEW_CAP)
  const chosen = new Set(reviewIds)
  const out: DailySentence[] = reviewIds.map((id) => sentenceFor(id, true))

  const total = COMMON_WORDS.length
  const start = (dayIndex(dateKey) * DAILY_SENTENCE_GOAL) % total
  for (let i = 0; i < total && out.length < DAILY_SENTENCE_GOAL; i++) {
    const w = COMMON_WORDS[(start + i) % total]
    if (chosen.has(w.id)) continue
    chosen.add(w.id)
    out.push({ wordId: w.id, word: w.word, translation: w.translation, text: '', review: false })
  }
  return out
}

function buildDay(dateKey: string, srs: SrsMap): DailyWritingDay {
  return { date: dateKey, sentences: pickTargets(dateKey, srs), completed: false }
}

/**
 * Reconcilia o dia salvo. O conjunto de palavras do dia é CONGELADO quando o dia
 * é criado (pra fila de revisão não embaralhar ao longo do dia). Aqui só
 * reconstruímos se o dia salvo estiver corrompido (palavras repetidas / faltando),
 * preservando o texto e o "não sei" já escritos por palavra.
 */
function reconcile(
  stored: DailyWritingDay | undefined,
  dateKey: string,
  srs: SrsMap
): DailyWritingDay {
  if (!stored) return buildDay(dateKey, srs)

  const ids = stored.sentences.map((s) => s.wordId)
  const valid =
    stored.sentences.length === DAILY_SENTENCE_GOAL &&
    new Set(ids).size === DAILY_SENTENCE_GOAL
  if (valid) return { ...stored, date: dateKey }

  // corrompido: reconstrói preservando o que já foi escrito
  const fresh = buildDay(dateKey, srs)
  const byId = new Map<string, DailySentence>()
  for (const s of stored.sentences) {
    const prev = byId.get(s.wordId)
    if (!prev || (!prev.text.trim() && s.text.trim())) byId.set(s.wordId, s)
  }
  const sentences = fresh.sentences.map((c) => {
    const prev = byId.get(c.wordId)
    return prev ? { ...c, text: prev.text, dontKnow: prev.dontKnow } : c
  })
  return { ...stored, date: dateKey, sentences }
}

export function useDailyWriting() {
  const [store, setStore] = useLocalStore<DailyWritingStore>(
    STORAGE_KEYS.dailyWriting,
    {}
  )
  const [srs, setSrs] = useLocalStore<SrsMap>(STORAGE_KEYS.writingSrs, {})
  const { addSession } = useProgress()

  const date = todayKey()
  const today = reconcile(store[date], date, srs)

  const writtenCount = useMemo(
    () => today.sentences.filter((s) => s.text.trim().length > 0).length,
    [today.sentences]
  )

  const markedCount = useMemo(
    () => today.sentences.filter((s) => s.dontKnow).length,
    [today.sentences]
  )

  const reviewCount = useMemo(
    () => today.sentences.filter((s) => s.review).length,
    [today.sentences]
  )

  const setSentence = useCallback(
    (wordId: string, text: string) => {
      setStore((prev) => {
        const day = reconcile(prev[date], date, srs)
        const sentences = day.sentences.map((s) =>
          s.wordId === wordId ? { ...s, text } : s
        )
        return { ...prev, [date]: { ...day, sentences } }
      })
    },
    [date, setStore, srs]
  )

  /** Liga/desliga "não sei" para uma palavra (limpa o texto ao marcar). */
  const toggleDontKnow = useCallback(
    (wordId: string) => {
      setStore((prev) => {
        const day = reconcile(prev[date], date, srs)
        const sentences = day.sentences.map((s) =>
          s.wordId === wordId
            ? { ...s, dontKnow: !s.dontKnow, text: !s.dontKnow ? '' : s.text }
            : s
        )
        return { ...prev, [date]: { ...day, sentences } }
      })
    },
    [date, setStore, srs]
  )

  /**
   * Finaliza o dia: guarda a avaliação da IA, alimenta a fila de revisão
   * (erros voltam noutro dia, acertos avançam até dominar) e registra a sessão.
   */
  const complete = useCallback(
    (feedback?: WritingFeedback) => {
      if (feedback) {
        setSrs((prev) => {
          const next: SrsMap = { ...prev }
          for (const it of feedback.items) {
            if (!WORD_BY_ID.has(it.wordId)) continue
            const existing = next[it.wordId]
            // acertou de primeira e nunca errou antes → não entra na fila
            if (!existing && it.ok) continue
            const cur = existing ?? initialSrsState()
            // acertou → qualidade 5 (espaça até dominar); errou → 1 (volta amanhã)
            next[it.wordId] = reviewSrs(cur, it.ok ? 5 : 1)
          }
          return next
        })
      }
      setStore((prev) => {
        const day = reconcile(prev[date], date, srs)
        return { ...prev, [date]: { ...day, completed: true, feedback } }
      })
      addSession({
        module: 'writing',
        title: `${DAILY_SENTENCE_GOAL} frases do dia`,
        score: feedback ? feedback.score : null,
        minutes: 15,
      })
    },
    [date, setStore, setSrs, srs, addSession]
  )

  return {
    date,
    today,
    sentences: today.sentences,
    writtenCount,
    markedCount,
    reviewCount,
    goal: DAILY_SENTENCE_GOAL,
    completed: today.completed,
    feedback: today.feedback,
    setSentence,
    toggleDontKnow,
    complete,
  }
}
