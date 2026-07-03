import { useCallback, useMemo } from 'react'
import { useLocalStore } from './useLocalStore'

export interface PlanTask {
  id: string
  title: string
  note?: string
  done: boolean
  createdAt: number
}

/** Plano de estudos próprio do usuário (para quem não é a conta dona do curso). */
export function useCustomPlan() {
  const [tasks, setTasks] = useLocalStore<PlanTask[]>('planner:custom', [])

  const add = useCallback(
    (title: string, note?: string) => {
      const t = title.trim()
      if (!t) return
      setTasks((prev) => [
        { id: `t-${Date.now()}`, title: t, note: note?.trim() || undefined, done: false, createdAt: Date.now() },
        ...prev,
      ])
    },
    [setTasks]
  )

  const toggle = useCallback(
    (id: string) =>
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))),
    [setTasks]
  )

  const remove = useCallback(
    (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id)),
    [setTasks]
  )

  const stats = useMemo(() => {
    const done = tasks.filter((t) => t.done).length
    return { done, total: tasks.length, pct: tasks.length ? Math.round((done / tasks.length) * 100) : 0 }
  }, [tasks])

  return { tasks, add, toggle, remove, stats }
}
