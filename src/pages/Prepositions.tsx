import { Link2 } from 'lucide-react'
import { GrammarDrill } from '@/components/grammar/GrammarDrill'
import { PREPOSITION_CATEGORIES, PREPOSITION_EXERCISES } from '@/data/prepositions'

export default function Prepositions() {
  return (
    <GrammarDrill
      icon={Link2}
      title="Preposições"
      subtitle="in / on / at, to / for / with e expressões fixas — pratique escolhendo a certa"
      exercises={PREPOSITION_EXERCISES}
      categories={PREPOSITION_CATEGORIES}
    />
  )
}
