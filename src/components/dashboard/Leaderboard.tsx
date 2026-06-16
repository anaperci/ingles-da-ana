import { cn } from '@/lib/utils'

/** Dados estáticos (mock) — apenas para estabelecer o visual. */
const ROWS = [
  { rank: '01', name: 'Mark', points: 2398, tone: 'gold' as const },
  { rank: '02', name: 'Hannah', points: 2019, tone: 'cream' as const },
  { rank: '03', name: 'Morry', points: 1832, tone: 'cream' as const },
  { rank: '07', name: 'You', points: 420, tone: 'me' as const },
]

const toneStyles = {
  gold: 'bg-soft-2',
  cream: 'bg-soft',
  me: 'bg-primary text-white',
}

export function Leaderboard() {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-5 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-foreground">
          Leaderboard
        </span>
        <button className="text-xs font-semibold text-accent-dark hover:underline">
          view all
        </button>
      </div>
      <ul className="space-y-2">
        {ROWS.map((r) => {
          const me = r.tone === 'me'
          return (
            <li
              key={r.rank}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2',
                toneStyles[r.tone]
              )}
            >
              <span
                className={cn(
                  'font-mono text-xs font-bold',
                  me ? 'text-accent' : 'text-soft-text-2'
                )}
              >
                #{r.rank}
              </span>
              <span
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold',
                  me ? 'bg-accent text-accent-foreground' : 'bg-white text-primary'
                )}
              >
                {r.name[0]}
              </span>
              <span className={cn('flex-1 text-sm font-semibold', me ? 'text-white' : 'text-soft-text')}>
                {r.name}
              </span>
              <span
                className={cn(
                  'font-mono text-sm font-bold',
                  me ? 'text-accent' : 'text-soft-text'
                )}
              >
                {r.points}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
