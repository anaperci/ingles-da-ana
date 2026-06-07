import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Tone = 'primary' | 'success' | 'warning' | 'accent'

const tones: Record<Tone, string> = {
  primary: 'from-primary/10 to-primary/5 text-primary',
  success: 'from-success/10 to-success/5 text-success',
  warning: 'from-warning/10 to-warning/5 text-warning',
  accent: 'from-accent/10 to-accent/5 text-accent',
}

interface StatCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  tone?: Tone
}

export function StatCard({ icon: Icon, value, label, tone = 'primary' }: StatCardProps) {
  return (
    <Card
      className={cn(
        'bg-gradient-to-br p-4 transition-transform duration-200 hover:scale-[1.03]',
        tones[tone]
      )}
    >
      <div className="flex flex-col items-center gap-1.5 text-center">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <span className="font-mono text-2xl font-bold">{value}</span>
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
    </Card>
  )
}
