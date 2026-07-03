import { Link2 } from 'lucide-react'
import { ReferenceModule, type RefCategory, type RefEntry } from '@/components/grammar/ReferenceModule'
import { prepositions } from '@/data/prepositions'

// Badges coloridos por categoria — paleta petróleo #1C3E4A + âmbar #F2A24E
const CATEGORIES: RefCategory[] = [
  { key: 'lugar', label: 'Place', text: '#1C3E4A', bg: '#1C3E4A14' },
  { key: 'tempo', label: 'Time', text: '#1F6E86', bg: '#1F6E8614' },
  { key: 'verbo', label: 'Verbs', text: '#9A5B12', bg: '#F2A24E26' },
  { key: 'erro-classico', label: 'Common mistakes', text: '#B23A2B', bg: '#C0563B1a' },
]

const ENTRIES: RefEntry[] = prepositions.map((p) => ({
  id: p.id,
  term: p.preposition,
  meaning: p.meaning,
  category: p.category,
  explanation: p.explanation,
  pronunciationTip: p.pronunciationTip,
  commonMistake: p.commonMistake,
  examples: p.examples,
  writingPrompt: p.writingPrompt,
}))

export default function Prepositions() {
  return (
    <ReferenceModule
      icon={Link2}
      title="Prepositions"
      subtitle="Lugar, tempo, verbos e erros clássicos — com exemplos que você pode ouvir"
      entries={ENTRIES}
      categories={CATEGORIES}
    />
  )
}
