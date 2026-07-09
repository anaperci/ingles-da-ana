import { useMemo } from 'react'
import { Volume2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { speak } from '@/lib/tts'
import { PronounceButton } from '@/components/common/PronounceButton'
import { PracticeToggle, ProgressBar } from '@/components/common/StudyBits'
import { useStudyMarks } from '@/hooks/useStudyMarks'
import { STORAGE_KEYS } from '@/lib/keys'
import type { RegisterLevel, RegisterSet } from '@/data/grammarPacks'

// Escalada de formalidade: casual (verde) → neutro (navy) → formal (âmbar).
const REGISTER: Record<RegisterLevel['register'], { text: string; bg: string }> = {
  Casual: { text: '#00714A', bg: '#00986414' },
  Neutral: { text: '#0a192f', bg: '#0a192f12' },
  Formal: { text: '#9a5b12', bg: '#f5a5241f' },
}

interface Props {
  situations: RegisterSet[]
}

/** Cards de appropriacy: cada situação em três níveis de registro. */
export function AppropriacyModule({ situations }: Props) {
  const { isDone, toggle, countDone } = useStudyMarks(STORAGE_KEYS.grammarPacksProgress)
  const ids = useMemo(() => situations.map((s) => s.id), [situations])
  const done = countDone(ids)

  return (
    <div className="animate-fade-in">
      <ProgressBar done={done} total={situations.length} label="praticados" />

      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        {situations.map((set) => (
          <SituationCard
            key={set.id}
            set={set}
            done={isDone(set.id)}
            onToggle={() => toggle(set.id, { module: 'grammar', title: set.situation })}
          />
        ))}
      </div>
    </div>
  )
}

function SituationCard({
  set,
  done,
  onToggle,
}: {
  set: RegisterSet
  done: boolean
  onToggle: () => void
}) {
  return (
    <Card className={done ? 'ring-1 ring-accent' : undefined}>
      <div className="mb-4 flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-extrabold text-primary">{set.situation}</h3>
          {set.note && <p className="mt-1 text-sm text-muted-foreground">{set.note}</p>}
        </div>
        <PracticeToggle done={done} onClick={onToggle} />
      </div>

      <div className="space-y-2.5">
        {set.levels.map((lvl) => (
          <RegisterRow key={lvl.register} level={lvl} />
        ))}
      </div>
    </Card>
  )
}

function RegisterRow({ level }: { level: RegisterLevel }) {
  const c = REGISTER[level.register]
  return (
    <div className="rounded-xl bg-muted/60 px-3.5 py-3">
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
          style={{ color: c.text, backgroundColor: c.bg }}
        >
          {level.register}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{level.en}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{level.pt}</p>
          <p className="mt-1.5 text-xs text-soft-text">{level.when}</p>
          <div className="mt-2">
            <PronounceButton text={level.en} />
          </div>
        </div>
        <button
          onClick={() => speak(level.en)}
          aria-label={`Ouvir versão ${level.register}`}
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
