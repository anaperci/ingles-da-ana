import { Link2 } from 'lucide-react'
import { GrammarDrill } from '@/components/grammar/GrammarDrill'
import { PREPOSITION_CATEGORIES, PREPOSITION_EXERCISES } from '@/data/prepositions'

export default function Prepositions() {
  return (
    <GrammarDrill
      icon={Link2}
      title="Prepositions"
      subtitle="in / on / at, to / for / with and fixed expressions — practice by picking the right one"
      exercises={PREPOSITION_EXERCISES}
      categories={PREPOSITION_CATEGORIES}
    />
  )
}
