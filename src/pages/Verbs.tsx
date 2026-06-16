import { useState } from 'react'
import { Repeat, Lightbulb } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { TranslationToggle } from '@/components/common/TranslationToggle'
import { IrregularSession } from '@/components/verbs/IrregularSession'
import { PhrasalSession } from '@/components/verbs/PhrasalSession'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useVerbs } from '@/hooks/useVerbs'
import { verbMethodTips } from '@/data/verbRules'
import type { IrregularMode, PhrasalMode } from '@/types/verbs'

const SESSION_SIZE = 8

type Active =
  | { kind: 'irregular'; mode: IrregularMode }
  | { kind: 'phrasal'; base: string | 'all'; mode: PhrasalMode }
  | null

export default function Verbs() {
  const v = useVerbs()
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
      <PageHeader
        icon={Repeat}
        title="Verbos"
        subtitle="Irregulares e phrasal verbs, com repetição espaçada"
        actions={<TranslationToggle />}
      />

      {v.mostMissedForm && (
        <Card className="mb-6 flex items-center gap-3 border-warning/30 bg-warning/10 p-4">
          <Lightbulb className="h-5 w-5 text-warning" />
          <p className="text-sm">
            Você tem errado mais o <strong>{v.mostMissedForm === 'past' ? 'passado simples' : 'particípio'}</strong>.
            As próximas revisões vão priorizar isso.
          </p>
        </Card>
      )}

      <Tabs defaultValue="irregular">
        <TabsList>
          <TabsTrigger value="irregular">
            Irregulares
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
              <span className="text-sm font-medium text-muted-foreground">Modo:</span>
              <Tabs value={irregularMode} onValueChange={(x) => setIrregularMode(x as IrregularMode)}>
                <TabsList>
                  <TabsTrigger value="flashcard">Flashcards</TabsTrigger>
                  <TabsTrigger value="fillgap">Preencher</TabsTrigger>
                  <TabsTrigger value="timed">Cronometrado</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Button variant="gradient" onClick={() => setActive({ kind: 'irregular', mode: irregularMode })}>
              Estudar todos ({SESSION_SIZE})
            </Button>
          </ModeBar>

          {/* Dicas do método */}
          <Card className="mb-6 border-primary/20 bg-soft p-5">
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span className="font-semibold">Dicas do método</span>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {verbMethodTips.map((tip) => (
                <li key={tip.id} className="text-sm">
                  <span className="font-semibold text-foreground">{tip.title}. </span>
                  <span className="text-muted-foreground">{tip.body}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Referência: os 50 verbos */}
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Todos os verbos ({v.irregulars.length})
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {v.irregulars.map((verb) => (
              <Card key={verb.id} className="p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold">{verb.present}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {verb.past} · {verb.pastParticiple}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{verb.translation}</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Phrasal ── */}
        <TabsContent value="phrasal">
          <ModeBar>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Modo:</span>
              <Tabs value={phrasalMode} onValueChange={(x) => setPhrasalMode(x as PhrasalMode)}>
                <TabsList>
                  <TabsTrigger value="match">Significado</TabsTrigger>
                  <TabsTrigger value="complete">Completar frase</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Button variant="gradient" onClick={() => setActive({ kind: 'phrasal', base: 'all', mode: phrasalMode })}>
              Estudar todos ({SESSION_SIZE})
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
                    Estudar grupo
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
