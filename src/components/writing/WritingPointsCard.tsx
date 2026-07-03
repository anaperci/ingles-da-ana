import { Star, Flame, Trophy } from 'lucide-react'
import { useWritingPoints } from '@/hooks/useWritingPoints'

/** Banner de pontuação da Escrita: total acumulado, nível e streak. */
export function WritingPointsCard() {
  const { total, todayPoints, level, streak, daysCompleted } = useWritingPoints()

  const empty = total === 0

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary p-5 text-primary-foreground shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
            <Star className="h-3.5 w-3.5" /> Writing points
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-4xl font-extrabold leading-none">{total}</span>
            {todayPoints > 0 && (
              <span className="text-sm font-semibold text-accent-light">+{todayPoints} today</span>
            )}
          </div>
          <div className="mt-1 text-sm text-primary-foreground/80">
            {empty ? 'Write today to start earning' : `Level ${level.current.level} · ${level.current.name}`}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 text-right">
          <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-xs font-bold text-cream-foreground">
            <Flame className="h-3.5 w-3.5" /> {streak} {streak === 1 ? 'day' : 'days'}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-primary-foreground/80">
            <Trophy className="h-3.5 w-3.5" /> {daysCompleted}{' '}
            {daysCompleted === 1 ? 'day done' : 'days done'}
          </span>
        </div>
      </div>

      {/* Barra de progresso rumo ao próximo nível — escondida no estado zero */}
      {!empty && (
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs text-primary-foreground/80">
            {level.next ? (
              <>
                <span>
                  Level {level.next.level} · {level.next.name}
                </span>
                <span className="font-mono">{level.toNext} pts to go</span>
              </>
            ) : (
              <span>Max level reached ⭐</span>
            )}
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-primary-foreground/20">
            <div
              className="h-full rounded-full bg-cream transition-all duration-500"
              style={{ width: `${level.pct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
