import { ArrowRight, Volume2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { speak } from '@/lib/tts'
import type { SoundVerb } from '@/data/soundVerbs'

/** Card de um verbo na lista: par presente → passado. */
export function VerbCard({ verb, onOpen }: { verb: SoundVerb; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="group text-left">
      <Card className="flex h-full flex-col p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-base font-bold sm:text-lg">
            <span>{verb.base}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary">{verb.past}</span>
          </div>
          <Badge variant="secondary">{verb.level}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-medium text-muted-foreground">{verb.translation}</p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              speak(`${verb.base}, ${verb.past}`)
            }}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Ouvir o par"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>
      </Card>
    </button>
  )
}
