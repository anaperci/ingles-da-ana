import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Layers, ListChecks, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { THEMED_DECKS } from '@/data/themedDecks'
import { TranslationToggle } from '@/components/common/TranslationToggle'
import { StudySession } from '@/components/vocabulary/StudySession'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useVocabulary } from '@/hooks/useVocabulary'
import type { VocabStudyMode } from '@/types/vocabulary'
import type { CategoryKey } from '@/types'

const SESSION_SIZE = 10

export default function Vocabulary() {
  const { byCategory, stats, queueForCategory } = useVocabulary()
  const [mode, setMode] = useState<VocabStudyMode>('flashcard')
  const [active, setActive] = useState<{
    category: CategoryKey | 'all'
  } | null>(null)

  // fila real do dia: novas + vencidas, limitada ao tamanho da sessão
  const dueToday = Math.min(stats.newCount + stats.due, SESSION_SIZE)

  if (active) {
    const limit = active.category === 'all' ? Math.max(dueToday, 1) : SESSION_SIZE
    const queue = queueForCategory(active.category, limit)
    return (
      <div className="animate-fade-in">
        <StudySession
          queue={queue}
          mode={mode}
          category={active.category}
          onExit={() => setActive(null)}
        />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        icon={Brain}
        title="Vocabulary"
        subtitle="Useful words by section, with spaced repetition"
        actions={<TranslationToggle />}
      />

      {/* Resumo */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <SummaryStat icon={Layers} value={stats.total} label="Total" />
        <SummaryStat icon={Sparkles} value={stats.mastered} label="Mastered" tone="text-success" />
        <SummaryStat icon={ListChecks} value={stats.due} label="To review" tone="text-warning" />
        <SummaryStat icon={Brain} value={stats.newCount} label="New" tone="text-primary" />
      </div>

      {/* Decks temáticos (alinhados ao planner) */}
      <div className="mb-6">
        <h2 className="mb-3 text-lg font-bold">Themed decks</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {THEMED_DECKS.map((d) => (
            <Link
              key={d.key}
              to={`/deck/${d.key}`}
              className="flex items-center gap-3 rounded-2xl border border-card-border bg-card p-4 shadow-soft transition-shadow hover:shadow-md"
            >
              <span className="text-2xl">{d.emoji}</span>
              <div className="min-w-0">
                <div className="truncate font-semibold text-foreground">{d.label}</div>
                <div className="text-xs text-muted-foreground">{d.words.length} words</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modo + estudo geral */}
      <Card className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Mode:</span>
          <Tabs value={mode} onValueChange={(v) => setMode(v as VocabStudyMode)}>
            <TabsList>
              <TabsTrigger value="flashcard">Flashcards</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Button
          variant="gradient"
          disabled={dueToday === 0}
          onClick={() => setActive({ category: 'all' })}
        >
          {dueToday > 0 ? `Study all (${dueToday})` : 'All caught up ✅'}
        </Button>
      </Card>

      {/* Seções */}
      <h2 className="mb-3 text-lg font-bold">Sections</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {byCategory.map(({ category, total, mastered }) => {
          const pct = total > 0 ? Math.round((mastered / total) * 100) : 0
          return (
            <Card key={category.key} className="flex flex-col p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">{category.emoji}</span>
                <h3 className="font-semibold">{category.label}</h3>
                <Badge variant="secondary" className="ml-auto">
                  {mastered}/{total}
                </Badge>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">{category.description}</p>
              <Progress value={pct} className="mb-4" />
              <Button
                variant="outline"
                className="mt-auto"
                onClick={() => setActive({ category: category.key })}
              >
                Study {category.label}
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function SummaryStat({
  icon: Icon,
  value,
  label,
  tone = 'text-foreground',
}: {
  icon: typeof Brain
  value: number
  label: string
  tone?: string
}) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <Icon className={`h-6 w-6 ${tone}`} />
      <div>
        <div className="font-mono text-xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </Card>
  )
}
