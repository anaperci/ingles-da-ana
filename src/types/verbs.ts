import type { CEFRLevel } from '@/types'

/** Verbo irregular: infinitivo, passado simples, particípio passado. */
export interface IrregularVerb {
  id: string
  kind: 'irregular'
  base: string
  past: string
  participle: string
  translation: string
  /** chave do grupo de padrão de mudança (ex.: 'i-a-u') */
  pattern: string
  level: CEFRLevel
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
}

export type VerbItem = IrregularVerb | PhrasalVerb

/** Formas verbais que rastreamos para saber qual a usuária mais erra. */
export type VerbForm = 'past' | 'participle'

export type IrregularMode = 'flashcard' | 'fillgap' | 'timed'
export type PhrasalMode = 'match' | 'complete'
