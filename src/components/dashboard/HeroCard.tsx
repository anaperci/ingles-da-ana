import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ProgressRing } from './ProgressRing'

interface HeroCardProps {
  /** % da meta diária concluída (0–100) */
  pct: number
}

export function HeroCard({ pct }: HeroCardProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-primary p-6 text-white shadow-soft">
      <div className="space-y-4">
        <h2 className="max-w-xs text-xl font-extrabold leading-snug">
          Your plan for today is almost there
        </h2>
        <Link
          to="/escrita"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-colors hover:bg-accent-dark"
        >
          View tasks
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ProgressRing value={pct} />
    </div>
  )
}
