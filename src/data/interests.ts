export interface Interest {
  key: string
  label: string
  emoji: string
  /** termo de busca enviado ao YouTube */
  query: string
}

// Todos os interesses puxam AULAS DE INGLÊS usando filmes e séries.
export const INTERESTS: Interest[] = [
  { key: 'movies', label: 'Aprender com filmes', emoji: '🎬', query: 'learn english with movies scenes lesson' },
  { key: 'series', label: 'Aprender com séries', emoji: '📺', query: 'learn english with tv series lesson' },
  { key: 'phrases', label: 'Frases de filmes', emoji: '💬', query: 'common english phrases from movies explained' },
  { key: 'slang', label: 'Gírias no cinema', emoji: '😎', query: 'english slang and idioms from movies and tv shows' },
  { key: 'pronunciation', label: 'Pronúncia com cenas', emoji: '🎯', query: 'english pronunciation practice with movie scenes' },
  { key: 'listening', label: 'Listening com trechos', emoji: '👂', query: 'english listening practice with movie and series clips' },
  { key: 'sitcom', label: 'Sitcoms', emoji: '😄', query: 'learn english with sitcoms friends explained' },
  { key: 'dialogues', label: 'Diálogos de séries', emoji: '🗣️', query: 'english dialogues from tv series with subtitles lesson' },
]
