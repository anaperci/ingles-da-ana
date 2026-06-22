import { Link } from 'react-router-dom'
import { CalendarRange, ArrowRight } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { usePlanner } from '@/hooks/usePlanner'

/** Card da Home: progresso no Planner + atalho pro próximo dia. */
export function PlannerCard() {
  const { stats, currentWeek, currentDay } = usePlanner()

  return (
    <Link
      to="/planner"
      className="block rounded-2xl border border-card-border bg-card p-5 shadow-soft transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
          <CalendarRange className="h-4 w-4 text-accent-dark" /> Planner
        </span>
        <span className="font-mono text-sm font-bold text-accent-dark">{stats.pct}%</span>
      </div>

      <div className="mb-1 text-2xl font-extrabold text-primary">
        {stats.completedDays}
        <span className="text-base font-bold text-muted-foreground">/{stats.totalDays} dias</span>
      </div>
      <Progress value={stats.pct} className="mb-3" />

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Próximo: <strong className="text-foreground">Dia {currentDay}</strong> · Sem. {currentWeek}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-accent-dark">
          Continuar <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
