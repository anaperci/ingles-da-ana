import { useState } from 'react'
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SpeakAndScore } from '@/components/pronunciation/SpeakAndScore'
import type { SentenceFrame } from '@/data/sentenceFrames'

/** Modo FALAR: lê cada exemplo em voz alta e recebe a nota (reusa SpeakAndScore). */
export function FrameSpeaker({ frame }: { frame: SentenceFrame }) {
  const [index, setIndex] = useState(0)
  const total = frame.examples.length
  const example = frame.examples[index]

  function go(delta: number) {
    setIndex((i) => (i + delta + total) % total)
  }

  return (
    <div className="space-y-4">
      {frame.pronunciationTip && (
        <div className="flex items-start gap-3 rounded-lg bg-primary/10 px-4 py-3 text-sm">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span>
            <strong className="text-primary">Pronúncia:</strong>{' '}
            {frame.pronunciationTip}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Anterior">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Badge variant="secondary">
          {index + 1} de {total}
        </Badge>
        <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Próximo">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <SpeakAndScore
        key={`${frame.id}-${index}`}
        text={example.en}
        translation={example.pt}
        session={{ module: 'frames', title: `Falar · ${frame.frame}` }}
      />
    </div>
  )
}
