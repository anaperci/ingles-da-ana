import { useState } from 'react'
import { Mic, ChevronLeft, ChevronRight } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { TranslationToggle } from '@/components/common/TranslationToggle'
import { PronunciationPractice } from '@/components/pronunciation/PronunciationPractice'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
      <PageHeader
        icon={Mic}
        title="Pronúncia"
        subtitle="Leia em voz alta e receba nota por palavra (reconhecimento de fala do navegador)"
        actions={<TranslationToggle />}
      />

      {/* Filtro por seção */}
      <div className="mb-6 flex flex-wrap gap-2">
        <FilterChip active={filter === 'all'} onClick={() => { setFilter('all'); setIndex(0) }}>
          Todas
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

      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Anterior">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Badge variant="secondary">
            {index + 1} de {phrases.length}
          </Badge>
          <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Próxima">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {phrase ? (
          <PronunciationPractice key={phrase.id} phrase={phrase} />
        ) : (
          <Card className="p-10 text-center text-muted-foreground">
            Nenhuma frase nesta seção.
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
        'rounded-full px-3 py-1.5 text-sm font-medium transition-colors ' +
        (active
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary text-muted-foreground hover:text-foreground')
      }
    >
      {children}
    </button>
  )
}
