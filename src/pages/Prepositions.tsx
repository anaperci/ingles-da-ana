import { Link2 } from 'lucide-react'
import { ReferenceModule, type RefCategory, type RefEntry } from '@/components/grammar/ReferenceModule'
import { prepositions } from '@/data/prepositions'

// Badges por categoria — identidade Solo (navy / verde / âmbar / danger)
const CATEGORIES: RefCategory[] = [
  { key: 'lugar', label: 'Place', text: '#0a192f', bg: '#0a192f14' },
  { key: 'tempo', label: 'Time', text: '#009864', bg: '#00986414' },
  { key: 'verbo', label: 'Verbs', text: '#9a5b12', bg: '#f5a52426' },
  { key: 'erro-classico', label: 'Common mistakes', text: '#b42318', bg: '#e5484d1a' },
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
