import { useState } from 'react'
import { Volume2, RotateCcw, Lightbulb } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { speak } from '@/lib/tts'
import { cn } from '@/lib/utils'
import type { SentenceFrame } from '@/data/sentenceFrames'

/** Modo LER: exemplos como flashcards (en → pt) + dica de pronúncia. */
export function FrameReader({ frame }: { frame: SentenceFrame }) {
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
      <p className="text-sm text-muted-foreground">
        Toque em cada card para ver a tradução. Use o 🔊 para ouvir o modelo.
      </p>
      <div className="space-y-3">
        {frame.examples.map((ex, i) => (
          <ExampleCard key={i} en={ex.en} pt={ex.pt} />
        ))}
      </div>
    </div>
  )
}

function ExampleCard({ en, pt }: { en: string; pt: string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <Card
      onClick={() => setFlipped((v) => !v)}
      className="flex cursor-pointer items-center gap-3 p-4 transition-shadow hover:shadow-elevated"
    >
      <button
        className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
        onClick={(e) => {
          e.stopPropagation()
          speak(en)
        }}
        aria-label="Ouvir"
      >
        <Volume2 className="h-5 w-5" />
      </button>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{en}</p>
        <p
          className={cn(
            'text-sm text-muted-foreground transition-opacity',
            flipped ? 'opacity-100' : 'opacity-0'
          )}
        >
          {pt}
        </p>
      </div>
      <RotateCcw className="h-4 w-4 shrink-0 text-muted-foreground" />
    </Card>
  )
}
