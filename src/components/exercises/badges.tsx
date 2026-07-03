import { Check, X, Circle } from 'lucide-react'
import {
  TYPE_LABEL,
  DIFFICULTY_LABEL,
  TYPE_COLOR,
  DIFFICULTY_COLOR,
  type ExerciseType,
  type Difficulty,
} from '@/lib/exercises'

export function TypeBadge({ type }: { type: ExerciseType }) {
  const c = TYPE_COLOR[type]
  return (
    <span
      style={{ color: c.text, backgroundColor: c.bg }}
      className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
    >
      {TYPE_LABEL[type]}
    </span>
  )
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty | null }) {
  if (!difficulty) return null
  const c = DIFFICULTY_COLOR[difficulty]
  return (
    <span
      style={{ color: c.text, backgroundColor: c.bg }}
      className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
    >
      {DIFFICULTY_LABEL[difficulty]}
    </span>
  )
}

/** Indicador de tentativa anterior: ✓ acertou / ✗ errou / novo. */
export function AttemptDot({ last }: { last?: boolean | null }) {
  if (last == null)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
        <Circle className="h-3 w-3" /> novo
      </span>
    )
  return last ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
      <Check className="h-3.5 w-3.5" /> acertou
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-error">
      <X className="h-3.5 w-3.5" /> errou
    </span>
  )
}
