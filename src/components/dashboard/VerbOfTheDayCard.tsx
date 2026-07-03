import { Repeat, Volume2, Briefcase } from 'lucide-react'
import { verbOfTheDay } from '@/data/businessVerbs'
import { todayKey } from '@/lib/storage'
import { speak } from '@/lib/tts'

export function VerbOfTheDayCard() {
  const v = verbOfTheDay(todayKey())

  return (
    <div className="rounded-2xl border border-card-border bg-card p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-foreground">
          Verb of the day
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-soft px-2.5 py-1 text-xs font-semibold text-accent-dark">
          <Briefcase className="h-3.5 w-3.5" />
          Business
        </span>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-accent-light">
          <Repeat className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xl font-extrabold text-foreground">{v.verb}</div>
          <div className="text-sm text-muted-foreground">{v.translation}</div>
        </div>
        <button
          onClick={() => speak(v.verb.replace(/^to /, ''))}
          aria-label="Ouvir"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-primary transition-colors hover:bg-soft"
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        How to use it in business
      </p>
      <ul className="space-y-2">
        {v.sentences.map((s, i) => (
          <li key={i} className="rounded-xl bg-soft/50 p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-foreground">{s.en}</p>
              <button
                onClick={() => speak(s.en)}
                aria-label="Ouvir frase"
                className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-primary"
              >
                <Volume2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{s.pt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
