import { Zap } from 'lucide-react'
import { ReferenceModule, type RefCategory, type RefEntry } from '@/components/grammar/ReferenceModule'
import { adverbs } from '@/data/adverbs'

// Badges por categoria — identidade Solo (navy / verde / âmbar / danger / slate)
const CATEGORIES: RefCategory[] = [
  { key: 'frequencia', label: 'Frequency', text: '#0a192f', bg: '#0a192f14' },
  { key: 'intensidade', label: 'Intensity', text: '#009864', bg: '#00986414' },
  { key: 'modo', label: 'Manner', text: '#9a5b12', bg: '#f5a52426' },
  { key: 'falso-amigo', label: 'False friends', text: '#b42318', bg: '#e5484d1a' },
  { key: 'posicao', label: 'Position', text: '#475569', bg: '#47556914' },
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
