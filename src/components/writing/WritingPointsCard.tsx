import { Star, Flame, Trophy } from 'lucide-react'
import { useWritingPoints } from '@/hooks/useWritingPoints'

/** Banner de pontuação da Escrita: total acumulado, nível e streak. */
export function WritingPointsCard() {
  const { total, todayPoints, level, streak, daysCompleted } = useWritingPoints()

  const empty = total === 0
  const nextThreshold = level.next ? total + level.toNext : total

  return (
    <div className="rounded-2xl border border-card-border bg-card p-5 shadow-soft">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
          <Star className="h-3.5 w-3.5 text-accent" /> Writing points
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-soft px-2.5 py-1 text-xs font-bold text-accent-dark">
          <Flame className="h-3 w-3" /> {streak} {streak === 1 ? 'day' : 'days'}
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-mono text-3xl font-extrabold leading-none text-foreground">{total}</span>
        {level.next && <span className="text-sm text-muted-foreground">/ {nextThreshold} pts</span>}
        {todayPoints > 0 && (
          <span className="ml-auto text-sm font-semibold text-accent-dark">+{todayPoints} today</span>
        )}
      </div>

      <div className="mt-1.5 text-sm text-muted-foreground">
        {empty
          ? 'Write today to start earning'
          : level.next
            ? `Level ${level.current.level} · ${level.current.name} → Level ${level.next.level} · ${level.next.name}`
            : `Level ${level.current.level} · ${level.current.name}`}
      </div>

      {!empty && level.next && (
        <>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${level.pct}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Trophy className="h-3 w-3" /> {daysCompleted} {daysCompleted === 1 ? 'day done' : 'days done'}
            </span>
            <span className="font-mono">{level.toNext} pts to go</span>
          </div>
        </>
      )}
    </div>
  )
}
