import { Target } from 'lucide-react'
import { Link } from 'react-router-dom'

/** Card estático (mock) — Daily challenge. */
export function ChallengeCard() {
  return (
    <div className="rounded-2xl bg-accent p-5 text-primary shadow-soft">
      <div className="mb-3 flex items-center gap-2 text-primary/80">
        <Target className="h-5 w-5" />
        <span className="text-xs font-bold uppercase tracking-[0.1em]">Daily challenge</span>
      </div>
      <p className="mb-4 text-lg font-extrabold leading-snug">
        Nail 20 words in a row without missing!
      </p>
      <Link
        to="/vocabulario"
        className="flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-soft"
      >
        Try now
      </Link>
    </div>
  )
}
