export interface Interest {
  key: string
  label: string
  emoji: string
  /** termo de busca enviado ao YouTube */
  query: string
}

export const INTERESTS: Interest[] = [
  { key: 'daily', label: 'Inglês do dia a dia', emoji: '🗣️', query: 'daily english conversation practice' },
  { key: 'travel', label: 'Viagem', emoji: '✈️', query: 'english for travel and airport' },
  { key: 'business', label: 'Negócios', emoji: '💼', query: 'business english meetings vocabulary' },
  { key: 'pronunciation', label: 'Pronúncia', emoji: '🎯', query: 'english pronunciation practice lesson' },
  { key: 'phrasal', label: 'Phrasal verbs', emoji: '🔗', query: 'english phrasal verbs explained' },
  { key: 'grammar', label: 'Gramática', emoji: '📚', query: 'english grammar lesson intermediate' },
  { key: 'slang', label: 'Gírias e expressões', emoji: '😎', query: 'common english slang and idioms' },
  { key: 'tech', label: 'Tecnologia', emoji: '💻', query: 'technology english vocabulary' },
]
