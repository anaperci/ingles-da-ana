import type { LucideIcon } from 'lucide-react'
import { Trophy, GraduationCap, Clock, Target } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { currentWeek } from '@/lib/week'
import { todayKey } from '@/lib/storage'

function Row({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-soft text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-mono text-lg font-bold leading-none text-foreground">{value}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  )
}

export function RecordsCard() {
  const { progress, sessions } = useProgress()

  const weekKeys = new Set(currentWeek().map((d) => d.key))
  const weekMinutes = sessions
    .filter((s) => weekKeys.has(todayKey(new Date(s.date))))
    .reduce((acc, s) => acc + s.minutes, 0)

  const mastered = progress.wordsMastered + progress.verbsMastered
  const hasScores = sessions.some((s) => s.score != null)

  return (
    <div className="space-y-4 rounded-2xl border border-card-border bg-card p-5 shadow-soft">
      <span className="text-xs font-bold uppercase tracking-wider text-foreground">
        Your records
      </span>
      <div className="space-y-3">
        <Row icon={Trophy} value={`${progress.longestStreak}`} label="Best streak" />
        <Row icon={GraduationCap} value={`${mastered}`} label="Words mastered" />
        <Row icon={Clock} value={`${weekMinutes}m`} label="This week" />
        <Row
          icon={Target}
          value={hasScores ? `${progress.averageScore}%` : '—'}
          label="Avg. score"
        />
      </div>
    </div>
  )
}
