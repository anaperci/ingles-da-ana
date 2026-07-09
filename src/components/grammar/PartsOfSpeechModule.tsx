import { useMemo, useState } from 'react'
import { Lightbulb, BookOpen, Mic, PenLine } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { speak } from '@/lib/tts'
import {
  ModeBar,
  ModePill,
  PracticeToggle,
  ProgressBar,
  ExampleList,
  WriteArea,
} from '@/components/common/StudyBits'
import { useStudyMarks } from '@/hooks/useStudyMarks'
import { useLocalStore } from '@/hooks/useLocalStore'
import { STORAGE_KEYS } from '@/lib/keys'
import { partsOfSpeech, type PartOfSpeech } from '@/data/partsOfSpeech'

type Mode = 'read' | 'speak' | 'write'
type WritingMap = Record<string, string>

/** Classes gramaticais: cada tipo de palavra num card com Ler / Falar / Escrever. */
export function PartsOfSpeechModule() {
  const { isDone, toggle, countDone } = useStudyMarks(STORAGE_KEYS.grammarPacksProgress)
  const [writing, setWriting] = useLocalStore<WritingMap>(STORAGE_KEYS.grammarPacksWriting, {})

  const ids = useMemo(() => partsOfSpeech.map((p) => p.id), [])
  const done = countDone(ids)

  return (
    <div className="animate-fade-in">
      <ProgressBar done={done} total={partsOfSpeech.length} label="praticados" />

      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        {partsOfSpeech.map((pos) => (
          <PosCard
            key={pos.id}
            pos={pos}
            done={isDone(pos.id)}
            onToggle={() => toggle(pos.id, { module: 'grammar', title: pos.name })}
            draft={writing[pos.id] ?? ''}
            onDraft={(text) => setWriting((prev) => ({ ...prev, [pos.id]: text }))}
          />
        ))}
      </div>
    </div>
  )
}

function PosCard({
  pos,
  done,
  onToggle,
  draft,
  onDraft,
}: {
  pos: PartOfSpeech
  done: boolean
  onToggle: () => void
  draft: string
  onDraft: (text: string) => void
}) {
  const [mode, setMode] = useState<Mode>('read')

  return (
    <Card className={cn('overflow-hidden p-0', done && 'ring-1 ring-accent')}>
      <div className="flex items-start gap-3 p-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-display text-lg font-extrabold text-primary">{pos.name}</span>
            <span className="text-sm font-medium text-muted-foreground">{pos.namePt}</span>
          </div>
          <p className="mt-1.5 text-sm text-foreground">{pos.function}</p>

          {/* Palavras de exemplo como chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pos.examples.map((w) => (
              <button
                key={w}
                onClick={() => speak(w)}
                title={`Ouvir "${w}"`}
                className="rounded-full bg-soft px-2.5 py-1 font-mono text-xs font-medium text-soft-text transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {w}
              </button>
            ))}
          </div>
        </div>
        <PracticeToggle done={done} onClick={onToggle} />
      </div>

      {/* Dica pt em destaque */}
      {pos.ptTip && (
        <div className="mx-4 mb-4 flex gap-2.5 rounded-xl bg-soft px-3.5 py-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
          <p className="text-sm leading-relaxed text-soft-text">{pos.ptTip}</p>
        </div>
      )}

      {/* Modos */}
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

        {mode === 'read' && <ExampleList examples={pos.sentences} />}
        {mode === 'speak' && <ExampleList examples={pos.sentences} speakable />}
        {mode === 'write' && <WriteArea prompt={pos.writingPrompt} value={draft} onChange={onDraft} />}
      </div>
    </Card>
  )
}
