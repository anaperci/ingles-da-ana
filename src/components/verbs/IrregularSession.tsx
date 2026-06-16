import { useEffect, useMemo, useRef, useState } from 'react'
import { Trophy, X, Volume2, Check, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { speak } from '@/lib/tts'
import { PronounceButton } from '@/components/common/PronounceButton'
import { useVerbs } from '@/hooks/useVerbs'
import { useProgress } from '@/hooks/useProgress'
import { useShowTranslation } from '@/hooks/useShowTranslation'
import type { ReviewQuality } from '@/lib/srs'
import type { IrregularMode, IrregularVerb } from '@/types/verbs'
import { verbPronunciationRules } from '@/data/verbRules'

interface Props {
  queue: IrregularVerb[]
  mode: IrregularMode
  onExit: () => void
}

const norm = (s: string) => s.trim().toLowerCase()

export function IrregularSession({ queue, mode, onExit }: Props) {
  const { review, recordFormMiss } = useVerbs()
  const { addSession } = useProgress()
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const startedAt = useMemo(() => Date.now(), [])

  const total = queue.length
  const verb = queue[index]

  function next(quality: ReviewQuality, wasCorrect: boolean) {
    if (verb) review(verb.id, quality)
    if (wasCorrect) setCorrect((c) => c + 1)
    if (index + 1 >= total) {
      const minutes = Math.max(1, Math.round((Date.now() - startedAt) / 60000))
      const score = mode === 'flashcard' ? null : Math.round(((correct + (wasCorrect ? 1 : 0)) / total) * 100)
      addSession({ module: 'verbs', title: `Verbos irregulares · ${labelFor(mode)}`, minutes, score })
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
        <p className="text-muted-foreground">
          {total} verbos{mode !== 'flashcard' && <> · {correct} certos ({pct}%)</>}.
        </p>
        <Button variant="gradient" onClick={onExit}>Voltar</Button>
      </Card>
    )
  }

  if (!verb) {
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

      {mode === 'flashcard' && <FlashcardCard key={verb.id} verb={verb} onRate={(q) => next(q, q >= 3)} />}
      {mode !== 'flashcard' && (
        <TypeCard
          key={verb.id}
          verb={verb}
          timed={mode === 'timed'}
          onResult={(ok, missed) => {
            missed.forEach((f) => recordFormMiss(verb.id, f))
            next(ok ? 4 : 1, ok)
          }}
        />
      )}
    </div>
  )
}

function labelFor(m: IrregularMode) {
  return m === 'flashcard' ? 'Flashcards' : m === 'fillgap' ? 'Preencher' : 'Cronometrado'
}

function FlashcardCard({ verb, onRate }: { verb: IrregularVerb; onRate: (q: ReviewQuality) => void }) {
  const [flipped, setFlipped] = useState(false)
  const { show } = useShowTranslation()
  return (
    <div className="space-y-5">
      <Card
        onClick={() => setFlipped((v) => !v)}
        className="flex min-h-[240px] cursor-pointer flex-col items-center justify-center gap-3 p-6 sm:p-8 text-center"
      >
        <div className="text-3xl font-extrabold">{verb.present}</div>
        {show && <div className="text-sm text-muted-foreground">{verb.translation}</div>}
        {!flipped ? (
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <RotateCcw className="h-3.5 w-3.5" /> qual o passado e o particípio?
          </div>
        ) : (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 animate-fade-in">
            <FormChip label="Passado" value={verb.past} />
            <FormChip label="Particípio" value={verb.pastParticiple} />
          </div>
        )}
      </Card>
      {flipped && <VerbExtras verb={verb} />}
      {flipped ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Button variant="outline" className="text-error" onClick={() => onRate(1)}>Errei</Button>
          <Button variant="outline" className="text-warning" onClick={() => onRate(3)}>Difícil</Button>
          <Button variant="secondary" onClick={() => onRate(4)}>Bom</Button>
          <Button variant="gradient" onClick={() => onRate(5)}>Fácil</Button>
        </div>
      ) : (
        <Button className="w-full" variant="outline" onClick={() => setFlipped(true)}>Mostrar resposta</Button>
      )}
    </div>
  )
}

function VerbExtras({ verb }: { verb: IrregularVerb }) {
  const { show } = useShowTranslation()
  const rules = verbPronunciationRules.filter((r) => r.examples.includes(verb.id))
  return (
    <div className="animate-fade-in space-y-3 rounded-xl border border-card-border bg-soft/40 p-4">
      <ExampleLine label="Presente" ex={verb.examplePresent} show={show} />
      <ExampleLine label="Passado" ex={verb.examplePast} show={show} />
      {verb.pronunciationTip && (
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-accent-text">Pronúncia: </span>
          {verb.pronunciationTip}
        </p>
      )}
      {rules.map((r) => (
        <div key={r.id} className="rounded-lg bg-white p-2.5">
          <p className="text-xs font-bold text-primary">{r.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{r.explanation}</p>
        </div>
      ))}
    </div>
  )
}

function ExampleLine({
  label,
  ex,
  show,
}: {
  label: string
  ex: { en: string; pt: string }
  show: boolean
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <button onClick={() => speak(ex.en)} className="text-muted-foreground hover:text-primary" aria-label="Ouvir">
          <Volume2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="text-sm font-medium text-foreground">{ex.en}</p>
      {show && <p className="text-xs text-muted-foreground">{ex.pt}</p>}
    </div>
  )
}

function FormChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-xl font-bold text-primary">{value}</span>
        <button onClick={(e) => { e.stopPropagation(); speak(value) }} className="text-muted-foreground hover:text-foreground" aria-label="Ouvir">
          <Volume2 className="h-4 w-4" />
        </button>
        <PronounceButton text={value} />
      </div>
    </div>
  )
}

const TIME_LIMIT = 15

function TypeCard({
  verb,
  timed,
  onResult,
}: {
  verb: IrregularVerb
  timed: boolean
  onResult: (ok: boolean, missed: ('past' | 'participle')[]) => void
}) {
  const { show } = useShowTranslation()
  const [past, setPast] = useState('')
  const [participle, setParticiple] = useState('')
  const [checked, setChecked] = useState<null | { pastOk: boolean; partOk: boolean }>(null)
  const [seconds, setSeconds] = useState(TIME_LIMIT)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!timed) return
    timerRef.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(timerRef.current!)
          submit()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => { if (timerRef.current) window.clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function submit() {
    if (checked) return
    const pastOk = norm(past) === norm(verb.past)
    const partOk = norm(participle) === norm(verb.pastParticiple)
    setChecked({ pastOk, partOk })
    if (timerRef.current) window.clearInterval(timerRef.current)
    const missed: ('past' | 'participle')[] = []
    if (!pastOk) missed.push('past')
    if (!partOk) missed.push('participle')
    setTimeout(() => onResult(pastOk && partOk, missed), 1100)
  }

  return (
    <Card className="space-y-5 p-6 sm:p-8">
      <div className="text-center">
        <div className="text-2xl font-extrabold">{verb.present}</div>
        {show && <div className="text-sm text-muted-foreground">{verb.translation}</div>}
        {timed && (
          <div className={cn('mt-2 font-mono text-sm', seconds <= 5 ? 'text-error' : 'text-muted-foreground')}>
            ⏱ {seconds}s
          </div>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Passado simples" value={past} onChange={setPast} state={checked?.pastOk} answer={verb.past} disabled={!!checked} onEnter={submit} />
        <Field label="Particípio passado" value={participle} onChange={setParticiple} state={checked?.partOk} answer={verb.pastParticiple} disabled={!!checked} onEnter={submit} />
      </div>

      {!checked && (
        <Button className="w-full" variant="gradient" onClick={submit} disabled={!past && !participle}>
          <Check className="h-4 w-4" /> Verificar
        </Button>
      )}
    </Card>
  )
}

function Field({
  label, value, onChange, state, answer, disabled, onEnter,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  state: boolean | undefined
  answer: string
  disabled: boolean
  onEnter: () => void
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onEnter()}
        disabled={disabled}
        autoComplete="off"
        className={cn(
          state === true && 'border-success text-success',
          state === false && 'border-error text-error'
        )}
        placeholder="…"
      />
      {state === false && (
        <span className="text-xs text-success">✓ {answer}</span>
      )}
    </div>
  )
}
