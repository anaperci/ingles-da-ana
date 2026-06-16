import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Tone = 'primary' | 'success' | 'warning' | 'accent'

/* Card branco — só o tile do ícone recebe a cor */
const tones: Record<Tone, string> = {
  warning: 'bg-accent text-primary', // flame
  success: 'bg-soft text-accent-dark', // brain/book
  primary: 'bg-primary text-white', // clock
  accent: 'bg-success/15 text-success', // trending
}

interface StatCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  tone?: Tone
}

export function StatCard({ icon: Icon, value, label, tone = 'primary' }: StatCardProps) {
  return (
    <Card className="p-4 transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex flex-col gap-3">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            tones[tone]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="font-mono text-3xl font-bold text-primary">{value}</div>
          <div className="mt-0.5 text-sm text-muted-foreground">{label}</div>
        </div>
      </div>
    </Card>
  )
}
