import { ArrowRight, Volume2, Lightbulb } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { speak } from '@/lib/tts'
import { useShowTranslation } from '@/hooks/useShowTranslation'
import type { SoundVerb, VerbExample } from '@/data/soundVerbs'

/** Modo LER: o par + as duas frases (presente/passado, en+pt) + dica. */
export function VerbReader({ verb }: { verb: SoundVerb }) {
  return (
    <div className="space-y-4">
      {verb.pronunciationTip && (
        <div className="flex items-start gap-3 rounded-lg bg-primary/10 px-4 py-3 text-sm">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span>
            <strong className="text-primary">Pronúncia:</strong> {verb.pronunciationTip}
          </span>
        </div>
      )}

      {/* Par */}
      <Card className="flex items-center justify-center gap-3 p-6 text-center">
        <span className="font-mono text-2xl font-extrabold">{verb.base}</span>
        <ArrowRight className="h-6 w-6 text-muted-foreground" />
        <span className="font-mono text-2xl font-extrabold text-primary">{verb.past}</span>
        <button
          onClick={() => speak(`${verb.base}, ${verb.past}`)}
          className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
          aria-label="Ouvir o par"
        >
          <Volume2 className="h-5 w-5" />
        </button>
      </Card>

      <ExampleRow label="Presente" example={verb.examplePresent} />
      <ExampleRow label="Passado" example={verb.examplePast} />
    </div>
  )
}

function ExampleRow({ label, example }: { label: string; example: VerbExample }) {
  const { show } = useShowTranslation()
  return (
    <Card className="p-4">
      <div className="mb-1 flex items-center gap-2">
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <button
          onClick={() => speak(example.en)}
          className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
          aria-label="Ouvir"
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>
      <p className="font-semibold">{example.en}</p>
      {show && <p className="text-sm text-muted-foreground">{example.pt}</p>}
    </Card>
  )
}
