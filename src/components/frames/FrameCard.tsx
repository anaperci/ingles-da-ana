import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SentenceFrame } from '@/data/sentenceFrames'

const LEVEL_LABEL: Record<SentenceFrame['level'], string> = {
  beginner: 'iniciante',
  intermediate: 'intermediário',
}

/** Card de uma estrutura na lista. */
export function FrameCard({
  frame,
  onOpen,
}: {
  frame: SentenceFrame
  onOpen: () => void
}) {
  return (
    <button onClick={onOpen} className="group text-left">
      <Card className="flex h-full flex-col p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono text-lg font-bold text-primary">{frame.frame}</span>
          <Badge variant="secondary">{LEVEL_LABEL[frame.level]}</Badge>
        </div>
        <p className="font-medium">{frame.meaning}</p>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{frame.explanation}</p>
        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>{frame.examples.length} exemplos</span>
          <span className="flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Abrir <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Card>
    </button>
  )
}
