import { useCallback, useMemo } from 'react'
import { useLocalStore } from './useLocalStore'
import {
  initialSrsState,
  reviewSrs,
  isDue,
  isMastered,
  sortByPriority,
  type SrsState,
  type ReviewQuality,
} from '@/lib/srs'

export type SrsMap = Record<string, SrsState>

export interface DeckStats {
  total: number
  mastered: number
  learning: number
  due: number
  newCount: number
}

export interface DeckItem<T> {
  item: T
  srs: SrsState
}

/**
 * Núcleo reutilizável de qualquer baralho de estudo com SM-2.
 * Recebe a chave de persistência e a lista de itens (cada um com `id`).
 * Cuida do progresso, fila de revisão e estatísticas — sem conhecer o domínio.
 *
 * Usado pelo Vocabulário e, futuramente, pelo módulo de Verbos.
 */
export function useSrsDeck<T extends { id: string }>(
  storageKey: string,
  items: T[]
) {
  const [progress, setProgress] = useLocalStore<SrsMap>(storageKey, {})

  const srsFor = useCallback(
    (id: string): SrsState => progress[id] ?? initialSrsState(),
    [progress]
  )

  const review = useCallback(
    (id: string, quality: ReviewQuality) => {
      setProgress((prev) => {
        const current = prev[id] ?? initialSrsState()
        return { ...prev, [id]: reviewSrs(current, quality) }
      })
    },
    [setProgress]
  )

  const resetProgress = useCallback(() => setProgress({}), [setProgress])

  const stats = useMemo<DeckStats>(() => {
    let mastered = 0
    let learning = 0
    let due = 0
    let newCount = 0
    for (const it of items) {
      const s = progress[it.id]
      if (!s) {
        newCount += 1
        continue
      }
      if (isMastered(s)) mastered += 1
      else learning += 1
      if (isDue(s)) due += 1
    }
    return { total: items.length, mastered, learning, due, newCount }
  }, [items, progress])

  /**
   * Monta a fila de estudo: itens vencidos e novos primeiro, ordenados por
   * prioridade de revisão. `filter` permite restringir (ex.: por categoria).
   */
  const buildQueue = useCallback(
    (opts?: { limit?: number; filter?: (item: T) => boolean }): T[] => {
      const pool = items.filter((it) => (opts?.filter ? opts.filter(it) : true))
      const withSrs: DeckItem<T>[] = pool.map((item) => ({
        item,
        srs: progress[item.id] ?? initialSrsState(),
      }))
      const ordered = sortByPriority(withSrs).map((d) => d.item)
      return opts?.limit ? ordered.slice(0, opts.limit) : ordered
    },
    [items, progress]
  )

  return { progress, srsFor, review, resetProgress, stats, buildQueue }
}
