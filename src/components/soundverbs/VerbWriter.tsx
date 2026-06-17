import { useState } from 'react'
import { Check, ArrowRight, Volume2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { speak } from '@/lib/tts'
import { cn } from '@/lib/utils'
import { CorrectionCard } from '@/components/common/CorrectionCard'
import { useProgress } from '@/hooks/useProgress'
import { normalize } from '@/lib/pronunciation/evaluator'
import type { SoundVerb } from '@/data/soundVerbs'

type Verdict = 'idle' | 'correct' | 'wrong'

/**
 * Modo ESCREVER: 1) escreva o passado do verbo; 2) vire a frase do presente
 * para o passado (trocando o verbo). Valida se o passado correto aparece.
 */
export function VerbWriter({ verb }: { verb: SoundVerb }) {
  const { addSession } = useProgress()
  const [pastAnswer, setPastAnswer] = useState('')
  const [pastVerdict, setPastVerdict] = useState<Verdict>('idle')
  const [sentence, setSentence] = useState('')
  const [sentenceVerdict, setSentenceVerdict] = useState<Verdict>('idle')
  const [logged, setLogged] = useState(false)

  function checkPast() {
    const ok = normalize(pastAnswer) === normalize(verb.past)
    setPastVerdict(ok ? 'correct' : 'wrong')
  }

  function checkSentence() {
    const ans = normalize(sentence)
    const ok = ans.length > 0 && ans.includes(normalize(verb.past))
    setSentenceVerdict(ok ? 'correct' : 'wrong')
    if (ok && !logged) {
      addSession({
        module: 'verbs',
        title: `Escrever · ${verb.base} → ${verb.past}`,
        minutes: 2,
        score: null,
      })
      setLogged(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Passo 1: o passado */}
      <Card className="space-y-3 p-5">
        <div className="text-sm font-semibold text-muted-foreground">
          1. Qual é o passado de <span className="font-mono text-foreground">{verb.base}</span>?
          <span className="ml-1 font-normal">({verb.translation})</span>
        </div>
        <div className="flex gap-2">
          <Input
            value={pastAnswer}
            onChange={(e) => {
              setPastAnswer(e.target.value)
              setPastVerdict('idle')
            }}
            onKeyDown={(e) => e.key === 'Enter' && checkPast()}
            placeholder="escreva o passado..."
            className={cn(
              pastVerdict === 'correct' && 'border-success',
              pastVerdict === 'wrong' && 'border-error'
            )}
          />
          <Button variant="outline" onClick={checkPast} disabled={!pastAnswer.trim()}>
            Verificar
          </Button>
        </div>
        {pastVerdict === 'correct' && (
          <p className="flex items-center gap-2 text-sm text-success">
            <Check className="h-4 w-4" /> Isso! <span className="font-mono">{verb.past}</span>
            <button
              onClick={() => speak(`${verb.base}, ${verb.past}`)}
              className="rounded-full p-1 hover:bg-secondary"
              aria-label="Ouvir"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </p>
        )}
        {pastVerdict === 'wrong' && (
          <CorrectionCard
            ok={false}
            your={pastAnswer}
            answer={`${verb.base} → ${verb.past}`}
            example={verb.examplePast.en}
            exampleTranslation={verb.examplePast.pt}
          />
        )}
      </Card>

      {/* Passo 2: virar a frase */}
      <Card className="space-y-3 p-5">
        <div className="text-sm font-semibold text-muted-foreground">
          2. Vire esta frase para o passado:
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-secondary/60 px-3 py-2">
          <span className="font-medium">{verb.examplePresent.en}</span>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">passado</span>
        </div>
        <Textarea
          value={sentence}
          onChange={(e) => {
            setSentence(e.target.value)
            setSentenceVerdict('idle')
          }}
          placeholder="reescreva no passado, trocando o verbo..."
          rows={2}
          className={cn(
            sentenceVerdict === 'correct' && 'border-success',
            sentenceVerdict === 'wrong' && 'border-error'
          )}
        />
        <div className="flex justify-end">
          <Button variant="gradient" onClick={checkSentence} disabled={!sentence.trim()} className="gap-2">
            <Check className="h-4 w-4" /> Conferir
          </Button>
        </div>
        {sentenceVerdict === 'correct' && (
          <div className="space-y-1 rounded-lg bg-success/10 px-4 py-3 text-sm">
            <p className="flex items-center gap-2 text-success">
              <Check className="h-4 w-4" /> Boa! Você usou <span className="font-mono">{verb.past}</span> certo.
            </p>
            <p className="text-muted-foreground">
              Modelo: <span className="font-medium text-foreground">{verb.examplePast.en}</span> — {verb.examplePast.pt}
            </p>
          </div>
        )}
        {sentenceVerdict === 'wrong' && (
          <CorrectionCard
            ok={false}
            answer={verb.examplePast.en}
            exampleTranslation={verb.examplePast.pt}
            note={`Faltou o passado "${verb.past}" na frase. Use a forma do passado.`}
          />
        )}
      </Card>
    </div>
  )
}
