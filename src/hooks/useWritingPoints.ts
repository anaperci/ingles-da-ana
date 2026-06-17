import { useMemo } from 'react'
import { useLocalStore } from './useLocalStore'
import { STORAGE_KEYS } from '@/lib/keys'
import { todayKey } from '@/lib/storage'
import type { DailyWritingStore } from '@/types/writing'
import { scoreDay, levelFor, type DayScore, type LevelInfo } from '@/lib/writingPoints'

export interface WritingPoints {
  /** total acumulado (só dias concluídos contam — número estável) */
  total: number
  /** pontos do dia de hoje (ao vivo, mesmo antes de concluir) */
  todayPoints: number
  /** detalhamento de hoje, ou null se ainda não escreveu nada hoje */
  todayScore: DayScore | null
  level: LevelInfo
  /** dias seguidos com escrita concluída (até hoje ou ontem) */
  streak: number
  /** quantos dias de escrita já foram concluídos no total */
  daysCompleted: number
}

/** Pontuação da Escrita, derivada do store `writing:daily`. */
export function useWritingPoints(): WritingPoints {
  const [store] = useLocalStore<DailyWritingStore>(STORAGE_KEYS.dailyWriting, {})

  return useMemo(() => {
    const days = Object.values(store)
    const scored = days.map(scoreDay)

    const completed = scored.filter((d) => d.completed)
    const total = completed.reduce((acc, d) => acc + d.points, 0)

    const tKey = todayKey()
    const todayScore = store[tKey] ? scoreDay(store[tKey]) : null
    const todayPoints = todayScore?.points ?? 0

    // streak: dias seguidos concluídos, contando de hoje (ou ontem) para trás
    const done = new Set(completed.map((d) => d.date))
    const cursor = new Date()
    if (!done.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1)
    let streak = 0
    while (done.has(todayKey(cursor))) {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    }

    return {
      total,
      todayPoints,
      todayScore,
      level: levelFor(total),
      streak,
      daysCompleted: completed.length,
    }
  }, [store])
}
