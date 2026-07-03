import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useShowTranslation } from '@/hooks/useShowTranslation'
import type { SentenceFrame } from '@/data/sentenceFrames'

const LEVEL_LABEL: Record<SentenceFrame['level'], string> = {
  beginner: 'iniciante',
  intermediate: 'intermediário',
}

const LEVEL_BADGE: Record<SentenceFrame['level'], string> = {
  beginner: 'bg-soft text-accent-dark',
  intermediate: 'bg-muted text-muted-foreground',
}

/** Card de uma estrutura na lista. */
export function FrameCard({
  frame,
  onOpen,
}: {
  frame: SentenceFrame
  onOpen: () => void
}) {
  const { show } = useShowTranslation()

  return (
    <button onClick={onOpen} className="group text-left">
      <Card className="flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-elevated">
        <div className="mb-3 flex items-start justify-between gap-2">
          <span className="font-mono text-lg font-bold text-primary">{frame.frame}</span>
          <Badge className={`shrink-0 border-transparent ${LEVEL_BADGE[frame.level]}`}>
            {LEVEL_LABEL[frame.level]}
          </Badge>
        </div>
        {show && (
          <p className="mb-1 font-bold text-accent-dark">{frame.meaning}</p>
        )}
        <p className="line-clamp-2 text-sm text-muted-foreground">{frame.explanation}</p>
        <div className="mt-4 flex items-center justify-between border-t border-card-border pt-3 text-sm text-muted-foreground">
          <span>{frame.examples.length} exemplos</span>
          <ArrowRight className="h-4 w-4 text-accent-dark transition-transform group-hover:translate-x-1" />
        </div>
      </Card>
    </button>
  )
}
