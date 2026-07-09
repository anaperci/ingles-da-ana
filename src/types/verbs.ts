import type { CEFRLevel } from '@/types'

/** Verbo irregular: presente, passado, particípio + frases de exemplo. */
export interface IrregularVerb {
  id: string
  kind: 'irregular'
  present: string
  past: string
  pastParticiple: string
  translation: string
  pronunciationTip?: string
  examplePresent: { en: string; pt: string }
  examplePast: { en: string; pt: string }
  writingPrompt: string
}

/** Phrasal verb: verbo base + partícula. */
export interface PhrasalVerb {
  id: string
  kind: 'phrasal'
  /** verbo base, usado para agrupar (get, take, look…) */
  baseVerb: string
  particle: string
  /** forma completa: "get up" */
  phrasal: string
  meaning: string
  translation: string
  example: string
  exampleTranslation: string
  level: CEFRLevel
  /** dica extra (separável/inseparável, preposição fixa, etc.) */
  note?: string
}

export type VerbItem = IrregularVerb | PhrasalVerb

/** Formas verbais que rastreamos para saber qual a usuária mais erra. */
export type VerbForm = 'past' | 'participle'

export type IrregularMode = 'flashcard' | 'fillgap' | 'timed'
export type PhrasalMode = 'match' | 'complete'
