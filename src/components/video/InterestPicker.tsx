import { INTERESTS } from '@/data/interests'
import { useInterests } from '@/hooks/useInterests'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

export function InterestPicker() {
  const { selected, toggle } = useInterests()
  return (
    <Card className="p-5">
      <h3 className="mb-1 text-lg font-bold">Seus interesses</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Escolha temas para personalizar o vídeo do dia.
      </p>
      <div className="flex flex-wrap gap-2">
        {INTERESTS.map((i) => {
          const active = selected.includes(i.key)
          return (
            <button
              key={i.key}
              onClick={() => toggle(i.key)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-card-border bg-card text-foreground hover:border-accent'
              )}
            >
              {i.emoji} {i.label}
            </button>
          )
        })}
      </div>
    </Card>
  )
}
