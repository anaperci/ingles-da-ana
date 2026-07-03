import { useState } from 'react'
import { Repeat2, Lightbulb, Sparkles } from 'lucide-react'
import { TranslationToggle } from '@/components/common/TranslationToggle'
import { IrregularSession } from '@/components/verbs/IrregularSession'
import { PhrasalSession } from '@/components/verbs/PhrasalSession'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useVerbs } from '@/hooks/useVerbs'
import { useShowTranslation } from '@/hooks/useShowTranslation'
import { verbMethodTips } from '@/data/verbRules'
import type { IrregularMode, PhrasalMode } from '@/types/verbs'

const SESSION_SIZE = 8

type Active =
  | { kind: 'irregular'; mode: IrregularMode }
  | { kind: 'phrasal'; base: string | 'all'; mode: PhrasalMode }
  | null

export default function Verbs() {
  const v = useVerbs()
  const { show: showTranslation } = useShowTranslation()
  const [irregularMode, setIrregularMode] = useState<IrregularMode>('flashcard')
  const [phrasalMode, setPhrasalMode] = useState<PhrasalMode>('match')
  const [active, setActive] = useState<Active>(null)

  if (active?.kind === 'irregular') {
    return (
      <div className="animate-fade-in">
        <IrregularSession
          queue={v.irregularQueue(SESSION_SIZE)}
          mode={active.mode}
          onExit={() => setActive(null)}
        />
      </div>
    )
  }
  if (active?.kind === 'phrasal') {
    return (
      <div className="animate-fade-in">
        <PhrasalSession
          queue={v.phrasalQueue(active.base, SESSION_SIZE)}
          mode={active.mode}
          onExit={() => setActive(null)}
        />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-primary shadow-soft">
            <Repeat2 className="h-7 w-7 text-accent-light" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Verbs</h1>
            <p className="text-muted-foreground">
              Os 50 verbos irregulares mais usados — aprenda o par, fixe o padrão
            </p>
          </div>
        </div>
        <TranslationToggle />
      </div>

      {v.mostMissedForm && (
        <Card className="mb-6 flex items-center gap-3 border-warning/30 bg-warning/10 p-4">
          <Lightbulb className="h-5 w-5 text-warning" />
          <p className="text-sm">
            You've been missing the <strong>{v.mostMissedForm === 'past' ? 'simple past' : 'past participle'}</strong> more often.
            The next reviews will focus on that.
          </p>
        </Card>
      )}

      <Tabs defaultValue="irregular">
        <TabsList>
          <TabsTrigger value="irregular">
            Irregulars
            <Badge variant="secondary" className="ml-1">{v.irregularStats.mastered}/{v.irregularStats.total}</Badge>
          </TabsTrigger>
          <TabsTrigger value="phrasal">
            Phrasal verbs
            <Badge variant="secondary" className="ml-1">{v.phrasalStats.mastered}/{v.phrasalStats.total}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* ── Irregulares ── */}
        <TabsContent value="irregular">
          <ModeBar>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Mode:</span>
              <Tabs value={irregularMode} onValueChange={(x) => setIrregularMode(x as IrregularMode)}>
                <TabsList>
                  <TabsTrigger value="flashcard">Flashcards</TabsTrigger>
                  <TabsTrigger value="fillgap">Fill in</TabsTrigger>
                  <TabsTrigger value="timed">Timed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Button variant="gradient" onClick={() => setActive({ kind: 'irregular', mode: irregularMode })}>
              Study all ({SESSION_SIZE})
            </Button>
          </ModeBar>

          {/* Dicas do método */}
          <Card
            className="mb-8 rounded-2xl border-transparent p-6 text-on-primary shadow-elevated"
            style={{ background: 'linear-gradient(135deg,#0a192f,#102341 60%,#1b3358)' }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent-light" />
              <span className="text-lg font-bold text-on-primary">Como estudar verbos</span>
            </div>
            <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {verbMethodTips.map((tip) => (
                <div key={tip.id} className="text-sm leading-relaxed">
                  <p className="font-bold text-accent-light">{tip.title}.</p>
                  <p className="text-on-primary-muted">{tip.body}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Referência: os 50 verbos */}
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold">Todos os verbos ({v.irregulars.length})</h3>
            <span className="font-mono text-xs text-muted-foreground">
              infinitivo · passado · particípio
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {v.irregulars.map((verb) => (
              <Card
                key={verb.id}
                className="p-4 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-elevated"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold">{verb.present}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {verb.past} · {verb.pastParticiple}
                  </span>
                </div>
                {showTranslation && (
                  <p className="text-sm text-muted-foreground">{verb.translation}</p>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Phrasal ── */}
        <TabsContent value="phrasal">
          <ModeBar>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Mode:</span>
              <Tabs value={phrasalMode} onValueChange={(x) => setPhrasalMode(x as PhrasalMode)}>
                <TabsList>
                  <TabsTrigger value="match">Meaning</TabsTrigger>
                  <TabsTrigger value="complete">Complete the sentence</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Button variant="gradient" onClick={() => setActive({ kind: 'phrasal', base: 'all', mode: phrasalMode })}>
              Study all ({SESSION_SIZE})
            </Button>
          </ModeBar>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {v.phrasalByBase.map((g) => {
              const pct = g.verbs.length ? Math.round((g.mastered / g.verbs.length) * 100) : 0
              return (
                <Card key={g.base} className="flex flex-col p-5">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-semibold capitalize">{g.base} …</h3>
                    <Badge variant="secondary">{g.mastered}/{g.verbs.length}</Badge>
                  </div>
                  <p className="mb-3 font-mono text-xs text-muted-foreground">
                    {g.verbs.map((x) => x.phrasal).join(', ')}
                  </p>
                  <Progress value={pct} className="mb-4" />
                  <Button variant="outline" className="mt-auto" onClick={() => setActive({ kind: 'phrasal', base: g.base, mode: phrasalMode })}>
                    Study group
                  </Button>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ModeBar({ children }: { children: React.ReactNode }) {
  return (
    <Card className="my-6 flex flex-wrap items-center justify-between gap-4 p-4">
      {children}
    </Card>
  )
}
