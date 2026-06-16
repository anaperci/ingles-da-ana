import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ProgressRing } from './ProgressRing'

interface HeroCardProps {
  /** % da meta diária concluída (0–100) */
  pct: number
}

export function HeroCard({ pct }: HeroCardProps) {
  const headline =
    pct >= 100
      ? "Today's plan is complete. Great job!"
      : pct === 0
        ? "Let's kick off your plan for today"
        : 'Your plan for today is almost there'
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl bg-primary p-5 text-white shadow-soft">
      <div className="flex flex-col gap-3">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Your plan today
          </span>
          <h2 className="max-w-xs text-xl font-extrabold leading-snug">{headline}</h2>
        </div>
        <Link
          to="/escrita"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-colors hover:bg-accent-dark"
        >
          View tasks
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ProgressRing value={pct} size={92} />
    </div>
  )
}
