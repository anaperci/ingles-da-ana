import { useCallback, useMemo } from 'react'
import { useLocalStore } from './useLocalStore'
import { useProgress } from './useProgress'
import { STORAGE_KEYS } from '@/lib/keys'
import { todayKey } from '@/lib/storage'
import { COMMON_WORDS } from '@/data/commonWords'
import {
  DAILY_SENTENCE_GOAL,
  type DailySentence,
  type DailyWritingDay,
  type DailyWritingStore,
  type WritingFeedback,
} from '@/types/writing'

const DAY_MS = 24 * 60 * 60 * 1000

/** Índice estável do dia (dias desde a época) a partir de YYYY-MM-DD. */
function dayIndex(dateKey: string): number {
  const ms = Date.parse(`${dateKey}T00:00:00`)
  return Number.isNaN(ms) ? 0 : Math.floor(ms / DAY_MS)
}

/**
 * Seleciona as 30 palavras-alvo do dia de forma determinística: a cada dia
 * avança uma "janela" de 30 palavras pela lista das 1000, cobrindo todas a
 * cada ~33 dias. Estável durante o dia inteiro (não muda ao recarregar).
 */
function pickTargets(dateKey: string): DailySentence[] {
  const total = COMMON_WORDS.length
  const start = (dayIndex(dateKey) * DAILY_SENTENCE_GOAL) % total
  const out: DailySentence[] = []
  for (let i = 0; i < DAILY_SENTENCE_GOAL; i++) {
    const w = COMMON_WORDS[(start + i) % total]
    out.push({
      wordId: w.id,
      word: w.word,
      translation: w.translation,
      text: '',
    })
  }
  return out
}

function buildDay(dateKey: string): DailyWritingDay {
  return { date: dateKey, sentences: pickTargets(dateKey), completed: false }
}

export function useDailyWriting() {
  const [store, setStore] = useLocalStore<DailyWritingStore>(
    STORAGE_KEYS.dailyWriting,
    {}
  )
  const { addSession } = useProgress()

  const date = todayKey()
  const today = store[date] ?? buildDay(date)

  const writtenCount = useMemo(
    () => today.sentences.filter((s) => s.text.trim().length > 0).length,
    [today.sentences]
  )

  const markedCount = useMemo(
    () => today.sentences.filter((s) => s.dontKnow).length,
    [today.sentences]
  )

  const setSentence = useCallback(
    (wordId: string, text: string) => {
      setStore((prev) => {
        const day = prev[date] ?? buildDay(date)
        const sentences = day.sentences.map((s) =>
          s.wordId === wordId ? { ...s, text } : s
        )
        return { ...prev, [date]: { ...day, sentences } }
      })
    },
    [date, setStore]
  )

  /** Liga/desliga "não sei" para uma palavra (limpa o texto ao marcar). */
  const toggleDontKnow = useCallback(
    (wordId: string) => {
      setStore((prev) => {
        const day = prev[date] ?? buildDay(date)
        const sentences = day.sentences.map((s) =>
          s.wordId === wordId
            ? { ...s, dontKnow: !s.dontKnow, text: !s.dontKnow ? '' : s.text }
            : s
        )
        return { ...prev, [date]: { ...day, sentences } }
      })
    },
    [date, setStore]
  )

  /** Finaliza o dia: guarda a avaliação da IA e registra a sessão. */
  const complete = useCallback(
    (feedback?: WritingFeedback) => {
      setStore((prev) => {
        const day = prev[date] ?? buildDay(date)
        return { ...prev, [date]: { ...day, completed: true, feedback } }
      })
      addSession({
        module: 'writing',
        title: `${DAILY_SENTENCE_GOAL} frases do dia`,
        score: feedback ? feedback.score : null,
        minutes: 15,
      })
    },
    [date, setStore, addSession]
  )

  return {
    date,
    today,
    sentences: today.sentences,
    writtenCount,
    markedCount,
    goal: DAILY_SENTENCE_GOAL,
    completed: today.completed,
    feedback: today.feedback,
    setSentence,
    toggleDontKnow,
    complete,
  }
}
