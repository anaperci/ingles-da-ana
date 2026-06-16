import { useState } from 'react'
import { Volume2, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { speak } from '@/lib/tts'
import { useShowTranslation } from '@/hooks/useShowTranslation'
import type { ReviewQuality } from '@/lib/srs'
import type { VocabWord } from '@/types/vocabulary'

interface FlashcardProps {
  word: VocabWord
  onRate: (quality: ReviewQuality) => void
}

const RATINGS: { label: string; quality: ReviewQuality; variant: 'outline' | 'secondary' | 'default' | 'gradient'; tone: string }[] = [
  { label: 'Errei', quality: 1, variant: 'outline', tone: 'text-error' },
  { label: 'Difícil', quality: 3, variant: 'outline', tone: 'text-warning' },
  { label: 'Bom', quality: 4, variant: 'secondary', tone: '' },
  { label: 'Fácil', quality: 5, variant: 'gradient', tone: '' },
]

export function Flashcard({ word, onRate }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false)
  const { show } = useShowTranslation()

  function handleRate(q: ReviewQuality) {
    onRate(q)
    setFlipped(false)
  }

  return (
    <div className="space-y-5">
      <Card
        onClick={() => setFlipped((v) => !v)}
        className="relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center gap-3 p-6 sm:p-8 text-center transition-shadow hover:shadow-elevated"
      >
        <Badge variant="secondary" className="absolute left-4 top-4">
          {word.level}
        </Badge>
        <button
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-secondary"
          onClick={(e) => {
            e.stopPropagation()
            speak(word.word)
          }}
          aria-label="Ouvir"
        >
          <Volume2 className="h-5 w-5" />
        </button>

        {!flipped ? (
          <>
            <div className="text-3xl font-extrabold">{word.word}</div>
            {word.phonetic && (
              <div className="font-mono text-muted-foreground">{word.phonetic}</div>
            )}
            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <RotateCcw className="h-3.5 w-3.5" /> toque para ver a resposta
            </div>
          </>
        ) : (
          <div className="animate-fade-in space-y-3">
            <div className="text-2xl font-bold text-primary">{word.translation}</div>
            <div className="mx-auto max-w-md space-y-1">
              <p className="text-foreground">“{word.example}”</p>
              {show && (
                <p className="text-sm text-muted-foreground">{word.exampleTranslation}</p>
              )}
            </div>
          </div>
        )}
      </Card>

      {flipped ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {RATINGS.map((r) => (
            <Button
              key={r.label}
              variant={r.variant}
              className={r.tone}
              onClick={() => handleRate(r.quality)}
            >
              {r.label}
            </Button>
          ))}
        </div>
      ) : (
        <Button className="w-full" variant="outline" onClick={() => setFlipped(true)}>
          Mostrar resposta
        </Button>
      )}
    </div>
  )
}
