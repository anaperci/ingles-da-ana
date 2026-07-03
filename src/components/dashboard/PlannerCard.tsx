import { Link } from 'react-router-dom'
import { CalendarRange, ArrowRight } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { usePlanner } from '@/hooks/usePlanner'
import { useCustomPlan } from '@/hooks/useCustomPlan'
import { isOwner } from '@/lib/azure'

/** Card da Home: progresso no plano (curso CDF pra dona; plano próprio pros demais). */
export function PlannerCard() {
  const owner = isOwner()
  const course = usePlanner()
  const custom = useCustomPlan()

  const pct = owner ? course.stats.pct : custom.stats.pct
  const done = owner ? course.stats.completedDays : custom.stats.done
  const total = owner ? course.stats.totalDays : custom.stats.total
  const unit = owner ? 'days' : 'tasks'
  const sub = owner
    ? `Next: Day ${course.currentDay} · Week ${course.currentWeek}`
    : total === 0
      ? 'Build your study plan'
      : `${done} of ${total} done`

  return (
    <Link
      to="/planner"
      className="block rounded-2xl border border-card-border bg-card p-5 shadow-soft transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
          <CalendarRange className="h-4 w-4 text-accent-dark" /> {owner ? 'Planner' : 'My plan'}
        </span>
        <span className="font-mono text-sm font-bold text-accent-dark">{pct}%</span>
      </div>

      <div className="mb-1 text-2xl font-extrabold text-primary">
        {done}
        <span className="text-base font-bold text-muted-foreground">/{total} {unit}</span>
      </div>
      <Progress value={pct} className="mb-3" />

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{sub}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-accent-dark">
          {owner || total > 0 ? 'Continue' : 'Start'} <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
