import { useMemo, useState } from 'react'
import {
  PenLine,
  Volume2,
  Check,
  Sparkles,
  ListChecks,
  Search,
  CalendarDays,
  CheckCircle2,
} from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { TranslationToggle } from '@/components/common/TranslationToggle'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useDailyWriting } from '@/hooks/useDailyWriting'
import { useCommonWords } from '@/hooks/useCommonWords'
import { useShowTranslation } from '@/hooks/useShowTranslation'
import { speak } from '@/lib/tts'
import { cn } from '@/lib/utils'

export default function Writing() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        icon={PenLine}
        title="Escrita diária"
        subtitle="30 frases por dia + as 1000 palavras mais faladas do inglês"
        actions={<TranslationToggle />}
      />

      <Tabs defaultValue="sentences">
        <TabsList className="mb-6">
          <TabsTrigger value="sentences">Frases do dia</TabsTrigger>
          <TabsTrigger value="words">1000 palavras</TabsTrigger>
        </TabsList>

        <TabsContent value="sentences">
          <DailySentencesTab />
        </TabsContent>
        <TabsContent value="words">
          <CommonWordsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

/* ───────────────────────── Frases do dia ───────────────────────── */

function DailySentencesTab() {
  const { date, sentences, writtenCount, goal, completed, setSentence, complete } =
    useDailyWriting()
  const { show: showTranslation } = useShowTranslation()
  const pct = Math.round((writtenCount / goal) * 100)
  const allDone = writtenCount >= goal

  const prettyDate = useMemo(
    () =>
      new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
      }),
    [date]
  )

  return (
    <div className="space-y-6">
      {/* Resumo do dia */}
      <Card className="border-primary/20 bg-soft p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span className="capitalize">{prettyDate}</span>
            </div>
            <div className="text-2xl font-extrabold">
              {writtenCount}
              <span className="text-muted-foreground">/{goal} frases</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {completed ? (
              <Badge className="gap-1 bg-success text-success-foreground">
                <CheckCircle2 className="h-4 w-4" /> Concluído hoje
              </Badge>
            ) : (
              <Button
                variant="gradient"
                disabled={!allDone}
                onClick={complete}
              >
                <Check className="h-4 w-4" />
                {allDone ? 'Concluir o dia' : `Faltam ${goal - writtenCount}`}
              </Button>
            )}
          </div>
        </div>
        <Progress value={pct} className="mt-4" />
        <p className="mt-2 text-sm text-muted-foreground">
          Escreva uma frase em inglês usando cada palavra-alvo. As palavras vêm
          das 1000 mais faladas e mudam a cada dia.
        </p>
      </Card>

      {/* Lista de frases */}
      <div className="space-y-3">
        {sentences.map((s, i) => {
          const filled = s.text.trim().length > 0
          return (
            <Card
              key={s.wordId}
              className={cn(
                'p-4 transition-colors',
                filled && 'border-success/40 bg-success/5'
              )}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <span className="font-semibold">{s.word}</span>
                <button
                  onClick={() => speak(s.word)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`Ouvir ${s.word}`}
                >
                  <Volume2 className="h-4 w-4" />
                </button>
                {showTranslation && (
                  <span className="text-sm text-muted-foreground">
                    — {s.translation}
                  </span>
                )}
                {filled && (
                  <Check className="ml-auto h-4 w-4 text-success" />
                )}
              </div>
              <Textarea
                value={s.text}
                onChange={(e) => setSentence(s.wordId, e.target.value)}
                placeholder={`Escreva uma frase com "${s.word}"...`}
                rows={2}
              />
            </Card>
          )
        })}
      </div>
    </div>
  )
}

/* ──────────────────────── 1000 palavras ───────────────────────── */

function CommonWordsTab() {
  const {
    total,
    bands,
    filtered,
    query,
    setQuery,
    knownCount,
    isKnown,
    toggleKnown,
  } = useCommonWords()
  const { show: showTranslation } = useShowTranslation()
  const [activeBand, setActiveBand] = useState(0)
  const pct = Math.round((knownCount / total) * 100)
  const searching = query.trim().length > 0

  const list = searching ? filtered : bands[activeBand]?.words ?? []

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <div>
              <div className="font-mono text-xl font-bold">
                {knownCount}
                <span className="text-muted-foreground">/{total}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                palavras que você já domina
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            <ListChecks className="h-3.5 w-3.5" /> {pct}%
          </Badge>
        </div>
        <Progress value={pct} className="mt-4" />
      </Card>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar palavra ou tradução..."
          className="pl-9"
        />
      </div>

      {/* Seletor de bandas (escondido na busca) */}
      {!searching && (
        <div className="flex flex-wrap gap-2">
          {bands.map((band, i) => (
            <button
              key={band.key}
              onClick={() => setActiveBand(i)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                i === activeBand
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground'
              )}
            >
              {band.label}
              <span className="ml-1 opacity-70">
                {band.known}/{band.words.length}
              </span>
            </button>
          ))}
        </div>
      )}

      {searching && (
        <p className="text-sm text-muted-foreground">
          {list.length} resultado(s) para “{query.trim()}”
        </p>
      )}

      {/* Lista de palavras */}
      <div className="grid gap-2 sm:grid-cols-2">
        {list.map((w) => {
          const known = isKnown(w.id)
          return (
            <Card
              key={w.id}
              className={cn(
                'flex items-center gap-3 p-3 transition-colors',
                known && 'border-success/40 bg-success/5'
              )}
            >
              <span className="w-10 shrink-0 font-mono text-xs text-muted-foreground">
                #{w.rank}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-semibold">{w.word}</span>
                  <button
                    onClick={() => speak(w.word)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={`Ouvir ${w.word}`}
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                {showTranslation && (
                  <div className="truncate text-sm text-muted-foreground">
                    {w.translation}
                  </div>
                )}
              </div>
              <button
                onClick={() => toggleKnown(w.id)}
                aria-label={known ? 'Marcar como não sei' : 'Marcar como sei'}
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors',
                  known
                    ? 'border-success bg-success text-success-foreground'
                    : 'border-border text-muted-foreground hover:text-foreground'
                )}
              >
                <Check className="h-4 w-4" />
              </button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
