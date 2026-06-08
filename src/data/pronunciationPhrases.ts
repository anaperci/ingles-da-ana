import type { CategoryKey, Difficulty } from '@/types'

export interface PronunciationPhrase {
  id: string
  text: string
  translation: string
  category: CategoryKey
  difficulty: Difficulty
}

export const PRONUNCIATION_PHRASES: PronunciationPhrase[] = [
  {
    id: 'p-1',
    text: "Could you tell me how to get to the city center?",
    translation: 'Você poderia me dizer como chegar ao centro da cidade?',
    category: 'viagem',
    difficulty: 'beginner',
  },
  {
    id: 'p-2',
    text: "I'd like to open a bank account, please.",
    translation: 'Eu gostaria de abrir uma conta bancária, por favor.',
    category: 'cotidiano',
    difficulty: 'beginner',
  },
  {
    id: 'p-3',
    text: "I'm really looking forward to studying here.",
    translation: 'Estou muito animada para estudar aqui.',
    category: 'intercambio',
    difficulty: 'intermediate',
  },
  {
    id: 'p-4',
    text: "Would it be possible to reschedule our meeting?",
    translation: 'Seria possível reagendar nossa reunião?',
    category: 'negocios',
    difficulty: 'intermediate',
  },
  {
    id: 'p-5',
    text: "Nice to meet you! What do you do for a living?",
    translation: 'Prazer em conhecer! O que você faz da vida?',
    category: 'social',
    difficulty: 'beginner',
  },
  {
    id: 'p-6',
    text: "Throughout the year, the weather here is quite pleasant.",
    translation: 'Ao longo do ano, o clima aqui é bem agradável.',
    category: 'social',
    difficulty: 'advanced',
  },
  {
    id: 'p-7',
    text: "Excuse me, I think there's a mistake on the bill.",
    translation: 'Com licença, acho que há um erro na conta.',
    category: 'cotidiano',
    difficulty: 'intermediate',
  },
  {
    id: 'p-8',
    text: "Could you speak a little more slowly, please?",
    translation: 'Você poderia falar um pouco mais devagar, por favor?',
    category: 'academico',
    difficulty: 'beginner',
  },
]
