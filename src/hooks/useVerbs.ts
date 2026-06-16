import { useCallback, useMemo } from 'react'
import { useSrsDeck } from './useSrsDeck'
import { useLocalStore } from './useLocalStore'
import { STORAGE_KEYS } from '@/lib/keys'
import { irregularVerbs } from '@/data/irregularVerbs'
import { PHRASAL_VERBS } from '@/data/phrasalVerbs'
import type { ReviewQuality } from '@/lib/srs'
import type {
  IrregularVerb,
  PhrasalVerb,
  VerbForm,
  VerbItem,
} from '@/types/verbs'

/** Adiciona o discriminador `kind` aos irregulares (os dados puros não têm). */
const IRREGULAR_VERBS: IrregularVerb[] = irregularVerbs.map((v) => ({
  ...v,
  kind: 'irregular' as const,
}))

const ALL_ITEMS: VerbItem[] = [...IRREGULAR_VERBS, ...PHRASAL_VERBS]

type FormStats = Record<string, { past: number; participle: number }>

export function useVerbs() {
  // Um único deck SRS para verbos (mesma persistência do Vocabulário, key dedicada).
  const deck = useSrsDeck<VerbItem>(STORAGE_KEYS.verbsProgress, ALL_ITEMS)
  const [formStats, setFormStats] = useLocalStore<FormStats>(
    STORAGE_KEYS.verbsFormStats,
    {}
  )

  /** Registra erro numa forma específica (past/particípio) para priorizar depois. */
  const recordFormMiss = useCallback(
    (id: string, form: VerbForm) => {
      setFormStats((prev) => {
        const cur = prev[id] ?? { past: 0, participle: 0 }
        return { ...prev, [id]: { ...cur, [form]: cur[form] + 1 } }
      })
    },
    [setFormStats]
  )

  /** Qual forma a usuária mais erra no geral. */
  const mostMissedForm = useMemo<VerbForm | null>(() => {
    let past = 0
    let participle = 0
    for (const s of Object.values(formStats)) {
      past += s.past
      participle += s.participle
    }
    if (past === 0 && participle === 0) return null
    return past >= participle ? 'past' : 'participle'
  }, [formStats])

  // Lista plana dos 50 irregulares (sem agrupamento por padrão).
  const irregulars = IRREGULAR_VERBS

  const phrasalByBase = useMemo(() => {
    const bases = [...new Set(PHRASAL_VERBS.map((p) => p.baseVerb))]
    return bases.map((base) => {
      const verbs = PHRASAL_VERBS.filter((p) => p.baseVerb === base)
      const mastered = verbs.filter((v) => {
        const s = deck.progress[v.id]
        return s && s.repetitions >= 4 && s.interval >= 21
      }).length
      return { base, verbs, mastered }
    })
  }, [deck.progress])

  function irregularQueue(limit?: number): IrregularVerb[] {
    return deck.buildQueue({
      limit,
      filter: (v) => v.kind === 'irregular',
    }) as IrregularVerb[]
  }

  function phrasalQueue(base: string | 'all', limit?: number): PhrasalVerb[] {
    return deck.buildQueue({
      limit,
      filter: (v) =>
        v.kind === 'phrasal' && (base === 'all' || v.baseVerb === base),
    }) as PhrasalVerb[]
  }

  const irregularStats = useMemo(() => {
    const ids = new Set(IRREGULAR_VERBS.map((v) => v.id))
    return {
      total: IRREGULAR_VERBS.length,
      mastered: Object.entries(deck.progress).filter(
        ([id, s]) => ids.has(id) && s.repetitions >= 4 && s.interval >= 21
      ).length,
    }
  }, [deck.progress])

  const phrasalStats = useMemo(() => {
    const ids = new Set(PHRASAL_VERBS.map((v) => v.id))
    return {
      total: PHRASAL_VERBS.length,
      mastered: Object.entries(deck.progress).filter(
        ([id, s]) => ids.has(id) && s.repetitions >= 4 && s.interval >= 21
      ).length,
    }
  }, [deck.progress])

  function review(id: string, quality: ReviewQuality) {
    deck.review(id, quality)
  }

  return {
    irregulars,
    phrasalByBase,
    irregularQueue,
    phrasalQueue,
    irregularStats,
    phrasalStats,
    mostMissedForm,
    recordFormMiss,
    review,
    progress: deck.progress,
  }
}

/** Gera opções de múltipla escolha a partir de uma lista de strings. */
export function buildOptions(correct: string, all: string[]): string[] {
  const distractors = shuffle(all.filter((x) => x !== correct)).slice(0, 3)
  return shuffle([correct, ...distractors])
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
