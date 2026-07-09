import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AudioLines, ChevronLeft, Sparkles, ArrowRight, Volume2 } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { TranslationToggle } from '@/components/common/TranslationToggle'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { VerbCard } from '@/components/soundverbs/VerbCard'
import { VerbReader } from '@/components/soundverbs/VerbReader'
import { VerbSpeaker } from '@/components/soundverbs/VerbSpeaker'
import { VerbWriter } from '@/components/soundverbs/VerbWriter'
import { speak } from '@/lib/tts'
import {
  soundVerbs,
  verbPronunciationRules,
  verbMethodTips,
  type SoundVerb,
} from '@/data/soundVerbs'

export default function SoundVerbs() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = soundVerbs.find((v) => v.id === activeId) ?? null

  if (active) {
    return <VerbDetail verb={active} onBack={() => setActiveId(null)} />
  }

  return (
    <div className="animate-fade-in">
      <Link
        to="/verbos"
        className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-accent-dark"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar para Verbs
      </Link>
      <PageHeader
        icon={AudioLines}
        title="Verbs by sound"
        subtitle="Irregulars grouped by pronunciation pattern — read, speak and write"
        actions={<TranslationToggle />}
      />

      {/* Dicas do método */}
      <Card className="mb-6 border-primary/20 bg-soft p-5">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-semibold">Method tips</span>
        </div>
        <ul className="space-y-2">
          {verbMethodTips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-primary">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </Card>

      {/* Grupos de som */}
      <div className="space-y-8">
        {verbPronunciationRules.map((rule) => {
          const verbs = soundVerbs.filter((v) => v.soundGroup === rule.id)
          if (verbs.length === 0) return null
          return (
            <section key={rule.id}>
              {/* Cabeçalho da regra */}
              <Card className="mb-4 p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground">{rule.label}</Badge>
                  <span className="text-sm text-muted-foreground">{verbs.length} verbs</span>
                </div>
                <p className="text-sm">{rule.rule}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {rule.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </Card>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {verbs.map((verb) => (
                  <VerbCard key={verb.id} verb={verb} onOpen={() => setActiveId(verb.id)} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

function VerbDetail({ verb, onBack }: { verb: SoundVerb; onBack: () => void }) {
  const rule = verbPronunciationRules.find((r) => r.id === verb.soundGroup)
  return (
    <div className="animate-fade-in space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2 pl-0">
        <ChevronLeft className="h-5 w-5" /> Back
      </Button>

      {/* Cabeçalho do verbo */}
      <Card className="space-y-3 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 font-mono text-2xl font-extrabold">
            <span>{verb.base}</span>
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
            <span className="text-primary">{verb.past}</span>
            <button
              onClick={() => speak(`${verb.base}, ${verb.past}`)}
              className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
              aria-label="Play the pair"
            >
              <Volume2 className="h-5 w-5" />
            </button>
          </div>
          <Badge variant="secondary">{verb.level}</Badge>
        </div>
        <p className="text-lg font-semibold">{verb.translation}</p>
        {rule && (
          <div className="rounded-lg bg-primary/10 px-4 py-3 text-sm">
            <strong className="text-primary">{rule.label}:</strong> {rule.rule}
          </div>
        )}
      </Card>

      {/* Modos */}
      <Tabs defaultValue="read">
        <TabsList className="mb-6">
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="speak">Speak</TabsTrigger>
          <TabsTrigger value="write">Write</TabsTrigger>
        </TabsList>
        <TabsContent value="read">
          <VerbReader verb={verb} />
        </TabsContent>
        <TabsContent value="speak">
          <VerbSpeaker verb={verb} />
        </TabsContent>
        <TabsContent value="write">
          <VerbWriter verb={verb} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
