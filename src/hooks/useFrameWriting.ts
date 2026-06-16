import { useCallback, useMemo } from 'react'
import { useLocalStore } from './useLocalStore'
import { STORAGE_KEYS } from '@/lib/keys'

/** Uma frase que a Ana escreveu usando uma estrutura. */
export interface WrittenSentence {
  id: string
  text: string
  /** ISO date string */
  date: string
}

/** Mapa: frameId → frases escritas naquela estrutura. */
type FrameWritingStore = Record<string, WrittenSentence[]>

/**
 * Coleção de frases escritas pela Ana, por estrutura (frame). Persistida em
 * localStorage no mesmo padrão dos demais módulos.
 */
export function useFrameWriting(frameId: string) {
  const [store, setStore] = useLocalStore<FrameWritingStore>(
    STORAGE_KEYS.framesWriting,
    {}
  )

  const sentences = useMemo(() => store[frameId] ?? [], [store, frameId])

  const add = useCallback(
    (text: string) => {
      const clean = text.trim()
      if (!clean) return
      const entry: WrittenSentence = {
        id: `${frameId}-${Date.now()}-${Math.round(performance.now())}`,
        text: clean,
        date: new Date().toISOString(),
      }
      setStore((prev) => ({
        ...prev,
        [frameId]: [entry, ...(prev[frameId] ?? [])],
      }))
    },
    [frameId, setStore]
  )

  const remove = useCallback(
    (id: string) => {
      setStore((prev) => ({
        ...prev,
        [frameId]: (prev[frameId] ?? []).filter((s) => s.id !== id),
      }))
    },
    [frameId, setStore]
  )

  return { sentences, add, remove }
}

/** Total de frases escritas em todas as estruturas (para a Home/progresso). */
export function useFrameWritingTotal() {
  const [store] = useLocalStore<FrameWritingStore>(STORAGE_KEYS.framesWriting, {})
  return useMemo(
    () => Object.values(store).reduce((acc, arr) => acc + arr.length, 0),
    [store]
  )
}
