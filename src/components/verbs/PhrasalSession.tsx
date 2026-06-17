import { useMemo, useState } from 'react'
import { Trophy, X, Check, Volume2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { speak } from '@/lib/tts'
import { PronounceButton } from '@/components/common/PronounceButton'
import { CorrectionCard } from '@/components/common/CorrectionCard'
import { useVerbs, buildOptions } from '@/hooks/useVerbs'
import { useProgress } from '@/hooks/useProgress'
import { useShowTranslation } from '@/hooks/useShowTranslation'
import { PHRASAL_VERBS } from '@/data/phrasalVerbs'
import type { PhrasalMode, PhrasalVerb } from '@/types/verbs'

interface Props {
  queue: PhrasalVerb[]
  mode: PhrasalMode
  onExit: () => void
}

export function PhrasalSession({ queue, mode, onExit }: Props) {
  const { review } = useVerbs()
  const { addSession } = useProgress()
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const startedAt = useMemo(() => Date.now(), [])

  const total = queue.length
  const pv = queue[index]

  function next(ok: boolean) {
    if (pv) review(pv.id, ok ? 4 : 1)
    if (ok) setCorrect((c) => c + 1)
    if (index + 1 >= total) {
      const minutes = Math.max(1, Math.round((Date.now() - startedAt) / 60000))
      addSession({
        module: 'verbs',
        title: `Phrasal verbs · ${mode === 'match' ? 'Significado' : 'Completar'}`,
        minutes,
        score: Math.round(((correct + (ok ? 1 : 0)) / total) * 100),
      })
      setDone(true)
    } else {
      setIndex((i) => i + 1)
    }
  }

  if (done) {
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0
    return (
      <Card className="flex flex-col items-center gap-4 p-6 sm:p-10 text-center animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Trophy className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold">Concluído! 🎉</h2>
        <p className="text-muted-foreground">{total} phrasal verbs · {correct} certos ({pct}%).</p>
        <Button variant="gradient" onClick={onExit}>Voltar</Button>
      </Card>
    )
  }

  if (!pv) {
    return (
      <Card className="p-6 sm:p-10 text-center text-muted-foreground">
        Nada para revisar agora. 😴
        <div className="mt-4"><Button variant="outline" onClick={onExit}>Voltar</Button></div>
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center gap-4">
        <Progress value={Math.round((index / total) * 100)} className="flex-1" />
        <span className="font-mono text-sm text-muted-foreground">{index + 1}/{total}</span>
        <Button size="icon" variant="ghost" onClick={onExit} aria-label="Sair"><X className="h-5 w-5" /></Button>
      </div>

      {mode === 'match' ? (
        <MatchCard key={pv.id} pv={pv} onAnswer={next} />
      ) : (
        <CompleteCard key={pv.id} pv={pv} onAnswer={next} />
      )}
    </div>
  )
}

function MatchCard({ pv, onAnswer }: { pv: PhrasalVerb; onAnswer: (ok: boolean) => void }) {
  const { show } = useShowTranslation()
  const options = useMemo(
    () => buildOptions(pv.translation, PHRASAL_VERBS.map((p) => p.translation)),
    [pv]
  )
  const [selected, setSelected] = useState<string | null>(null)

  function choose(opt: string) {
    if (selected) return
    setSelected(opt)
    setTimeout(() => onAnswer(opt === pv.translation), 900)
  }

  return (
    <Card className="space-y-5 p-6 sm:p-8">
      <div className="flex items-center justify-center gap-2 text-center">
        <span className="text-2xl font-extrabold">{pv.phrasal}</span>
        <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary" onClick={() => speak(pv.phrasal)} aria-label="Ouvir">
          <Volume2 className="h-5 w-5" />
        </button>
        <PronounceButton text={pv.phrasal} />
      </div>
      <p className="text-center text-sm text-muted-foreground">O que significa?</p>
      <div className="grid gap-3">
        {options.map((opt) => {
          const isCorrect = opt === pv.translation
          const isSel = opt === selected
          const showState = selected !== null
          return (
            <button
              key={opt}
              disabled={showState}
              onClick={() => choose(opt)}
              className={cn(
                'flex items-center justify-between rounded-lg border border-card-border bg-card px-4 py-3 text-left font-medium transition-colors',
                !showState && 'hover:border-primary hover:bg-secondary',
                showState && isCorrect && 'border-success bg-success/10 text-success',
                showState && isSel && !isCorrect && 'border-error bg-error/10 text-error',
                showState && !isSel && !isCorrect && 'opacity-60'
              )}
            >
              {opt}
              {showState && isCorrect && <Check className="h-5 w-5" />}
            </button>
          )
        })}
      </div>
      {selected && (
        <CorrectionCard
          ok={selected === pv.translation}
          answer={`${pv.phrasal} = ${pv.translation}`}
          speakAnswer={false}
          example={pv.example}
          exampleTranslation={pv.exampleTranslation}
        />
      )}
    </Card>
  )
}

function CompleteCard({ pv, onAnswer }: { pv: PhrasalVerb; onAnswer: (ok: boolean) => void }) {
  const { show } = useShowTranslation()
  const options = useMemo(
    () => buildOptions(pv.phrasal, PHRASAL_VERBS.map((p) => p.phrasal)),
    [pv]
  )
  const [selected, setSelected] = useState<string | null>(null)
  // remove o phrasal da frase (case-insensitive) e deixa a lacuna
  const blanked = useMemo(() => {
    const re = new RegExp(pv.phrasal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    return pv.example.replace(re, '_____')
  }, [pv])

  function choose(opt: string) {
    if (selected) return
    setSelected(opt)
    setTimeout(() => onAnswer(opt === pv.phrasal), 900)
  }

  return (
    <Card className="space-y-5 p-6 sm:p-8">
      <p className="text-center text-lg font-semibold">“{blanked}”</p>
      {show && <p className="text-center text-sm text-muted-foreground">{pv.exampleTranslation}</p>}
      <p className="text-center text-sm text-muted-foreground">Qual phrasal verb completa?</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt) => {
          const isCorrect = opt === pv.phrasal
          const isSel = opt === selected
          const showState = selected !== null
          return (
            <button
              key={opt}
              disabled={showState}
              onClick={() => choose(opt)}
              className={cn(
                'rounded-lg border border-card-border bg-card px-4 py-3 font-medium transition-colors',
                !showState && 'hover:border-primary hover:bg-secondary',
                showState && isCorrect && 'border-success bg-success/10 text-success',
                showState && isSel && !isCorrect && 'border-error bg-error/10 text-error',
                showState && !isSel && !isCorrect && 'opacity-60'
              )}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {selected && (
        <CorrectionCard
          ok={selected === pv.phrasal}
          answer={pv.phrasal}
          note={`Significa: ${pv.translation}`}
          example={pv.example}
          exampleTranslation={pv.exampleTranslation}
        />
      )}
    </Card>
  )
}
