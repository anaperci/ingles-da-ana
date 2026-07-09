import type { LucideIcon } from 'lucide-react'
import { Check, Volume2, PenLine } from 'lucide-react'
import { cn } from '@/lib/utils'
import { speak } from '@/lib/tts'
import { PronounceButton } from '@/components/common/PronounceButton'

const GREEN = '#009864'

export interface StudyExample {
  en: string
  pt: string
}

/** Container do seletor de modos (pill toggle no padrão do Vocabulary). */
export function ModeBar({ children }: { children: React.ReactNode }) {
  return <div className="mb-1 flex w-fit rounded-full bg-muted p-1">{children}</div>
}

export function ModePill({
  icon: Icon,
  active,
  onClick,
  children,
}: {
  icon: LucideIcon
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors',
        active ? 'bg-card text-foreground shadow-soft' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </button>
  )
}

/** Botão redondo de "praticado" — vira check preenchido quando marcado. */
export function PracticeToggle({ done, onClick }: { done: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={done}
      title={done ? 'Praticado — clique para desmarcar' : 'Marcar como praticado'}
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors',
        done
          ? 'border-transparent bg-accent text-accent-foreground'
          : 'border-border text-muted-foreground hover:border-accent hover:text-accent-dark'
      )}
    >
      <Check className="h-4 w-4" />
    </button>
  )
}

/** Barra de progresso "X de N praticados". */
export function ProgressBar({ done, total, label }: { done: number; total: number; label: string }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  return (
    <div className="mx-auto mb-6 max-w-2xl">
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-muted-foreground">
          {done} de {total} {label}
        </span>
        <span className="font-semibold text-accent-dark">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

/** Lista de exemplos en + pt, com áudio (e prática de fala quando `speakable`). */
export function ExampleList({
  examples,
  speakable,
}: {
  examples: StudyExample[]
  speakable?: boolean
}) {
  return (
    <div className="mt-4 space-y-2">
      {examples.map((ex, i) => (
        <div key={i} className="flex items-start gap-3 rounded-xl bg-muted/60 px-3.5 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">{ex.en}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{ex.pt}</p>
            {speakable && (
              <div className="mt-2">
                <PronounceButton text={ex.en} />
              </div>
            )}
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
  )
}

/** Área do modo Escrever: enunciado + textarea persistida + ouvir a própria frase. */
export function WriteArea({
  prompt,
  value,
  onChange,
}: {
  prompt: React.ReactNode
  value: string
  onChange: (text: string) => void
}) {
  return (
    <div className="mt-4 space-y-3">
      <div className="flex gap-2.5 rounded-xl px-3.5 py-3" style={{ backgroundColor: `${GREEN}14` }}>
        <PenLine className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} />
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: GREEN }}>
            Sua vez
          </div>
          <p className="text-sm text-foreground">{prompt}</p>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder="Monte sua própria frase..."
        className="w-full resize-none rounded-xl border border-card-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
      />
      {value.trim() && (
        <button
          onClick={() => speak(value)}
          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <Volume2 className="h-3.5 w-3.5" />
          Ouvir minha frase
        </button>
      )}
    </div>
  )
}
