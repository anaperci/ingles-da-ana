import { useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ChevronDown,
  Volume2,
  AlertTriangle,
  MoveHorizontal,
  Sparkles,
  PenLine,
} from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { speak } from '@/lib/tts'

export interface RefExample {
  en: string
  pt: string
}

export interface RefEntry {
  id: string
  /** palavra em destaque (preposição ou advérbio) */
  term: string
  meaning: string
  category: string
  explanation: string
  pronunciationTip?: string
  positionRule?: string
  commonMistake?: string
  examples: RefExample[]
  writingPrompt: string
}

export interface RefCategory {
  key: string
  label: string
  /** cor do texto/borda do badge */
  text: string
  /** cor de fundo do badge */
  bg: string
}

// Paleta do módulo: petróleo #1C3E4A + âmbar #F2A24E
const PETROL = '#1C3E4A'
const AMBER = '#F2A24E'
const AMBER_TEXT = '#9A5B12'

interface Props {
  icon: LucideIcon
  title: string
  subtitle: string
  entries: RefEntry[]
  categories: RefCategory[]
}

/** Módulo de referência: cards expansíveis com exemplos falados, alertas e exercício. */
export function ReferenceModule({ icon, title, subtitle, entries, categories }: Props) {
  const [filter, setFilter] = useState<string>('all')

  const list = useMemo(
    () => (filter === 'all' ? entries : entries.filter((e) => e.category === filter)),
    [filter, entries]
  )

  const catOf = (key: string) => categories.find((c) => c.key === key)

  return (
    <div className="animate-fade-in">
      <PageHeader icon={icon} title={title} subtitle={subtitle} />

      {/* Filtro por categoria */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
          All
        </Chip>
        {categories.map((c) => (
          <Chip key={c.key} active={filter === c.key} onClick={() => setFilter(c.key)} color={c.text}>
            {c.label}
          </Chip>
        ))}
      </div>

      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        {list.map((e) => (
          <EntryCard key={e.id} entry={e} category={catOf(e.category)} />
        ))}
      </div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  color,
  children,
}: {
  active: boolean
  onClick: () => void
  color?: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={active && color ? { backgroundColor: color, color: '#fff' } : undefined}
      className={cn(
        'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? color
            ? ''
            : 'bg-primary text-primary-foreground'
          : 'bg-secondary text-muted-foreground hover:text-foreground'
      )}
    >
      {children}
    </button>
  )
}

function EntryCard({ entry, category }: { entry: RefEntry; category?: RefCategory }) {
  const [open, setOpen] = useState(false)

  return (
    <Card className="overflow-hidden p-0">
      {/* Cabeçalho — sempre visível, clicável */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50"
      >
        {category && (
          <span
            className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
            style={{ color: category.text, backgroundColor: category.bg }}
          >
            {category.label}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <span className="text-lg font-extrabold" style={{ color: PETROL }}>
            {entry.term}
          </span>
          <span className="ml-2 text-sm text-muted-foreground">{entry.meaning}</span>
        </div>
        <span
          onClick={(ev) => {
            ev.stopPropagation()
            speak(entry.term)
          }}
          role="button"
          aria-label={`Ouvir ${entry.term}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Volume2 className="h-4 w-4" />
        </span>
        <ChevronDown
          className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
        />
      </button>

      {/* Corpo expandido */}
      {open && (
        <div className="space-y-4 border-t border-card-border px-4 pb-5 pt-4">
          <p className="text-sm leading-relaxed text-foreground">{entry.explanation}</p>

          {/* Dica de pronúncia */}
          {entry.pronunciationTip && (
            <TipBox icon={Sparkles} label="Pronúncia" color={PETROL}>
              {entry.pronunciationTip}
            </TipBox>
          )}

          {/* Regra de posição */}
          {entry.positionRule && (
            <TipBox icon={MoveHorizontal} label="Posição na frase" color={PETROL}>
              <span className="font-mono text-[13px]">{entry.positionRule}</span>
            </TipBox>
          )}

          {/* Exemplos com áudio */}
          <div className="space-y-2">
            {entry.examples.map((ex, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-muted/60 px-3.5 py-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{ex.en}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{ex.pt}</p>
                </div>
                <button
                  onClick={() => speak(ex.en)}
                  aria-label="Ouvir exemplo"
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Erro comum — alerta âmbar */}
          {entry.commonMistake && (
            <div
              className="flex gap-2.5 rounded-xl border px-3.5 py-3"
              style={{ backgroundColor: `${AMBER}1f`, borderColor: `${AMBER}66` }}
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: AMBER_TEXT }} />
              <div>
                <div
                  className="text-[11px] font-bold uppercase tracking-wide"
                  style={{ color: AMBER_TEXT }}
                >
                  Erro comum
                </div>
                <p className="text-sm text-foreground">{entry.commonMistake}</p>
              </div>
            </div>
          )}

          {/* Exercício — writing prompt */}
          <div
            className="flex gap-2.5 rounded-xl px-3.5 py-3"
            style={{ backgroundColor: `${PETROL}0d` }}
          >
            <PenLine className="mt-0.5 h-4 w-4 shrink-0" style={{ color: PETROL }} />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: PETROL }}>
                Exercício
              </div>
              <p className="text-sm text-foreground">{entry.writingPrompt}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

function TipBox({
  icon: Icon,
  label,
  color,
  children,
}: {
  icon: LucideIcon
  label: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-2.5 rounded-xl bg-muted/60 px-3.5 py-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />
      <div className="text-sm text-foreground">
        <span className="mr-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color }}>
          {label}
        </span>
        {children}
      </div>
    </div>
  )
}
