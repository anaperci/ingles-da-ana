import { useMemo, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CorrectionCard } from '@/components/common/CorrectionCard'
import { cn } from '@/lib/utils'
import { useProgress } from '@/hooks/useProgress'
import { filledSentence, type GrammarCategory, type GrammarExercise } from '@/data/grammarTypes'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface Props {
  icon: LucideIcon
  title: string
  subtitle: string
  exercises: GrammarExercise[]
  categories: GrammarCategory[]
}

/** Drill de gramática: escolha múltipla com correção explicada, filtro e placar. */
export function GrammarDrill({ icon, title, subtitle, exercises, categories }: Props) {
  const { addSession } = useProgress()
  const [filter, setFilter] = useState<string>('all')

  const list = useMemo(
    () => (filter === 'all' ? exercises : exercises.filter((e) => e.category === filter)),
    [filter, exercises]
  )

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const logged = useRef(false)

  const ex = list[index]
  const options = useMemo(() => (ex ? shuffle(ex.options) : []), [ex?.id])

  function reset(next: string) {
    setFilter(next)
    setIndex(0)
    setSelected(null)
    setCorrect(0)
    setDone(false)
    logged.current = false
  }

  function choose(opt: string) {
    if (selected) return
    setSelected(opt)
    if (opt === ex.answer) setCorrect((c) => c + 1)
  }

  function next() {
    if (index >= list.length - 1) {
      setDone(true)
      if (!logged.current) {
        logged.current = true
        addSession({
          module: 'grammar',
          title: `${title} · ${list.length} questões`,
          minutes: 3,
          score: Math.round((correct / list.length) * 100),
        })
      }
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  const catLabel = categories.find((c) => c.key === ex?.category)?.label

  return (
    <div className="animate-fade-in">
      <PageHeader icon={icon} title={title} subtitle={subtitle} />

      <div className="mb-6 flex flex-wrap gap-2">
        <Chip active={filter === 'all'} onClick={() => reset('all')}>
          All
        </Chip>
        {categories.map((c) => (
          <Chip key={c.key} active={filter === c.key} onClick={() => reset(c.key)}>
            {c.label}
          </Chip>
        ))}
      </div>

      <div className="mx-auto max-w-2xl">
        {done ? (
          <ResultCard correct={correct} total={list.length} onRestart={() => reset(filter)} />
        ) : ex ? (
          <Card className="space-y-5 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">
                {index + 1} of {list.length}
              </Badge>
              {catLabel && (
                <span className="text-xs font-medium text-muted-foreground">{catLabel}</span>
              )}
            </div>
            <Progress value={Math.round(((index + (selected ? 1 : 0)) / list.length) * 100)} />

            <div className="text-center">
              <p className="text-xl font-bold leading-relaxed sm:text-2xl">
                {renderPrompt(ex.prompt)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">({ex.hint})</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {options.map((opt) => {
                const isCorrect = opt === ex.answer
                const isSel = opt === selected
                const show = selected !== null
                return (
                  <button
                    key={opt}
                    disabled={show}
                    onClick={() => choose(opt)}
                    className={cn(
                      'flex items-center justify-center gap-1.5 rounded-lg border border-card-border bg-card px-4 py-3 font-semibold transition-colors',
                      !show && 'hover:border-primary hover:bg-secondary',
                      show && isCorrect && 'border-success bg-success/10 text-success',
                      show && isSel && !isCorrect && 'border-error bg-error/10 text-error',
                      show && !isSel && !isCorrect && 'opacity-60'
                    )}
                  >
                    {opt}
                    {show && isCorrect && <Check className="h-4 w-4" />}
                    {show && isSel && !isCorrect && <X className="h-4 w-4" />}
                  </button>
                )
              })}
            </div>

            {selected && (
              <>
                <CorrectionCard
                  ok={selected === ex.answer}
                  answer={ex.answer}
                  note={ex.note}
                  example={filledSentence(ex)}
                  speakAnswer={false}
                />
                <Button className="w-full" onClick={next}>
                  {index >= list.length - 1 ? 'See result' : 'Next'}{' '}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </Card>
        ) : null}
      </div>
    </div>
  )
}

function renderPrompt(prompt: string) {
  const [before, after] = prompt.split('___')
  return (
    <>
      {before}
      <span className="mx-1 inline-block min-w-[3ch] border-b-2 border-accent-dark text-accent-dark"> </span>
      {after}
    </>
  )
}

function Chip({
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
        'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
        active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
      )}
    >
      {children}
    </button>
  )
}

function ResultCard({
  correct,
  total,
  onRestart,
}: {
  correct: number
  total: number
  onRestart: () => void
}) {
  const pct = Math.round((correct / total) * 100)
  const msg = pct >= 90 ? 'Excellent! 🎉' : pct >= 60 ? 'Nice! You\'re getting the hang of it.' : 'Let\'s reinforce — try again to lock it in.'
  return (
    <Card className="space-y-4 p-6 text-center sm:p-8">
      <div className="text-4xl font-extrabold text-primary sm:text-5xl">{pct}%</div>
      <p className="text-muted-foreground">
        You got <strong className="text-foreground">{correct}</strong> of {total}.
      </p>
      <p className="text-sm text-muted-foreground">{msg}</p>
      <Button onClick={onRestart} variant="gradient" className="gap-2">
        <RotateCcw className="h-4 w-4" /> Practice again
      </Button>
    </Card>
  )
}
