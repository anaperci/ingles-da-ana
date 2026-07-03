import type { CategoryKey, CEFRLevel } from '@/types'

export interface VocabWord {
  id: string
  /** palavra/expressão em inglês */
  word: string
  /** tradução em português */
  translation: string
  /** frase de exemplo em inglês (opcional — palavras de frequência não têm) */
  example?: string
  /** tradução da frase de exemplo */
  exampleTranslation?: string
  category: CategoryKey
  level: CEFRLevel
  /** transcrição fonética opcional (ex.: /ˈwɜːrk/) */
  phonetic?: string
}

export type VocabStudyMode = 'flashcard' | 'quiz'
