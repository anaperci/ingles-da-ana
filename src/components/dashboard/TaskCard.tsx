import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'featured' | 'soft'

interface TaskCardProps {
  icon: LucideIcon
  title: string
  desc: string
  cta: string
  to: string
  /** ex.: "15 min" */
  time?: string
  /** linha de meta, ex.: "GOAL · 30 MIN" (variante featured) */
  goal?: string
  variant?: Variant
}

const styles: Record<
  Variant,
  { card: string; chip: string; title: string; desc: string; time: string; btn: string }
> = {
  default: {
    card: 'bg-card border border-card-border',
    chip: 'bg-soft text-primary',
    title: 'text-foreground',
    desc: 'text-muted-foreground',
    time: 'text-muted-foreground',
    btn: 'bg-accent text-accent-foreground hover:bg-accent-dark',
  },
  featured: {
    card: 'bg-primary border border-transparent text-white',
    chip: 'bg-primary-soft text-accent',
    title: 'text-white',
    desc: 'text-on-primary-muted',
    time: 'text-on-primary-muted',
    btn: 'bg-accent text-accent-foreground hover:bg-accent-dark',
  },
  soft: {
    card: 'bg-soft border border-transparent',
    chip: 'bg-white text-primary',
    title: 'text-soft-text',
    desc: 'text-soft-text-2',
    time: 'text-soft-text-2',
    btn: 'bg-primary text-primary-foreground hover:bg-primary-soft',
  },
}

export function TaskCard({
  icon: Icon,
  title,
  desc,
  cta,
  to,
  time,
  goal,
  variant = 'default',
}: TaskCardProps) {
  const s = styles[variant]
  return (
    <div className={cn('flex h-full flex-col gap-3 rounded-2xl p-5 shadow-soft', s.card)}>
      <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', s.chip)}>
        <Icon className="h-5 w-5" />
      </div>
      {goal && (
        <span className="text-xs font-bold uppercase tracking-wider text-accent">{goal}</span>
      )}
      <div className="space-y-1">
        <h3 className={cn('font-bold', s.title)}>{title}</h3>
        <p className={cn('text-sm', s.desc)}>{desc}</p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <Link
          to={to}
          className={cn(
            'inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold shadow-soft transition-colors',
            s.btn
          )}
        >
          {cta}
        </Link>
        {time && (
          <span className={cn('flex items-center gap-1 text-xs font-medium', s.time)}>
            <Clock className="h-3.5 w-3.5" />
            {time}
          </span>
        )}
      </div>
    </div>
  )
}
