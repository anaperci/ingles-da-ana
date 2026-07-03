/** Tipos compartilhados entre todos os módulos. */

export type ModuleKey =
  | 'vocabulary'
  | 'conversation'
  | 'pronunciation'
  | 'video'
  | 'verbs'
  | 'writing'
  | 'frames'
  | 'pronouns'
  | 'grammar'

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

/** Categorias de conteúdo — "tudo junto separado por seções". */
export type CategoryKey =
  | 'intercambio'
  | 'cotidiano'
  | 'social'
  | 'negocios'
  | 'viagem'
  | 'academico'
  | 'frequentes'

export interface Category {
  key: CategoryKey
  label: string
  emoji: string
  description: string
}

export const CATEGORIES: Category[] = [
  {
    key: 'intercambio',
    label: 'Exchange',
    emoji: '✈️',
    description: 'Arrival, housing, school and paperwork in Malta',
  },
  {
    key: 'cotidiano',
    label: 'Everyday',
    emoji: '🏠',
    description: 'Shopping, food, transport, health and services',
  },
  {
    key: 'social',
    label: 'Social',
    emoji: '💬',
    description: 'Small talk, making friends, going out, opinions',
  },
  {
    key: 'negocios',
    label: 'Business',
    emoji: '💼',
    description: 'Meetings, presentations, emails and calls',
  },
  {
    key: 'viagem',
    label: 'Travel',
    emoji: '🧳',
    description: 'Airport, hotel, directions and sightseeing',
  },
  {
    key: 'academico',
    label: 'Academic',
    emoji: '🎓',
    description: 'Classroom, questions, presentations and study',
  },
  {
    key: 'frequentes',
    label: 'Most common',
    emoji: '🔤',
    description: 'The 1000 most spoken English words',
  },
]

/** Uma sessão de prática concluída em qualquer módulo. */
export interface PracticeSession {
  id: string
  module: ModuleKey
  title: string
  /** ISO date string */
  date: string
  /** 0-100 quando aplicável (pronúncia, quiz) */
  score: number | null
  /** minutos de prática */
  minutes: number
  category?: CategoryKey
}

/** Progresso unificado mostrado na Home. */
export interface UnifiedProgress {
  streak: number
  longestStreak: number
  wordsMastered: number
  verbsMastered: number
  practiceMinutes: number
  averageScore: number
  /** dias (YYYY-MM-DD) em que houve prática */
  activeDays: string[]
}
