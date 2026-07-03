import type { LucideIcon } from 'lucide-react'

interface PageHeaderProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function PageHeader({ icon: Icon, title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-primary shadow-soft">
          <Icon className="h-7 w-7 text-accent-light" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-0.5 text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {actions}
    </div>
  )
}
