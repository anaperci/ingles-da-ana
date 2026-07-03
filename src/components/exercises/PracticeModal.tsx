import { useMemo, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Check, X, ArrowRight, Lightbulb, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TypeBadge, DifficultyBadge } from './badges'
import {
  saveAttempt,
  normAnswer,
  type Exercise,
  type MatchOptions,
} from '@/lib/exercises'

interface Props {
  queue: Exercise[]
  startIndex: number
  onClose: () => void
  onAttemptSaved: () => void
}

export function PracticeModal({ queue, startIndex, onClose, onAttemptSaved }: Props) {
  const [index, setIndex] = useState(startIndex)
  const [done, setDone] = useState(false)
  const ex = queue[index]

  function handleAnswered(isCorrect: boolean, userAnswer: string) {
    saveAttempt(ex.id, userAnswer, isCorrect).then(onAttemptSaved).catch(() => {})
  }

  function next() {
    if (index >= queue.length - 1) setDone(true)
    else setIndex((i) => i + 1)
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="left-0 top-0 h-screen w-screen max-w-none translate-x-0 translate-y-0 gap-0 overflow-y-auto rounded-none border-0 bg-background p-0 sm:rounded-none">
        <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:py-10">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {done ? 'Fim' : `${index + 1} de ${queue.length}`}
            </span>
          </div>

          {done ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Trophy className="h-8 w-8 text-accent-light" />
              </div>
              <h2 className="text-2xl font-bold">Prática concluída! 🎉</h2>
              <button
                onClick={onClose}
                className="rounded-full bg-accent px-6 py-2.5 font-semibold text-accent-foreground hover:bg-accent-dark"
              >
                Voltar
              </button>
            </div>
          ) : (
            <Player
              key={ex.id}
              exercise={ex}
              onAnswered={handleAnswered}
              onNext={next}
              isLast={index >= queue.length - 1}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface PlayerProps {
  exercise: Exercise
  onAnswered: (isCorrect: boolean, userAnswer: string) => void
  onNext: () => void
  isLast: boolean
}

function Player(props: PlayerProps) {
  const { exercise } = props
  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <TypeBadge type={exercise.type} />
        <DifficultyBadge difficulty={exercise.difficulty} />
      </div>
      {exercise.type === 'multiple_choice' && <MultipleChoice {...props} />}
      {exercise.type === 'fill_blank' && <FillBlank {...props} />}
      {exercise.type === 'rewrite' && <Rewrite {...props} />}
      {exercise.type === 'match' && <Match {...props} />}
    </div>
  )
}

/** Rodapé comum: explicação + próximo. */
function Footer({
  answered,
  correct,
  explanation,
  onNext,
  isLast,
}: {
  answered: boolean
  correct?: boolean
  explanation: string | null
  onNext: () => void
  isLast: boolean
}) {
  const [showExp, setShowExp] = useState(false)
  return (
    <div className="space-y-3">
      {answered && correct != null && (
        <div
          className={cn(
            'rounded-xl border px-4 py-3 text-sm',
            correct ? 'border-success/30 bg-success/10 text-success' : 'border-error/30 bg-error/10 text-error'
          )}
        >
          {correct ? 'Correto! ✓' : 'Não foi dessa vez.'}
        </div>
      )}

      {(answered || showExp) && explanation && (
        <div className="flex gap-2.5 rounded-xl bg-muted px-4 py-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
          <p className="text-sm text-foreground">{explanation}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        {!answered && explanation && (
          <button
            onClick={() => setShowExp((v) => !v)}
            className="rounded-full border border-card-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Ver explicação
          </button>
        )}
        {answered && (
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent-dark"
          >
            {isLast ? 'Concluir' : 'Próximo'} <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// ---------- MÚLTIPLA ESCOLHA ----------
function mcCorrect(option: string, correct: string): boolean {
  const no = normAnswer(option)
  const nc = normAnswer(correct)
  if (no === nc) return true
  const m = option.match(/^([a-d])\)\s*(.*)$/i)
  if (m) {
    if (normAnswer(m[1]) === nc) return true
    if (normAnswer(m[2]) === nc) return true
  }
  return nc.length > 1 && no.includes(nc)
}

function MultipleChoice({ exercise, onAnswered, onNext, isLast }: PlayerProps) {
  const options = Array.isArray(exercise.options) ? (exercise.options as string[]) : []
  const [selected, setSelected] = useState<string | null>(null)
  const answered = selected !== null

  function choose(opt: string) {
    if (answered) return
    setSelected(opt)
    onAnswered(mcCorrect(opt, exercise.correct_answer), opt)
  }

  return (
    <>
      <p className="text-lg font-bold leading-relaxed">{exercise.question}</p>
      <div className="grid gap-2.5">
        {options.map((opt) => {
          const isCorrect = mcCorrect(opt, exercise.correct_answer)
          const isSel = opt === selected
          const show = answered
          return (
            <button
              key={opt}
              disabled={show}
              onClick={() => choose(opt)}
              className={cn(
                'flex items-center justify-between rounded-xl border border-card-border bg-card px-4 py-3 text-left font-medium transition-colors',
                !show && 'hover:border-accent hover:bg-soft',
                show && isCorrect && 'border-success bg-success/10 text-success',
                show && isSel && !isCorrect && 'border-error bg-error/10 text-error',
                show && !isSel && !isCorrect && 'opacity-60'
              )}
            >
              {opt}
              {show && isCorrect && <Check className="h-5 w-5" />}
              {show && isSel && !isCorrect && <X className="h-5 w-5" />}
            </button>
          )
        })}
      </div>
      <Footer
        answered={answered}
        correct={selected ? mcCorrect(selected, exercise.correct_answer) : undefined}
        explanation={exercise.explanation}
        onNext={onNext}
        isLast={isLast}
      />
    </>
  )
}

// ---------- PREENCHER LACUNA ----------
function FillBlank({ exercise, onAnswered, onNext, isLast }: PlayerProps) {
  const [value, setValue] = useState('')
  const [answered, setAnswered] = useState(false)
  const correct = normAnswer(value) === normAnswer(exercise.correct_answer)
  const parts = exercise.question.split('___')

  function submit() {
    if (answered || !value.trim()) return
    setAnswered(true)
    onAnswered(correct, value)
  }

  return (
    <>
      <p className="text-lg font-bold leading-relaxed">
        {parts[0]}
        <span className="mx-1 border-b-2 border-accent-dark px-6 text-accent-dark">
          {answered ? value : ' '}
        </span>
        {parts[1]}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="flex gap-2"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={answered}
          placeholder="sua resposta"
          className={cn(
            'h-11 flex-1 rounded-xl border bg-card px-4 outline-none transition-colors',
            answered
              ? correct
                ? 'border-success text-success'
                : 'border-error text-error'
              : 'border-input focus:border-accent'
          )}
        />
        {!answered && (
          <button
            type="submit"
            disabled={!value.trim()}
            className="rounded-xl bg-accent px-5 font-semibold text-accent-foreground hover:bg-accent-dark disabled:opacity-40"
          >
            Responder
          </button>
        )}
      </form>
      {answered && !correct && (
        <p className="text-sm text-muted-foreground">
          Resposta certa: <strong className="text-success">{exercise.correct_answer}</strong>
        </p>
      )}
      <Footer
        answered={answered}
        correct={answered ? correct : undefined}
        explanation={exercise.explanation}
        onNext={onNext}
        isLast={isLast}
      />
    </>
  )
}

// ---------- REESCREVER CORRIGINDO ----------
function Rewrite({ exercise, onAnswered, onNext, isLast }: PlayerProps) {
  const [value, setValue] = useState('')
  const [answered, setAnswered] = useState(false)
  const correct = normAnswer(value) === normAnswer(exercise.correct_answer)

  function submit() {
    if (answered || !value.trim()) return
    setAnswered(true)
    onAnswered(correct, value)
  }

  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Corrija a frase
      </p>
      <p className="text-lg font-bold leading-relaxed">{exercise.question}</p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={answered}
        placeholder="reescreva corrigindo…"
        className={cn(
          'min-h-[90px] w-full rounded-xl border bg-card p-3 outline-none transition-colors',
          answered
            ? correct
              ? 'border-success'
              : 'border-error'
            : 'border-input focus:border-accent'
        )}
      />
      {!answered && (
        <button
          onClick={submit}
          disabled={!value.trim()}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent-dark disabled:opacity-40"
        >
          Verificar
        </button>
      )}
      {answered && (
        <p className="text-sm text-muted-foreground">
          Forma correta: <strong className="text-success">{exercise.correct_answer}</strong>
        </p>
      )}
      <Footer
        answered={answered}
        correct={answered ? correct : undefined}
        explanation={exercise.explanation}
        onNext={onNext}
        isLast={isLast}
      />
    </>
  )
}

// ---------- ASSOCIAR ELEMENTOS ----------
function shuffle<T>(arr: T[]): T[] {
  const a = arr.map((v, i) => [v, i] as [T, number])
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.map(([v]) => v)
}

function Match({ exercise, onAnswered, onNext, isLast }: PlayerProps) {
  const opts = (exercise.options ?? { left: [], right: [], pairs: [] }) as MatchOptions
  const left = opts.left ?? []
  const right = opts.right ?? []
  const pairs = opts.pairs ?? []

  // ordem embaralhada da coluna direita (mantém índice original)
  const rightOrder = useMemo(() => shuffle(right.map((_, i) => i)), [exercise.id])
  const correctRight = (li: number) => pairs.find((p) => p[0] === li)?.[1]

  const [selLeft, setSelLeft] = useState<number | null>(null)
  const [matched, setMatched] = useState<Record<number, { ri: number; ok: boolean }>>({})
  const usedRight = new Set(Object.values(matched).map((m) => m.ri))
  const answered = Object.keys(matched).length === left.length && left.length > 0

  function pick(side: 'l' | 'r', idx: number) {
    if (answered) return
    if (side === 'l') {
      if (matched[idx]) return
      setSelLeft(idx)
      return
    }
    if (selLeft == null || usedRight.has(idx)) return
    const ok = correctRight(selLeft) === idx
    const nextMatched = { ...matched, [selLeft]: { ri: idx, ok } }
    setSelLeft(null)
    setMatched(nextMatched)
    if (Object.keys(nextMatched).length === left.length) {
      const allOk = Object.values(nextMatched).every((m) => m.ok)
      onAnswered(allOk, JSON.stringify(nextMatched))
    }
  }

  return (
    <>
      <p className="text-lg font-bold leading-relaxed">{exercise.question}</p>
      <p className="text-sm text-muted-foreground">
        Toque numa frase à esquerda e na opção correspondente à direita.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* esquerda */}
        <div className="space-y-2">
          {left.map((l, li) => {
            const m = matched[li]
            return (
              <button
                key={li}
                onClick={() => pick('l', li)}
                disabled={!!m || answered}
                className={cn(
                  'w-full rounded-xl border px-3 py-2.5 text-left text-sm transition-colors',
                  m
                    ? m.ok
                      ? 'border-success bg-success/10 text-success'
                      : 'border-error bg-error/10 text-error'
                    : selLeft === li
                      ? 'border-accent bg-soft'
                      : 'border-card-border bg-card hover:border-accent'
                )}
              >
                {l}
              </button>
            )
          })}
        </div>
        {/* direita (embaralhada) */}
        <div className="space-y-2">
          {rightOrder.map((ri) => {
            const used = usedRight.has(ri)
            const usedOk = Object.values(matched).find((m) => m.ri === ri)?.ok
            return (
              <button
                key={ri}
                onClick={() => pick('r', ri)}
                disabled={used || answered}
                className={cn(
                  'w-full rounded-xl border px-3 py-2.5 text-left text-sm transition-colors',
                  used
                    ? usedOk
                      ? 'border-success bg-success/10 text-success'
                      : 'border-error bg-error/10 text-error'
                    : 'border-card-border bg-card hover:border-accent'
                )}
              >
                {right[ri]}
              </button>
            )
          })}
        </div>
      </div>

      {answered && (
        <div className="rounded-xl bg-muted px-4 py-3 text-sm">
          <div className="mb-1 font-semibold">Pares corretos:</div>
          <ul className="space-y-0.5 text-muted-foreground">
            {pairs.map((p, i) => (
              <li key={i}>
                {left[p[0]]} → <strong className="text-success">{right[p[1]]}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Footer
        answered={answered}
        correct={answered ? Object.values(matched).every((m) => m.ok) : undefined}
        explanation={exercise.explanation}
        onNext={onNext}
        isLast={isLast}
      />
    </>
  )
}
