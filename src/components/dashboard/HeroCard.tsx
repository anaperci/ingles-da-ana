import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
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
    <div
      className="relative flex items-center justify-between gap-5 overflow-hidden rounded-2xl p-6 text-white shadow-elevated sm:p-7"
      style={{ background: 'linear-gradient(130deg,#0a192f,#102341 55%,#1b3358)' }}
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute -top-24 right-8 h-60 w-60 rounded-full"
        style={{ background: 'radial-gradient(circle,hsl(var(--color-accent)/0.22),transparent 70%)' }}
      />
      <div className="relative flex flex-col gap-3">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent-light">
            <Sparkles className="h-3.5 w-3.5" /> Your plan today
          </span>
          <h2 className="max-w-xs text-xl font-extrabold leading-snug sm:text-2xl">{headline}</h2>
        </div>
        <Link
          to="/escrita"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-colors hover:bg-accent-dark"
        >
          View tasks
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ProgressRing value={pct} size={112} />
    </div>
  )
}
