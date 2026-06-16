import { useCallback, useMemo, useState } from 'react'
import { useLocalStore } from './useLocalStore'
import { STORAGE_KEYS } from '@/lib/keys'
import {
  COMMON_WORDS,
  COMMON_WORDS_TOTAL,
  WORD_BANDS,
  type CommonWord,
} from '@/data/commonWords'

/**
 * Gerencia as 1000 palavras mais faladas: marca quais a Ana já sabe
 * (persistido), busca e estatísticas por banda de 100.
 */
export function useCommonWords() {
  const [known, setKnown] = useLocalStore<Record<string, true>>(
    STORAGE_KEYS.commonWordsKnown,
    {}
  )
  const [query, setQuery] = useState('')

  const knownCount = useMemo(() => Object.keys(known).length, [known])

  const toggleKnown = useCallback(
    (id: string) => {
      setKnown((prev) => {
        const next = { ...prev }
        if (next[id]) delete next[id]
        else next[id] = true
        return next
      })
    },
    [setKnown]
  )

  const isKnown = useCallback((id: string) => !!known[id], [known])

  const filtered = useMemo<CommonWord[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMON_WORDS
    return COMMON_WORDS.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.translation.toLowerCase().includes(q)
    )
  }, [query])

  const bands = useMemo(() => {
    return WORD_BANDS.map((band) => {
      const k = band.words.filter((w) => known[w.id]).length
      return { ...band, known: k }
    })
  }, [known])

  return {
    words: COMMON_WORDS,
    total: COMMON_WORDS_TOTAL,
    bands,
    filtered,
    query,
    setQuery,
    known,
    knownCount,
    isKnown,
    toggleKnown,
  }
}
