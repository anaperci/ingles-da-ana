import { useState } from 'react'
import { Mic, ChevronLeft, ChevronRight } from 'lucide-react'
import { TranslationToggle } from '@/components/common/TranslationToggle'
import { PronunciationPractice } from '@/components/pronunciation/PronunciationPractice'
import { Card } from '@/components/ui/card'
import { CATEGORIES } from '@/types'
import { PRONUNCIATION_PHRASES } from '@/data/pronunciationPhrases'

export default function Pronunciation() {
  const [index, setIndex] = useState(0)
  const [filter, setFilter] = useState<string>('all')

  const phrases =
    filter === 'all'
      ? PRONUNCIATION_PHRASES
      : PRONUNCIATION_PHRASES.filter((p) => p.category === filter)
  const phrase = phrases[index] ?? phrases[0]

  function go(delta: number) {
    setIndex((i) => (i + delta + phrases.length) % phrases.length)
  }

  return (
    <div className="animate-fade-in">
      {/* Cabeçalho */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-primary shadow-soft">
            <Mic className="h-7 w-7 text-accent-light" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Pronunciation</h1>
            <p className="text-muted-foreground">
              Leia em voz alta e receba score palavra por palavra (reconhecimento de fala)
            </p>
          </div>
        </div>
        <TranslationToggle />
      </div>

      {/* Filtro por seção */}
      <div className="mb-6 flex flex-wrap gap-2">
        <FilterChip active={filter === 'all'} onClick={() => { setFilter('all'); setIndex(0) }}>
          All
        </FilterChip>
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c.key}
            active={filter === c.key}
            onClick={() => { setFilter(c.key); setIndex(0) }}
          >
            {c.emoji} {c.label}
          </FilterChip>
        ))}
      </div>

      <div className="mx-auto max-w-2xl space-y-5">
        {/* Paginação */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-card-border bg-card text-foreground shadow-soft transition-colors hover:border-accent hover:text-accent-dark"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="min-w-[64px] text-center text-sm font-medium text-muted-foreground">
            {index + 1} de {phrases.length}
          </span>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-card-border bg-card text-foreground shadow-soft transition-colors hover:border-accent hover:text-accent-dark"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {phrase ? (
          <PronunciationPractice key={phrase.id} phrase={phrase} />
        ) : (
          <Card className="border-card-border bg-card p-6 text-center text-muted-foreground shadow-soft sm:p-10">
            No phrases in this section.
          </Card>
        )}
      </div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-full px-4 py-1.5 text-sm font-medium transition-colors ' +
        (active
          ? 'bg-primary text-primary-foreground'
          : 'border border-card-border bg-card text-muted-foreground hover:border-accent hover:text-foreground')
      }
    >
      {children}
    </button>
  )
}
