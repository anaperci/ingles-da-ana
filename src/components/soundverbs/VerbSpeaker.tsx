import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SpeakAndScore } from '@/components/pronunciation/SpeakAndScore'
import type { SoundVerb } from '@/data/soundVerbs'

/** Modo FALAR: lê o par e as duas frases em voz alta (reusa SpeakAndScore). */
export function VerbSpeaker({ verb }: { verb: SoundVerb }) {
  const items = useMemo(
    () => [
      { text: `${verb.base}, ${verb.past}`, translation: verb.translation, label: 'O par' },
      { text: verb.examplePresent.en, translation: verb.examplePresent.pt, label: 'Presente' },
      { text: verb.examplePast.en, translation: verb.examplePast.pt, label: 'Passado' },
    ],
    [verb]
  )
  const [index, setIndex] = useState(0)
  const item = items[index]

  function go(delta: number) {
    setIndex((i) => (i + delta + items.length) % items.length)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Anterior">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Badge variant="secondary">
          {item.label} · {index + 1}/{items.length}
        </Badge>
        <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Próximo">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <SpeakAndScore
        key={`${verb.id}-${index}`}
        text={item.text}
        translation={item.translation}
        session={{ module: 'verbs', title: `Falar · ${verb.base} → ${verb.past}` }}
      />
    </div>
  )
}
