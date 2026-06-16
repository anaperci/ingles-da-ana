import { Flame, Check } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { currentWeek } from '@/lib/week'
import { cn } from '@/lib/utils'

export function ThisWeekCard() {
  const { progress } = useProgress()
  const active = new Set(progress.activeDays)
  const week = currentWeek()

  return (
    <div className="rounded-2xl border border-card-border bg-card p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-foreground">
          This week
        </span>
        <span className="flex items-center gap-1 text-xs font-semibold text-accent-dark">
          <Flame className="h-3.5 w-3.5" />
          {progress.streak}-day streak
        </span>
      </div>

      <div className="flex justify-between">
        {week.map((d, i) => {
          const practiced = active.has(d.key)
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-medium text-muted-foreground">{d.label}</span>
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold',
                  practiced
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground',
                  d.isToday && 'border-2 border-accent'
                )}
              >
                {practiced && <Check className="h-4 w-4" />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
