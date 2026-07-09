import { Link } from 'react-router-dom'
import { Repeat, Volume2, ArrowRight } from 'lucide-react'
import { verbsOfTheDay } from '@/data/irregularVerbs'
import { todayKey } from '@/lib/storage'
import { speak } from '@/lib/tts'

const VERBS_PER_DAY = 8

export function DailyVerbsCard() {
  const verbs = verbsOfTheDay(todayKey(), VERBS_PER_DAY)

  return (
    <div className="rounded-2xl border border-card-border bg-card p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-foreground">
          {VERBS_PER_DAY} verbos do dia
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-soft px-2.5 py-1 text-xs font-semibold text-accent-dark">
          <Repeat className="h-3.5 w-3.5" />
          Pra aprender
        </span>
      </div>

      <ul className="space-y-2">
        {verbs.map((v) => (
          <li
            key={v.id}
            className="flex items-center gap-3 rounded-xl bg-soft/50 p-3"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-bold text-foreground">{v.present}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {v.past} · {v.pastParticiple}
                </span>
              </div>
              <div className="truncate text-sm text-muted-foreground">{v.translation}</div>
            </div>
            <button
              onClick={() => speak(v.present)}
              aria-label={`Ouvir ${v.present}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-primary transition-colors hover:bg-soft"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <Link
        to="/verbos"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark hover:underline"
      >
        Treinar verbos
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}
