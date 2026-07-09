import { useState } from 'react'
import { Volume2, BookOpen, Mic, PenLine, GraduationCap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { speak } from '@/lib/tts'
import { PronounceButton } from '@/components/common/PronounceButton'
import { ModeBar, ModePill } from '@/components/common/StudyBits'
import { useLocalStore } from '@/hooks/useLocalStore'
import { STORAGE_KEYS } from '@/lib/keys'
import type { PhrasalVerb } from '@/types/verbs'

type Mode = 'read' | 'speak' | 'write'
type WritingMap = Record<string, string>

const GREEN = '#009864'

interface Group {
  base: string
  verbs: PhrasalVerb[]
  mastered: number
}

interface Props {
  groups: Group[]
  /** dispara a sessão SRS (revisão espaçada) do grupo */
  onStudyGroup: (base: string) => void
}

/** Navegação dos phrasal verbs agrupada por verbo base, com Ler / Falar / Escrever. */
export function PhrasalBrowse({ groups, onStudyGroup }: Props) {
  const [writing, setWriting] = useLocalStore<WritingMap>(STORAGE_KEYS.phrasalWriting, {})

  return (
    <div className="flex flex-col gap-8">
      {groups.map((g) => (
        <section key={g.base}>
          {/* Cabeçalho do grupo */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-xl font-extrabold capitalize text-primary">
              {g.base} <span className="text-muted-foreground">…</span>
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {g.mastered}/{g.verbs.length}
              </Badge>
              <Button variant="outline" size="sm" onClick={() => onStudyGroup(g.base)}>
                <GraduationCap className="mr-1.5 h-4 w-4" />
                Study group
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {g.verbs.map((pv) => (
              <PhrasalCard
                key={pv.id}
                pv={pv}
                draft={writing[pv.id] ?? ''}
                onDraft={(text) => setWriting((prev) => ({ ...prev, [pv.id]: text }))}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function PhrasalCard({
  pv,
  draft,
  onDraft,
}: {
  pv: PhrasalVerb
  draft: string
  onDraft: (text: string) => void
}) {
  const [mode, setMode] = useState<Mode>('read')

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-start gap-3 p-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg font-extrabold text-primary">{pv.phrasal}</span>
            <Badge variant="secondary">{pv.level}</Badge>
          </div>
          <p className="mt-1 text-sm font-medium text-accent-dark">{pv.translation}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{pv.meaning}</p>
        </div>
        <button
          onClick={() => speak(pv.phrasal)}
          aria-label={`Ouvir ${pv.phrasal}`}
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>

      {pv.note && (
        <div className="mx-4 mb-4 rounded-xl bg-soft px-3.5 py-2.5 text-sm text-soft-text">
          {pv.note}
        </div>
      )}

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

        {(mode === 'read' || mode === 'speak') && (
          <div className="mt-4 flex items-start gap-3 rounded-xl bg-muted/60 px-3.5 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">{pv.example}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{pv.exampleTranslation}</p>
              {mode === 'speak' && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <PronounceButton text={pv.phrasal} label={`falar "${pv.phrasal}"`} />
                  <PronounceButton text={pv.example} label="falar frase" />
                </div>
              )}
            </div>
            <button
              onClick={() => speak(pv.example)}
              aria-label="Ouvir exemplo"
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
        )}

        {mode === 'write' && (
          <div className="mt-4 space-y-3">
            <div
              className="flex gap-2.5 rounded-xl px-3.5 py-3"
              style={{ backgroundColor: `${GREEN}14` }}
            >
              <PenLine className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} />
              <div>
                <div
                  className="text-[11px] font-bold uppercase tracking-wide"
                  style={{ color: GREEN }}
                >
                  Sua vez
                </div>
                <p className="text-sm text-foreground">
                  Monte uma frase sua usando <strong>{pv.phrasal}</strong>.
                </p>
              </div>
            </div>
            <textarea
              value={draft}
              onChange={(e) => onDraft(e.target.value)}
              rows={2}
              placeholder={`Ex.: ${pv.example}`}
              className="w-full resize-none rounded-xl border border-card-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
            />
            {draft.trim() && (
              <button
                onClick={() => speak(draft)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5',
                  'text-xs font-medium text-muted-foreground transition-colors hover:text-foreground'
                )}
              >
                <Volume2 className="h-3.5 w-3.5" />
                Ouvir minha frase
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
