import { useMemo, useState } from 'react'
import { Volume2, ChevronDown, LayoutGrid, List as ListIcon, GraduationCap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { speak } from '@/lib/tts'
import { useShowTranslation } from '@/hooks/useShowTranslation'
import type { VocabWord } from '@/types/vocabulary'
import type { Category, CategoryKey } from '@/types'

type View = 'cards' | 'list'
const PREVIEW = 48

interface Props {
  words: VocabWord[]
  categories: Category[]
  onStudy: (key: CategoryKey) => void
}

/** Navegador de palavras: agrupadas por seção, com toggle Cards / List. */
export function WordBrowser({ words, categories, onStudy }: Props) {
  const [view, setView] = useState<View>('cards')

  const grouped = useMemo(() => {
    const m = new Map<string, VocabWord[]>()
    for (const w of words) {
      const arr = m.get(w.category)
      if (arr) arr.push(w)
      else m.set(w.category, [w])
    }
    return m
  }, [words])

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Browse words</h2>
        <div className="flex items-center gap-1 rounded-full border border-card-border bg-card p-1">
          <ViewBtn active={view === 'cards'} onClick={() => setView('cards')} icon={LayoutGrid} label="Cards" />
          <ViewBtn active={view === 'list'} onClick={() => setView('list')} icon={ListIcon} label="List" />
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => {
          const list = grouped.get(cat.key) ?? []
          if (!list.length) return null
          return <Group key={cat.key} cat={cat} list={list} view={view} onStudy={onStudy} />
        })}
      </div>
    </div>
  )
}

function ViewBtn({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: typeof LayoutGrid
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
        active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  )
}

function Group({
  cat,
  list,
  view,
  onStudy,
}: {
  cat: Category
  list: VocabWord[]
  view: View
  onStudy: (key: CategoryKey) => void
}) {
  const [open, setOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const shown = showAll ? list : list.slice(0, PREVIEW)

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center gap-3 p-4">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span className="text-2xl">{cat.emoji}</span>
          <div className="min-w-0">
            <h3 className="font-semibold">{cat.label}</h3>
            <span className="text-xs text-muted-foreground">{list.length} words</span>
          </div>
          <ChevronDown
            className={cn('ml-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
          />
        </button>
        <button
          onClick={() => onStudy(cat.key)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-dark"
        >
          <GraduationCap className="h-4 w-4" /> Study
        </button>
      </div>

      {open && (
        <div className="border-t border-card-border p-4">
          {view === 'cards' ? (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {shown.map((w) => (
                <WordCard key={w.id} word={w} />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-card-border">
              {shown.map((w) => (
                <WordRow key={w.id} word={w} />
              ))}
            </div>
          )}

          {list.length > PREVIEW && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="mt-3 w-full rounded-lg py-2 text-sm font-medium text-accent-dark hover:bg-soft"
            >
              {showAll ? 'Show less' : `Show all ${list.length}`}
            </button>
          )}
        </div>
      )}
    </Card>
  )
}

function SpeakBtn({ text }: { text: string }) {
  return (
    <button
      onClick={() => speak(text)}
      aria-label={`Listen to ${text}`}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      <Volume2 className="h-4 w-4" />
    </button>
  )
}

function WordCard({ word }: { word: VocabWord }) {
  const { show } = useShowTranslation()
  return (
    <div className="flex items-start justify-between gap-1 rounded-xl border border-card-border bg-card p-3">
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="truncate font-semibold text-foreground">{word.word}</span>
          {word.level && (
            <Badge variant="secondary" className="shrink-0 px-1.5 py-0 text-[10px]">
              {word.level}
            </Badge>
          )}
        </div>
        {show && <div className="truncate text-xs text-muted-foreground">{word.translation}</div>}
      </div>
      <SpeakBtn text={word.word} />
    </div>
  )
}

function WordRow({ word }: { word: VocabWord }) {
  const { show } = useShowTranslation()
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="font-semibold text-foreground">{word.word}</span>
      {word.level && (
        <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
          {word.level}
        </Badge>
      )}
      {show && <span className="truncate text-sm text-muted-foreground">{word.translation}</span>}
      <div className="ml-auto">
        <SpeakBtn text={word.word} />
      </div>
    </div>
  )
}
