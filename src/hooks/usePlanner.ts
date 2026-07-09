import { useCallback, useMemo } from 'react'
import { useLocalStore } from './useLocalStore'
import { PLANNER_TOTAL_DAYS, weekOf } from '@/data/plannerMeta'

export type PlannerTask = 'lesson' | 'quiz' | 'activity'

type DoneMap = Record<string, boolean>

const k = (day: number, t: PlannerTask) => `${day}-${t}`

/**
 * Progresso do planner (52 semanas) — persistido em localStorage + sync na nuvem.
 * Usa só os metadados leves (não importa o texto das atividades), pra poder
 * rodar na Home sem peso.
 */
export function usePlanner() {
  const [done, setDone] = useLocalStore<DoneMap>('planner:progress', {})

  const isDone = useCallback((day: number, t: PlannerTask) => !!done[k(day, t)], [done])

  const toggle = useCallback(
    (day: number, t: PlannerTask) =>
      setDone((prev) => ({ ...prev, [k(day, t)]: !prev[k(day, t)] })),
    [setDone]
  )

  // O dia fecha com aula + atividade (o quiz do curso não é mais exigido).
  const dayComplete = useCallback(
    (day: number) => !!done[k(day, 'lesson')] && !!done[k(day, 'activity')],
    [done]
  )

  const stats = useMemo(() => {
    let completedDays = 0
    let completedTasks = 0
    for (let day = 1; day <= PLANNER_TOTAL_DAYS; day++) {
      const l = !!done[k(day, 'lesson')]
      const a = !!done[k(day, 'activity')]
      completedTasks += (l ? 1 : 0) + (a ? 1 : 0)
      if (l && a) completedDays += 1
    }
    return {
      completedDays,
      totalDays: PLANNER_TOTAL_DAYS,
      completedTasks,
      totalTasks: PLANNER_TOTAL_DAYS * 2,
      pct: Math.round((completedDays / PLANNER_TOTAL_DAYS) * 100),
    }
  }, [done])

  /** Próximo dia a fazer (primeiro não concluído). */
  const currentDay = useMemo(() => {
    for (let day = 1; day <= PLANNER_TOTAL_DAYS; day++) {
      if (!(done[k(day, 'lesson')] && done[k(day, 'activity')])) return day
    }
    return PLANNER_TOTAL_DAYS
  }, [done])

  const currentWeek = weekOf(currentDay)

  return { isDone, toggle, dayComplete, stats, currentWeek, currentDay }
}
