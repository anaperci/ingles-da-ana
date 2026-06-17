/**
 * Pontuação da Escrita — acumula dia a dia.
 *
 * Tudo é DERIVADO do store `writing:daily` (cada dia já guarda as frases e a
 * avaliação da IA com `ok` por frase). Sem chave nova, sem risco de
 * dessincronizar: a pontuação é sempre um reflexo fiel do que foi escrito.
 *
 * Regras (simples e transparentes):
 *   • +10 por frase escrita        (esforço)
 *   • +15 por frase correta        (acerto, a IA marcou `ok`)
 *   • +20 ao concluir a tarefa do dia (bônus de constância)
 */
import type { DailyWritingDay } from '@/types/writing'

export const WRITING_POINTS = {
  perWritten: 10,
  perCorrect: 15,
  dailyBonus: 20,
  /** acertou uma palavra que tinha voltado da revisão = dominou de vez */
  perReviewCleared: 10,
} as const

export interface DayScore {
  date: string
  /** frases efetivamente escritas (com texto, sem "não sei") */
  written: number
  /** frases que a IA marcou como corretas */
  correct: number
  /** palavras de revisão que voltaram e foram acertadas */
  reviewCleared: number
  completed: boolean
  points: number
}

/** Pontos de UM dia de escrita. */
export function scoreDay(day: DailyWritingDay): DayScore {
  const written = day.sentences.filter((s) => s.text.trim() && !s.dontKnow).length
  const correct = day.feedback ? day.feedback.items.filter((it) => it.ok).length : 0

  // bônus por dominar palavras que tinham voltado da fila de revisão
  const reviewIds = new Set(day.sentences.filter((s) => s.review).map((s) => s.wordId))
  const reviewCleared = day.feedback
    ? day.feedback.items.filter((it) => it.ok && reviewIds.has(it.wordId)).length
    : 0

  const points =
    written * WRITING_POINTS.perWritten +
    correct * WRITING_POINTS.perCorrect +
    reviewCleared * WRITING_POINTS.perReviewCleared +
    (day.completed ? WRITING_POINTS.dailyBonus : 0)
  return {
    date: day.date,
    written,
    correct,
    reviewCleared,
    completed: !!day.completed,
    points,
  }
}

export interface WritingLevel {
  level: number
  name: string
  /** pontos mínimos para alcançar este nível */
  min: number
}

/** Escada de níveis — nomes curtos, tema de escrita. */
export const WRITING_LEVELS: WritingLevel[] = [
  { level: 1, name: 'Starter', min: 0 },
  { level: 2, name: 'Writer', min: 150 },
  { level: 3, name: 'Storyteller', min: 400 },
  { level: 4, name: 'Wordsmith', min: 800 },
  { level: 5, name: 'Author', min: 1400 },
  { level: 6, name: 'Master', min: 2200 },
]

export interface LevelInfo {
  current: WritingLevel
  next: WritingLevel | null
  /** pontos já conquistados dentro do nível atual */
  intoLevel: number
  /** pontos que separam o nível atual do próximo */
  span: number
  /** progresso 0-100 rumo ao próximo nível (100 se já no topo) */
  pct: number
  /** pontos que faltam para o próximo nível (0 se no topo) */
  toNext: number
}

/** Em que nível está, e quanto falta para o próximo, dado o total acumulado. */
export function levelFor(total: number): LevelInfo {
  let current = WRITING_LEVELS[0]
  for (const l of WRITING_LEVELS) if (total >= l.min) current = l
  const idx = WRITING_LEVELS.indexOf(current)
  const next = WRITING_LEVELS[idx + 1] ?? null
  const intoLevel = total - current.min
  const span = next ? next.min - current.min : 0
  const pct = next ? Math.min(100, Math.round((intoLevel / span) * 100)) : 100
  const toNext = next ? Math.max(0, next.min - total) : 0
  return { current, next, intoLevel, span, pct, toNext }
}
