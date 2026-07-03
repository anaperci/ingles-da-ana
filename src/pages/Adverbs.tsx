import { Zap } from 'lucide-react'
import { GrammarDrill } from '@/components/grammar/GrammarDrill'
import { ADVERB_CATEGORIES, ADVERB_EXERCISES } from '@/data/adverbs'

export default function Adverbs() {
  return (
    <GrammarDrill
      icon={Zap}
      title="Advérbios"
      subtitle="Modo, frequência, tempo e lugar — escolha o advérbio certo em cada frase"
      exercises={ADVERB_EXERCISES}
      categories={ADVERB_CATEGORIES}
    />
  )
}
