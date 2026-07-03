import { Zap } from 'lucide-react'
import { ReferenceModule, type RefCategory, type RefEntry } from '@/components/grammar/ReferenceModule'
import { adverbs } from '@/data/adverbs'

// Badges coloridos por categoria — paleta petróleo #1C3E4A + âmbar #F2A24E
const CATEGORIES: RefCategory[] = [
  { key: 'frequencia', label: 'Frequency', text: '#1C3E4A', bg: '#1C3E4A14' },
  { key: 'intensidade', label: 'Intensity', text: '#9A5B12', bg: '#F2A24E26' },
  { key: 'modo', label: 'Manner', text: '#1F6E86', bg: '#1F6E8614' },
  { key: 'falso-amigo', label: 'False friends', text: '#B23A2B', bg: '#C0563B1a' },
  { key: 'posicao', label: 'Position', text: '#5B4B8A', bg: '#6B5B9518' },
]

const ENTRIES: RefEntry[] = adverbs.map((a) => ({
  id: a.id,
  term: a.adverb,
  meaning: a.meaning,
  category: a.category,
  explanation: a.explanation,
  pronunciationTip: a.pronunciationTip,
  positionRule: a.positionRule,
  commonMistake: a.commonMistake,
  examples: a.examples,
  writingPrompt: a.writingPrompt,
}))

export default function Adverbs() {
  return (
    <ReferenceModule
      icon={Zap}
      title="Adverbs"
      subtitle="Frequência, intensidade, modo e onde posicionar na frase"
      entries={ENTRIES}
      categories={CATEGORIES}
    />
  )
}
