import type { DailyVideo } from '@/types/video'

/**
 * Lista curada usada como fallback quando a YouTube API não está configurada
 * ou estoura a cota. Canais conhecidos de ensino de inglês.
 */
export const CURATED_VIDEOS: DailyVideo[] = [
  {
    videoId: 'juKd26qkNAw',
    title: 'Speak English Fluently — Daily Conversation Practice',
    channel: 'English with Lucy',
    description: 'Frases do dia a dia para destravar a fala.',
    thumbnail: 'https://i.ytimg.com/vi/juKd26qkNAw/hqdefault.jpg',
  },
  {
    videoId: 'o6Nn5tBz-Bo',
    title: 'English at the Airport — Travel Vocabulary',
    channel: 'BBC Learning English',
    description: 'Vocabulário essencial para aeroporto e viagem.',
    thumbnail: 'https://i.ytimg.com/vi/o6Nn5tBz-Bo/hqdefault.jpg',
  },
  {
    videoId: 'lXp9KBdYHfQ',
    title: 'Business English — Meetings and Presentations',
    channel: 'Learn English with EnglishClass101',
    description: 'Inglês profissional para reuniões.',
    thumbnail: 'https://i.ytimg.com/vi/lXp9KBdYHfQ/hqdefault.jpg',
  },
]
