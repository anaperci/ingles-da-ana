import { Target } from 'lucide-react'
import { Link } from 'react-router-dom'

/** Card estático (mock) — Daily challenge. */
export function ChallengeCard() {
  return (
    <div className="rounded-2xl bg-primary p-5 text-white shadow-soft">
      <div className="mb-3 flex items-center gap-2 text-accent">
        <Target className="h-5 w-5" />
        <span className="text-xs font-bold uppercase tracking-wider">Daily challenge</span>
      </div>
      <p className="mb-4 font-semibold leading-snug">
        Nail 20 words in a row without missing!
      </p>
      <Link
        to="/vocabulario"
        className="flex w-full items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-dark"
      >
        Try now
      </Link>
    </div>
  )
}
