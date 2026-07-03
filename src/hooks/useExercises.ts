import { useCallback, useEffect, useState } from 'react'
import { listExercises, getStats, type Exercise, type ExerciseStats } from '@/lib/exercises'

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [stats, setStats] = useState<ExerciseStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setError(null)
    try {
      const [ex, st] = await Promise.all([listExercises(), getStats()])
      setExercises(ex)
      setStats(st)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { exercises, stats, loading, error, refresh }
}
