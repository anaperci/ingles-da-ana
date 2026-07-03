import { useMemo, useState } from 'react'
import { Brain, ChevronRight, Volume2, Play, GraduationCap } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { TranslationToggle } from '@/components/common/TranslationToggle'
import { StudySession } from '@/components/vocabulary/StudySession'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { speak } from '@/lib/tts'
import { THEMED_DECKS } from '@/data/themedDecks'
import { useVocabulary, ALL_VOCAB } from '@/hooks/useVocabulary'
import { useShowTranslation } from '@/hooks/useShowTranslation'
import { CATEGORIES, type CategoryKey } from '@/types'
import type { VocabStudyMode, VocabWord } from '@/types/vocabulary'

const SESSION_SIZE = 12
const WORD_PREVIEW = 60

interface BrowseDeck {
  key: string
  label: string
  emoji: string
  desc: string
  words: VocabWord[]
  /** categoria SRS (quando é uma coleção); ausente em decks temáticos */
  srsCat?: CategoryKey
}

function buildDecks(): BrowseDeck[] {
  const themed: BrowseDeck[] = THEMED_DECKS.map((d) => ({
    key: `td-${d.key}`,
    label: d.label,
    emoji: d.emoji,
    desc: 'deck temático',
    words: d.words.map((w, i) => ({
      id: `td-${d.key}-${i}`,
      word: w.en,
      translation: w.pt,
      example: w.example,
      category: 'cotidiano' as CategoryKey,
      level: 'A1',
    })),
  }))
  const collections: BrowseDeck[] = CATEGORIES.map((c) => ({
    key: `cat-${c.key}`,
    label: c.label,
    emoji: c.emoji,
    desc: c.description,
    words: ALL_VOCAB.filter((w) => w.category === c.key),
    srsCat: c.key,
  })).filter((d) => d.words.length > 0)
  return [...themed, ...collections]
}

export default function Vocabulary() {
  const { queueForCategory } = useVocabulary()
  const decks = useMemo(buildDecks, [])
  const [selected, setSelected] = useState(0)
  const [mode, setMode] = useState<VocabStudyMode>('flashcard')
  const [studying, setStudying] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const deck = decks[selected]

  if (studying && deck) {
    const queue = deck.srsCat
      ? queueForCategory(deck.srsCat, SESSION_SIZE)
      : deck.words
    return (
      <div className="animate-fade-in">
        <StudySession
          queue={queue.length ? queue : deck.words.slice(0, SESSION_SIZE)}
          mode={mode}
          category={deck.srsCat ?? 'all'}
          onExit={() => setStudying(false)}
        />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        icon={Brain}
        title="Vocabulary"
        subtitle="Pick a deck and study with spaced repetition"
        actions={<TranslationToggle />}
      />

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        {/* Lista de decks */}
        <Card className="p-3 lg:w-[300px] lg:shrink-0">
          <div className="px-2 py-2 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
            Decks · {decks.length}
          </div>
          <div className="flex flex-col gap-1">
            {decks.map((d, i) => {
              const on = i === selected
              return (
                <button
                  key={d.key}
                  onClick={() => {
                    setSelected(i)
                    setShowAll(false)
                  }}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border p-2.5 text-left transition-colors',
                    on
                      ? 'border-accent/30 bg-soft'
                      : 'border-transparent hover:bg-muted'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg',
                      on ? 'bg-accent text-white' : 'bg-soft'
                    )}
                  >
                    {d.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">{d.label}</span>
                    <span className="block text-xs text-muted-foreground">{d.words.length} words</span>
                  </span>
                  <ChevronRight
                    className={cn('h-4 w-4 shrink-0', on ? 'text-accent-dark' : 'text-transparent')}
                  />
                </button>
              )
            })}
          </div>
        </Card>

        {/* Detalhe do deck */}
        {deck && <DeckDetail
          deck={deck}
          mode={mode}
          setMode={setMode}
          onStudy={() => setStudying(true)}
          showAll={showAll}
          setShowAll={setShowAll}
        />}
      </div>
    </div>
  )
}

function DeckDetail({
  deck,
  mode,
  setMode,
  onStudy,
  showAll,
  setShowAll,
}: {
  deck: BrowseDeck
  mode: VocabStudyMode
  setMode: (m: VocabStudyMode) => void
  onStudy: () => void
  showAll: boolean
  setShowAll: (v: boolean) => void
}) {
  const { show } = useShowTranslation()
  const words = showAll ? deck.words : deck.words.slice(0, WORD_PREVIEW)

  return (
    <Card className="min-w-0 flex-1 p-5 sm:p-6">
      {/* Cabeçalho */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-soft text-2xl">
            {deck.emoji}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-extrabold">{deck.label}</h2>
            <p className="truncate text-sm text-muted-foreground">
              {deck.words.length} words · {deck.desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Toggle Flashcards / Quiz */}
          <div className="flex rounded-full bg-muted p-1">
            <ModeBtn active={mode === 'flashcard'} onClick={() => setMode('flashcard')}>
              Flashcards
            </ModeBtn>
            <ModeBtn active={mode === 'quiz'} onClick={() => setMode('quiz')}>
              Quiz
            </ModeBtn>
          </div>
          {/* Botão Study — card branco → azul escuro */}
          <button
            onClick={onStudy}
            className="inline-flex items-center gap-2 rounded-full bg-accent-dark px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-colors hover:bg-accent-text"
          >
            <Play className="h-4 w-4" /> Study
          </button>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
          Words in this deck
        </span>
        <span className="text-xs text-muted-foreground">{deck.words.length} total</span>
      </div>

      {/* Lista de palavras */}
      <div className="flex flex-col gap-2">
        {words.map((w) => (
          <div
            key={w.id}
            className="flex items-center gap-3 rounded-xl border border-card-border bg-muted/40 px-4 py-3 transition-colors hover:bg-soft"
          >
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-foreground">{w.word}</div>
              {show && <div className="mt-0.5 text-sm text-muted-foreground">{w.translation}</div>}
            </div>
            <button
              onClick={() => speak(w.word)}
              aria-label={`Listen to ${w.word}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-accent hover:text-accent-dark"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {deck.words.length > WORD_PREVIEW && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium text-accent-dark hover:bg-soft"
        >
          <GraduationCap className="h-4 w-4" />
          {showAll ? 'Show less' : `Show all ${deck.words.length}`}
        </button>
      )}
    </Card>
  )
}

function ModeBtn({
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
      className={cn(
        'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
        active ? 'bg-card text-foreground shadow-soft' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {children}
    </button>
  )
}
