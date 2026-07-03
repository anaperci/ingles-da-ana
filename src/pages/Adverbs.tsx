import { Zap } from 'lucide-react'
import { GrammarDrill } from '@/components/grammar/GrammarDrill'
import { ADVERB_CATEGORIES, ADVERB_EXERCISES } from '@/data/adverbs'

export default function Adverbs() {
  return (
    <GrammarDrill
      icon={Zap}
      title="Adverbs"
      subtitle="Manner, frequency, time and place — pick the right adverb in each sentence"
      exercises={ADVERB_EXERCISES}
      categories={ADVERB_CATEGORIES}
    />
  )
}
