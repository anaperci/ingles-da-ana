import { useState } from 'react'
import { Blocks, ChevronLeft, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { TranslationToggle } from '@/components/common/TranslationToggle'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FrameCard } from '@/components/frames/FrameCard'
import { FrameReader } from '@/components/frames/FrameReader'
import { FrameSpeaker } from '@/components/frames/FrameSpeaker'
import { FrameWriter } from '@/components/frames/FrameWriter'
import { sentenceFrames, methodTips, type SentenceFrame } from '@/data/sentenceFrames'
import { sentenceFramesPt2 } from '@/data/sentenceFramesPt2'

/** Lote 1 (8) + Lote 2 (13) = 21 estruturas. */
const ALL_FRAMES: SentenceFrame[] = [...sentenceFrames, ...sentenceFramesPt2]

const LEVEL_LABEL: Record<SentenceFrame['level'], string> = {
  beginner: 'beginner',
  intermediate: 'intermediate',
}

export default function SentenceFrames() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = ALL_FRAMES.find((f) => f.id === activeId) ?? null

  if (active) {
    return <FrameDetail frame={active} onBack={() => setActiveId(null)} />
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        icon={Blocks}
        title="Sentence frames"
        subtitle="Template structures to speak without freezing — read, speak and write"
        actions={<TranslationToggle />}
      />

      {/* Dicas do método */}
      <Card className="mb-6 border-primary/20 bg-soft p-5">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-semibold">Method tips</span>
        </div>
        <ul className="space-y-2">
          {methodTips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-primary">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </Card>

      {/* Estruturas */}
      <h2 className="mb-3 text-lg font-bold">Frames</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ALL_FRAMES.map((frame) => (
          <FrameCard key={frame.id} frame={frame} onOpen={() => setActiveId(frame.id)} />
        ))}
      </div>
    </div>
  )
}

function FrameDetail({ frame, onBack }: { frame: SentenceFrame; onBack: () => void }) {
  return (
    <div className="animate-fade-in space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2 pl-0">
        <ChevronLeft className="h-5 w-5" /> Back
      </Button>

      {/* Cabeçalho da estrutura */}
      <Card className="space-y-3 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-2xl font-extrabold text-primary">{frame.frame}</span>
          <Badge variant="secondary">{LEVEL_LABEL[frame.level]}</Badge>
        </div>
        <p className="text-lg font-semibold">{frame.meaning}</p>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">How to fill in:</strong> {frame.pattern}
          </p>
          <p>
            <strong className="text-foreground">When to use:</strong> {frame.explanation}
          </p>
        </div>
      </Card>

      {/* Modos */}
      <Tabs defaultValue="read">
        <TabsList className="mb-6">
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="speak">Speak</TabsTrigger>
          <TabsTrigger value="write">Write</TabsTrigger>
        </TabsList>
        <TabsContent value="read">
          <FrameReader frame={frame} />
        </TabsContent>
        <TabsContent value="speak">
          <FrameSpeaker frame={frame} />
        </TabsContent>
        <TabsContent value="write">
          <FrameWriter frame={frame} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
