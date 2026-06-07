import { Languages } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useShowTranslation } from '@/hooks/useShowTranslation'

export function TranslationToggle() {
  const { show, setShow } = useShowTranslation()
  return (
    <div className="flex items-center gap-2 rounded-lg border border-card-border bg-card px-3 py-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <Label htmlFor="translation-toggle" className="cursor-pointer text-sm">
        Tradução PT
      </Label>
      <Switch id="translation-toggle" checked={show} onCheckedChange={setShow} />
    </div>
  )
}
