import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarRange,
  Check,
  ChevronDown,
  PlayCircle,
  Sparkles,
  ArrowRight,
  PenLine,
  Loader2,
} from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { callFunction, NotConfiguredError } from '@/lib/api'
import { cn } from '@/lib/utils'
import { usePlanner, type PlannerTask } from '@/hooks/usePlanner'
import { appLinksForActivity } from '@/lib/plannerLinks'
import { deckForWeek } from '@/data/weekThemes'
import { DECK_BY_KEY } from '@/data/themedDecks'
import { isOwner } from '@/lib/azure'
import { CustomPlanner } from '@/components/planner/CustomPlanner'
import { PLANNER, type PlannerDay, type PlannerWeek } from '@/data/planner'

export default function Planner() {
  // O cronograma do curso (CDF) é só da conta dona; os demais montam o próprio plano.
  if (!isOwner()) return <CustomPlanner />
  return <CoursePlanner />
}

function CoursePlanner() {
  const { isDone, toggle, dayComplete, stats, currentWeek, currentDay } = usePlanner()
  const [open, setOpen] = useState<number>(currentWeek)

  return (
    <div className="animate-fade-in">
      <PageHeader
        icon={CalendarRange}
        title="Planner"
        subtitle="Cronograma dos Fluentes — 52 semanas de estudo guiado"
      />

      {/* Progresso geral */}
      <Card className="mb-6 space-y-3 border-primary/20 bg-soft p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-3xl font-extrabold text-primary">
              {stats.completedDays}
              <span className="text-lg font-bold text-muted-foreground">
                /{stats.totalDays} dias
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Próximo: <strong className="text-foreground">Dia {currentDay}</strong> · Semana{' '}
              {currentWeek}
            </p>
          </div>
          <span className="font-mono text-2xl font-bold text-accent-dark">{stats.pct}%</span>
        </div>
        <Progress value={stats.pct} />
      </Card>

      {/* Semanas */}
      <div className="space-y-3">
        {PLANNER.map((w) => (
          <WeekBlock
            key={w.week}
            week={w}
            isOpen={open === w.week}
            isCurrent={w.week === currentWeek}
            onToggleOpen={() => setOpen((o) => (o === w.week ? -1 : w.week))}
            isDone={isDone}
            toggle={toggle}
            dayComplete={dayComplete}
            currentDay={currentDay}
          />
        ))}
      </div>
    </div>
  )
}

function WeekBlock({
  week,
  isOpen,
  isCurrent,
  onToggleOpen,
  isDone,
  toggle,
  dayComplete,
  currentDay,
}: {
  week: PlannerWeek
  isOpen: boolean
  isCurrent: boolean
  onToggleOpen: () => void
  isDone: (day: number, t: PlannerTask) => boolean
  toggle: (day: number, t: PlannerTask) => void
  dayComplete: (day: number) => boolean
  currentDay: number
}) {
  const doneCount = useMemo(
    () => week.days.filter((d) => dayComplete(d.day)).length,
    [week, dayComplete]
  )
  const allDone = doneCount === week.days.length

  return (
    <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft">
      <button
        onClick={onToggleOpen}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold',
            allDone ? 'bg-success text-white' : isCurrent ? 'bg-accent text-accent-foreground' : 'bg-soft text-primary'
          )}
        >
          {allDone ? <Check className="h-5 w-5" /> : week.week}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2 font-bold text-foreground">
            Semana {week.week}
            {isCurrent && !allDone && (
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent-dark">
                atual
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {doneCount}/{week.days.length} dias concluídos
          </span>
        </div>
        <ChevronDown
          className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div className="space-y-3 border-t border-card-border p-4">
          <WeekDeckLink week={week.week} />
          {week.days.map((d) => (
            <DayRow
              key={d.day}
              day={d}
              isCurrent={d.day === currentDay}
              done={dayComplete(d.day)}
              isDone={isDone}
              toggle={toggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function DayRow({
  day,
  isCurrent,
  done,
  isDone,
  toggle,
}: {
  day: PlannerDay
  isCurrent: boolean
  done: boolean
  isDone: (day: number, t: PlannerTask) => boolean
  toggle: (day: number, t: PlannerTask) => void
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4 transition-colors',
        done ? 'border-success/30 bg-success/5' : isCurrent ? 'border-accent/50 bg-accent/5' : 'border-card-border'
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="font-bold text-foreground">Dia {day.day}</span>
        {isCurrent && !done && (
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent-dark">
            próximo
          </span>
        )}
        {done && <Check className="h-4 w-4 text-success" />}
      </div>

      <div className="space-y-2">
        <TaskCheck
          checked={isDone(day.day, 'lesson')}
          onToggle={() => toggle(day.day, 'lesson')}
          icon={<PlayCircle className="h-4 w-4" />}
          label={`Assistir à aula ${day.lesson}`}
        />
        <ActivityItem
          checked={isDone(day.day, 'activity')}
          onToggle={() => toggle(day.day, 'activity')}
          activity={day.activity}
        />
      </div>
    </div>
  )
}

function WeekDeckLink({ week }: { week: number }) {
  const deck = DECK_BY_KEY[deckForWeek(week)]
  if (!deck) return null
  return (
    <Link
      to={`/deck/${deck.key}`}
      className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 transition-colors hover:bg-accent/10"
    >
      <span className="text-xl">{deck.emoji}</span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold text-foreground">Vocabulário da semana</div>
        <div className="text-xs text-muted-foreground">
          Deck “{deck.label}” · {deck.words.length} palavras
        </div>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-accent-dark" />
    </Link>
  )
}

function ActivityItem({
  checked,
  onToggle,
  activity,
}: {
  checked: boolean
  onToggle: () => void
  activity: string
}) {
  const links = useMemo(() => appLinksForActivity(activity), [activity])
  // Atividade de escrita abre um editor aqui mesmo (não manda pra página de escrita).
  const isWriting = useMemo(() => links.some((l) => l.to === '/escrita'), [links])
  const otherLinks = useMemo(() => links.filter((l) => l.to !== '/escrita'), [links])

  return (
    <div className="rounded-lg p-2">
      <button onClick={onToggle} className="flex w-full items-start gap-3 text-left">
        <span
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
            checked ? 'border-success bg-success text-white' : 'border-muted-foreground/40'
          )}
        >
          {checked && <Check className="h-3.5 w-3.5" />}
        </span>
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              'flex items-center gap-1.5 text-sm font-semibold',
              checked ? 'text-muted-foreground line-through' : 'text-foreground'
            )}
          >
            <Sparkles className="h-4 w-4 text-accent-dark" />
            Atividade do dia
          </div>
          <p className={cn('mt-0.5 text-sm', checked ? 'text-muted-foreground/70' : 'text-muted-foreground')}>
            {activity}
          </p>
        </div>
      </button>

      {/* Escrita: editor inline com avaliação da IA (não sai da página) */}
      {isWriting && <WritingActivity activity={activity} />}

      {/* Fazer no app (demais módulos) */}
      {otherLinks.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 pl-8">
          {otherLinks.map((l) => {
            // Conversação abre já com a atividade do dia como tema da prática
            const to =
              l.to === '/conversacao'
                ? `/conversacao?topic=${encodeURIComponent(activity.slice(0, 400))}`
                : l.to
            return (
              <Link
                key={l.to}
                to={to}
                className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <l.icon className="h-3.5 w-3.5" />
                {l.label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

const ACTIVITY_WRITING_SYSTEM = `Você é uma professora de inglês avaliando um texto que a Ana escreveu para uma atividade de escrita. A Ana é brasileira, nível iniciante/intermediário, se preparando para morar em Malta. Você recebe a DESCRIÇÃO da atividade e o TEXTO da Ana.
Avalie com carinho e objetividade. Responda em português, em texto curto e claro, com três partes marcadas:
Corrigido: a versão corrigida e natural do texto em inglês.
Comentário: o que ficou bom e o que ajustar, e por quê (regras práticas).
Dica: 1 ou 2 dicas rápidas para a próxima.
Não use JSON. Seja concisa e encorajadora.`

/** Escrita da atividade do planner + avaliação da IA, tudo inline. */
function WritingActivity({ activity }: { activity: string }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function evaluate() {
    if (!text.trim() || loading) return
    setError(null)
    setLoading(true)
    setFeedback(null)
    try {
      const content = `Atividade: ${activity}\n\nTexto da Ana:\n${text.trim()}`
      const data = await callFunction<{ reply: string }>('chat', {
        system: ACTIVITY_WRITING_SYSTEM,
        messages: [{ role: 'user', content }],
        maxTokens: 800,
      })
      setFeedback(data.reply?.trim() || 'Sem resposta da IA. Tente de novo.')
    } catch (e) {
      setError(
        e instanceof NotConfiguredError
          ? 'A avaliação por IA precisa do backend configurado.'
          : (e as Error).message
      )
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <div className="mt-2 pl-8">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <PenLine className="h-3.5 w-3.5" />
          Escrever aqui
        </button>
      </div>
    )
  }

  return (
    <div className="mt-2 space-y-2 pl-8">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escreva seu texto em inglês aqui…"
        rows={4}
        className="bg-muted/40 text-sm transition-colors focus:bg-card focus:ring-2 focus:ring-accent"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={evaluate}
          disabled={loading || !text.trim()}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent-dark disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
          {loading ? 'Avaliando…' : 'Avaliar'}
        </button>
        <button
          onClick={() => {
            setOpen(false)
            setFeedback(null)
            setError(null)
          }}
          className="text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          Fechar
        </button>
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
      {feedback && (
        <div className="rounded-lg border border-accent/30 bg-soft p-3 text-sm text-soft-text">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent-dark">
            <Sparkles className="h-3.5 w-3.5" /> Avaliação
          </div>
          <p className="whitespace-pre-wrap leading-relaxed">{feedback}</p>
        </div>
      )}
    </div>
  )
}

function TaskCheck({
  checked,
  onToggle,
  icon,
  label,
  detail,
}: {
  checked: boolean
  onToggle: () => void
  icon: React.ReactNode
  label: string
  detail?: string
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-soft/60"
    >
      <span
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
          checked ? 'border-success bg-success text-white' : 'border-muted-foreground/40'
        )}
      >
        {checked && <Check className="h-3.5 w-3.5" />}
      </span>
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            'flex items-center gap-1.5 text-sm font-semibold',
            checked ? 'text-muted-foreground line-through' : 'text-foreground'
          )}
        >
          <span className="text-accent-dark">{icon}</span>
          {label}
        </div>
        {detail && (
          <p className={cn('mt-0.5 text-sm', checked ? 'text-muted-foreground/70' : 'text-muted-foreground')}>
            {detail}
          </p>
        )}
      </div>
    </button>
  )
}
