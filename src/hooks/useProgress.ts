import { useMemo } from 'react'
import { useLocalStore } from './useLocalStore'
import { STORAGE_KEYS } from '@/lib/keys'
import { isMastered, type SrsState } from '@/lib/srs'
import { todayKey } from '@/lib/storage'
import type { PracticeSession, UnifiedProgress } from '@/types'

type SrsMap = Record<string, SrsState>

function countMastered(key: string): number {
  try {
    const raw = localStorage.getItem('ingles-da-ana:' + key)
    if (!raw) return 0
    const map = JSON.parse(raw) as SrsMap
    return Object.values(map).filter((s) => isMastered(s)).length
  } catch {
    return 0
  }
}

function computeStreak(activeDays: string[]): { current: number; longest: number } {
  if (activeDays.length === 0) return { current: 0, longest: 0 }
  const days = [...new Set(activeDays)].sort()
  const set = new Set(days)

  // streak atual: conta a partir de hoje (ou ontem) para trás
  let current = 0
  const cursor = new Date()
  // se não praticou hoje, começa de ontem para não zerar antes do fim do dia
  if (!set.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1)
  while (set.has(todayKey(cursor))) {
    current += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  // maior streak histórico
  let longest = 1
  let run = 1
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1])
    const curr = new Date(days[i])
    const diff = (curr.getTime() - prev.getTime()) / (24 * 60 * 60 * 1000)
    if (diff === 1) run += 1
    else run = 1
    if (run > longest) longest = run
  }

  return { current, longest }
}

export function useProgress() {
  const [sessions, setSessions] = useLocalStore<PracticeSession[]>(
    STORAGE_KEYS.sessions,
    []
  )

  const progress = useMemo<UnifiedProgress>(() => {
    const activeDays = sessions.map((s) => s.date.slice(0, 10))
    const { current, longest } = computeStreak(activeDays)
    const scored = sessions.filter((s) => s.score != null)
    const averageScore =
      scored.length > 0
        ? Math.round(
            scored.reduce((acc, s) => acc + (s.score ?? 0), 0) / scored.length
          )
        : 0
    const practiceMinutes = sessions.reduce((acc, s) => acc + s.minutes, 0)

    return {
      streak: current,
      longestStreak: longest,
      wordsMastered: countMastered(STORAGE_KEYS.vocabularyProgress),
      verbsMastered: countMastered(STORAGE_KEYS.verbsProgress),
      practiceMinutes,
      averageScore,
      activeDays: [...new Set(activeDays)],
    }
  }, [sessions])

  function addSession(session: Omit<PracticeSession, 'id' | 'date'>) {
    const entry: PracticeSession = {
      ...session,
      id: `${session.module}-${Date.now()}-${Math.round(performance.now())}`,
      date: new Date().toISOString(),
    }
    setSessions((prev) => [entry, ...prev].slice(0, 200))
  }

  return { progress, sessions, addSession, setSessions }
}
