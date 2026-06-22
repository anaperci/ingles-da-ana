import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Volume2, RotateCcw, ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain } from 'lucide-react'
import { speak } from '@/lib/tts'
import { DECK_BY_KEY } from '@/data/themedDecks'

export default function Deck() {
  const { key = '' } = useParams()
  const deck = DECK_BY_KEY[key]
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const word = useMemo(() => deck?.words[index], [deck, index])

  if (!deck) {
    return (
      <div className="animate-fade-in">
        <PageHeader icon={Brain} title="Deck temático" />
        <Card className="p-8 text-center text-muted-foreground">
          Deck não encontrado.{' '}
          <Link to="/vocabulario" className="font-semibold text-accent-dark underline">
            Ver vocabulário
          </Link>
        </Card>
      </div>
    )
  }

  function go(delta: number) {
    setFlipped(false)
    setIndex((i) => (i + delta + deck.words.length) % deck.words.length)
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        icon={Brain}
        title={`${deck.emoji} ${deck.label}`}
        subtitle="Deck temático — vire a carta, ouça e avance"
        actions={
          <Link
            to="/vocabulario"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Decks
          </Link>
        }
      />

      <div className="mx-auto max-w-xl space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Anterior">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Badge variant="secondary">
            {index + 1} de {deck.words.length}
          </Badge>
          <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Próxima">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <button
          onClick={() => setFlipped((f) => !f)}
          className="flex min-h-[15rem] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-card-border bg-card p-8 text-center shadow-soft transition-colors hover:border-accent"
        >
          {!flipped ? (
            <>
              <span className="text-3xl font-extrabold text-primary">{word!.en}</span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation()
                  speak(word!.en)
                }}
                className="inline-flex items-center gap-1 rounded-full bg-soft px-3 py-1.5 text-sm text-primary"
              >
                <Volume2 className="h-4 w-4" /> ouvir
              </span>
              <span className="text-xs text-muted-foreground">toque para ver a tradução</span>
            </>
          ) : (
            <>
              <span className="text-2xl font-bold text-foreground">{word!.pt}</span>
              <span className="text-base italic text-muted-foreground">“{word!.example}”</span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation()
                  speak(word!.example)
                }}
                className="inline-flex items-center gap-1 rounded-full bg-soft px-3 py-1.5 text-sm text-primary"
              >
                <Volume2 className="h-4 w-4" /> ouvir frase
              </span>
            </>
          )}
        </button>

        <div className="flex justify-center">
          <Button variant="ghost" onClick={() => setFlipped((f) => !f)} className="gap-2 text-muted-foreground">
            <RotateCcw className="h-4 w-4" /> Virar
          </Button>
        </div>
      </div>
    </div>
  )
}
