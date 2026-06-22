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

export interface Category {
  key: CategoryKey
  label: string
  emoji: string
  description: string
}

export const CATEGORIES: Category[] = [
  {
    key: 'intercambio',
    label: 'Intercâmbio',
    emoji: '✈️',
    description: 'Chegada, acomodação, escola e burocracia em Malta',
  },
  {
    key: 'cotidiano',
    label: 'Dia a dia',
    emoji: '🏠',
    description: 'Compras, comida, transporte, saúde e serviços',
  },
  {
    key: 'social',
    label: 'Social',
    emoji: '💬',
    description: 'Conversa fiada, fazer amizade, sair, opiniões',
  },
  {
    key: 'negocios',
    label: 'Negócios',
    emoji: '💼',
    description: 'Reuniões, apresentações, e-mails e calls',
  },
  {
    key: 'viagem',
    label: 'Viagem',
    emoji: '🧳',
    description: 'Aeroporto, hotel, direções e turismo',
  },
  {
    key: 'academico',
    label: 'Acadêmico',
    emoji: '🎓',
    description: 'Sala de aula, dúvidas, apresentações e estudo',
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
