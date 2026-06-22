import { useMemo, useState } from 'react'
import {
  CalendarRange,
  Check,
  ChevronDown,
  PlayCircle,
  ListChecks,
  Sparkles,
} from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { usePlanner, type PlannerTask } from '@/hooks/usePlanner'
import { PLANNER, type PlannerDay, type PlannerWeek } from '@/data/planner'

export default function Planner() {
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
        <TaskCheck
          checked={isDone(day.day, 'quiz')}
          onToggle={() => toggle(day.day, 'quiz')}
          icon={<ListChecks className="h-4 w-4" />}
          label={`Fazer o Quiz ${day.quiz}`}
        />
        <TaskCheck
          checked={isDone(day.day, 'activity')}
          onToggle={() => toggle(day.day, 'activity')}
          icon={<Sparkles className="h-4 w-4" />}
          label="Atividade do dia"
          detail={day.activity}
        />
      </div>
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
