import { useMemo } from 'react'
import { useSrsDeck } from './useSrsDeck'
import { VOCABULARY } from '@/data/vocabulary'
import { STORAGE_KEYS } from '@/lib/keys'
import { CATEGORIES, type CategoryKey } from '@/types'
import type { VocabWord } from '@/types/vocabulary'

export function useVocabulary() {
  const deck = useSrsDeck<VocabWord>(STORAGE_KEYS.vocabularyProgress, VOCABULARY)

  const byCategory = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const words = VOCABULARY.filter((w) => w.category === cat.key)
      const mastered = words.filter((w) => {
        const s = deck.progress[w.id]
        return s && s.repetitions >= 4 && s.interval >= 21
      }).length
      return { category: cat, total: words.length, mastered }
    })
  }, [deck.progress])

  function queueForCategory(category: CategoryKey | 'all', limit?: number) {
    return deck.buildQueue({
      limit,
      filter: category === 'all' ? undefined : (w) => w.category === category,
    })
  }

  return {
    words: VOCABULARY,
    byCategory,
    queueForCategory,
    ...deck,
  }
}

/** Gera 3 distratores plausíveis (mesma categoria quando possível). */
export function buildQuizOptions(correct: VocabWord, pool: VocabWord[]): string[] {
  const sameCat = pool.filter(
    (w) => w.id !== correct.id && w.category === correct.category
  )
  const others = pool.filter(
    (w) => w.id !== correct.id && w.category !== correct.category
  )
  const distractors = [...shuffle(sameCat), ...shuffle(others)]
    .slice(0, 3)
    .map((w) => w.translation)
  return shuffle([correct.translation, ...distractors])
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
