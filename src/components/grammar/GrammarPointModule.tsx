import { useMemo, useState } from 'react'
import { Lightbulb, PenLine, BookOpen, Mic } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { LevelBadge } from './LevelBadge'
import {
  ModePill,
  ModeBar,
  PracticeToggle,
  ProgressBar,
  ExampleList,
  WriteArea,
} from '@/components/common/StudyBits'
import { useStudyMarks } from '@/hooks/useStudyMarks'
import { useLocalStore } from '@/hooks/useLocalStore'
import { STORAGE_KEYS } from '@/lib/keys'
import type { GrammarPoint } from '@/data/grammarPacks'

type Mode = 'read' | 'speak' | 'write'
type WritingMap = Record<string, string>

interface Props {
  points: GrammarPoint[]
}

/** Cards de gramática (Conditionals / Verb tenses) com LER / FALAR / ESCREVER. */
export function GrammarPointModule({ points }: Props) {
  const { isDone, toggle, countDone } = useStudyMarks(STORAGE_KEYS.grammarPacksProgress)
  const [writing, setWriting] = useLocalStore<WritingMap>(STORAGE_KEYS.grammarPacksWriting, {})

  const ids = useMemo(() => points.map((p) => p.id), [points])
  const done = countDone(ids)

  return (
    <div className="animate-fade-in">
      <ProgressBar done={done} total={points.length} label="praticados" />

      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        {points.map((p) => (
          <PointCard
            key={p.id}
            point={p}
            done={isDone(p.id)}
            onToggle={() =>
              toggle(p.id, { module: 'grammar', title: p.name })
            }
            draft={writing[p.id] ?? ''}
            onDraft={(text) => setWriting((prev) => ({ ...prev, [p.id]: text }))}
          />
        ))}
      </div>
    </div>
  )
}

function PointCard({
  point,
  done,
  onToggle,
  draft,
  onDraft,
}: {
  point: GrammarPoint
  done: boolean
  onToggle: () => void
  draft: string
  onDraft: (text: string) => void
}) {
  const [mode, setMode] = useState<Mode>('read')

  return (
    <Card className={cn('overflow-hidden p-0', done && 'ring-1 ring-accent')}>
      {/* Cabeçalho */}
      <div className="flex items-start gap-3 p-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg font-extrabold text-primary">{point.name}</span>
            <LevelBadge level={point.level} />
          </div>
          <p className="mt-2 font-mono text-[13px] text-accent-dark">{point.structure}</p>
          <p className="mt-1.5 text-sm text-muted-foreground">{point.use}</p>
        </div>
        <PracticeToggle done={done} onClick={onToggle} />
      </div>

      {/* Dica pt em destaque */}
      {point.ptTip && (
        <div className="mx-4 mb-4 flex gap-2.5 rounded-xl bg-soft px-3.5 py-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
          <p className="text-sm leading-relaxed text-soft-text">{point.ptTip}</p>
        </div>
      )}

      {/* Barra de modos */}
      <div className="border-t border-card-border px-4 pb-5 pt-4">
        <ModeBar>
          <ModePill icon={BookOpen} active={mode === 'read'} onClick={() => setMode('read')}>
            Ler
          </ModePill>
          <ModePill icon={Mic} active={mode === 'speak'} onClick={() => setMode('speak')}>
            Falar
          </ModePill>
          <ModePill icon={PenLine} active={mode === 'write'} onClick={() => setMode('write')}>
            Escrever
          </ModePill>
        </ModeBar>

        {mode === 'read' && <ExampleList examples={point.examples} />}
        {mode === 'speak' && <ExampleList examples={point.examples} speakable />}
        {mode === 'write' && (
          <WriteArea prompt={point.writingPrompt} value={draft} onChange={onDraft} />
        )}
      </div>
    </Card>
  )
}

