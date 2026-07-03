import { useEffect, useMemo, useState } from 'react'
import {
  PenLine,
  Volume2,
  Check,
  Sparkles,
  ListChecks,
  Search,
  CalendarDays,
  CheckCircle2,
  Loader2,
  Lightbulb,
  HelpCircle,
  X,
  Star,
  RotateCcw,
} from 'lucide-react'
import { callFunction, NotConfiguredError } from '@/lib/api'
import type { WritingFeedback, SentenceFeedback } from '@/types/writing'
import { useWritingPoints } from '@/hooks/useWritingPoints'
import { WritingPointsCard } from '@/components/writing/WritingPointsCard'
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
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-primary shadow-soft">
            <PenLine className="h-7 w-7 text-accent-light" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Daily writing</h1>
            <p className="text-muted-foreground">
              30 frases por dia + as 1000 palavras mais faladas em inglês
            </p>
          </div>
        </div>
        <TranslationToggle />
      </div>

      <Tabs defaultValue="sentences">
        {/* Pill segmented control */}
        <TabsList className="mb-6 h-auto gap-1 rounded-full bg-muted p-1">
          <TabsTrigger
            value="sentences"
            className="rounded-full px-4 py-1.5 text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-soft"
          >
            Daily sentences
          </TabsTrigger>
          <TabsTrigger
            value="words"
            className="rounded-full px-4 py-1.5 text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-soft"
          >
            1000 words
          </TabsTrigger>
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

const WRITING_SYSTEM = `Você é uma professora de inglês corrigindo as frases da Ana — brasileira, nível iniciante/intermediário, se preparando para morar em Malta. Cada frase tinha uma palavra-alvo. Avalie se a frase está correta e natural em inglês. Seja gentil, direta e útil.

Para CADA frase, traga sempre (NUNCA deixe "correction" vazio):
- "correction": a frase COMPLETA do jeito certo e natural em inglês. Se a frase dela já estava correta, repita-a (ou dê a versão mais natural). Esse campo é obrigatório em toda frase.
- "note": explique em português o que estava errado e POR QUÊ (qual a regra que foi quebrada). Se estava certa, elogie e diga por que está natural.
- "rule": o jeito certo de fazer — a regra prática em português para acertar da próxima vez, com um mini-exemplo curto em inglês. Ex.: "Dias da semana usam 'on': on Monday, on Saturday."

Responda APENAS com um JSON válido, sem markdown e sem cercas de código, exatamente neste formato:
{
  "items": [
    { "wordId": "<o id recebido>", "ok": <true se já estava correta, senão false>, "correction": "<a frase corrigida em inglês>", "note": "<o que estava errado e por quê, em português>", "rule": "<a regra prática + mini-exemplo, em português>" }
  ],
  "insights": ["<2 a 4 dicas gerais em português, a partir dos padrões de erro que você observou>"],
  "summary": "<1 a 2 frases de resumo encorajador em português>"
}`

/**
 * Varre o texto e devolve TODO objeto `{...}` balanceado, em qualquer nível,
 * ignorando chaves dentro de strings. Usado para resgatar as correções
 * mesmo quando o JSON volta truncado (resposta cortada no meio).
 */
function scanObjects(txt: string): Record<string, unknown>[] {
  const found: string[] = []
  const stack: number[] = []
  let inStr = false
  let esc = false
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i]
    if (inStr) {
      if (esc) esc = false
      else if (c === '\\') esc = true
      else if (c === '"') inStr = false
      continue
    }
    if (c === '"') inStr = true
    else if (c === '{') stack.push(i)
    else if (c === '}') {
      const s = stack.pop()
      if (s !== undefined) found.push(txt.slice(s, i + 1))
    }
  }
  const out: Record<string, unknown>[] = []
  for (const chunk of found) {
    try {
      out.push(JSON.parse(chunk) as Record<string, unknown>)
    } catch {
      /* objeto incompleto: ignora */
    }
  }
  return out
}

/**
 * Parser tolerante: aceita JSON inteiro, JSON entre cercas, ou resposta
 * truncada — neste caso resgata todas as correções completas que existirem.
 * Só lança erro se NADA aproveitável vier.
 */
function parseFeedback(reply: string): WritingFeedback {
  let txt = (reply ?? '').trim()
  const fence = txt.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fence) txt = fence[1].trim()

  // 1) tenta o JSON inteiro (caminho feliz)
  let full: Partial<WritingFeedback> | null = null
  try {
    full = JSON.parse(txt) as Partial<WritingFeedback>
  } catch {
    const start = txt.indexOf('{')
    const end = txt.lastIndexOf('}')
    if (start !== -1 && end > start) {
      try {
        full = JSON.parse(txt.slice(start, end + 1)) as Partial<WritingFeedback>
      } catch {
        /* segue para o resgate */
      }
    }
  }

  // 2) fonte dos itens: o JSON inteiro, ou os objetos resgatados (truncado)
  const raw =
    full && Array.isArray(full.items) ? full.items : (scanObjects(txt) as unknown[])

  const items: SentenceFeedback[] = (raw as Record<string, unknown>[])
    .filter(
      (o) =>
        o &&
        typeof o.wordId === 'string' &&
        typeof o.correction === 'string'
    )
    .map((o) => ({
      wordId: o.wordId as string,
      ok: Boolean(o.ok),
      correction: String(o.correction),
      note: typeof o.note === 'string' ? o.note : '',
      rule: typeof o.rule === 'string' ? o.rule : undefined,
    }))

  if (items.length === 0) throw new SyntaxError('sem itens aproveitáveis')

  const insights = Array.isArray(full?.insights)
    ? (full!.insights as unknown[]).map(String)
    : []
  const summary =
    typeof full?.summary === 'string'
      ? full!.summary
      : (txt.match(/"summary"\s*:\s*"([^"]*)"/)?.[1] ?? '')

  const okCount = items.filter((it) => it.ok).length
  const score = Math.round((okCount / items.length) * 100)
  return { items, insights, summary, score }
}

function DailySentencesTab() {
  const {
    date,
    sentences,
    writtenCount,
    reviewCount,
    goal,
    completed,
    feedback,
    setSentence,
    toggleDontKnow,
    complete,
  } = useDailyWriting()
  const { show: showTranslation } = useShowTranslation()
  const { todayPoints } = useWritingPoints()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pct = Math.round((writtenCount / goal) * 100)

  const prettyDate = useMemo(
    () =>
      new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
      }),
    [date]
  )

  const fbByWord = useMemo(() => {
    const m = new Map<string, SentenceFeedback>()
    feedback?.items.forEach((it) => m.set(it.wordId, it))
    return m
  }, [feedback])

  async function finalize() {
    setError(null)
    const written = sentences.filter((s) => s.text.trim() && !s.dontKnow)
    if (written.length === 0) {
      complete() // nada escrito: finaliza sem avaliação
      return
    }
    setLoading(true)
    try {
      const payload = written.map((s) => ({
        wordId: s.wordId,
        word: s.word,
        sentence: s.text.trim(),
      }))
      const content = JSON.stringify(payload)

      // Tenta avaliar; se o JSON vier impossível de aproveitar, refaz 1 vez.
      let feedbackResult: WritingFeedback | null = null
      let lastErr: unknown = null
      for (let attempt = 0; attempt < 2 && !feedbackResult; attempt++) {
        try {
          const data = await callFunction<{ reply: string }>('chat', {
            system: WRITING_SYSTEM,
            messages: [{ role: 'user', content }],
            json: true,
            maxTokens: 4000,
          })
          feedbackResult = parseFeedback(data.reply)
        } catch (err) {
          lastErr = err
          if (err instanceof NotConfiguredError) break // não adianta repetir
        }
      }

      if (!feedbackResult) throw lastErr ?? new SyntaxError('sem resposta')
      complete(feedbackResult)
    } catch (e) {
      if (e instanceof NotConfiguredError) {
        setError('AI evaluation needs the backend configured.')
      } else if (e instanceof SyntaxError) {
        setError('The AI replied in an unexpected format. Try finishing again.')
      } else {
        setError((e as Error).message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Pontuação acumulada */}
      <WritingPointsCard />

      {/* Resumo do dia */}
      <Card className="border-card-border bg-card p-5 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span className="capitalize">{prettyDate}</span>
            </div>
            <div className="text-2xl font-extrabold">
              {writtenCount}
              <span className="text-muted-foreground">/{goal} frases</span>
            </div>
            {reviewCount > 0 && (
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-soft px-2.5 py-1 text-xs font-semibold text-accent-dark">
                <RotateCcw className="h-3.5 w-3.5" />
                {reviewCount} {reviewCount === 1 ? 'review word' : 'review words'}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {completed ? (
              <Badge className="gap-1 bg-success text-success-foreground">
                <CheckCircle2 className="h-4 w-4" /> Done
                {feedback ? ` · ${feedback.score}%` : ' today'}
              </Badge>
            ) : (
              <Button variant="primary" disabled={loading} onClick={finalize}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Evaluating…
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 text-accent-light" /> Finish & evaluate
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        <Progress value={pct} className="mt-4" />
        <p className="mt-2 text-sm text-muted-foreground">
          Escreva o que você sabe e marque <strong>“Não sei”</strong> no resto — você
          pode finalizar a qualquer momento e a IA corrige suas frases e traz dicas. As
          palavras que você <strong>errar voltam outro dia</strong>, em uma nova
          frase, até você dominá-las.
        </p>
        {error && <p className="mt-2 text-sm text-error">{error}</p>}
      </Card>

      {/* Avaliação da IA */}
      {feedback && <FeedbackSummary feedback={feedback} earned={todayPoints} />}

      {/* Lista de frases */}
      <div className="space-y-3">
        {sentences.map((s, i) => {
          const filled = s.text.trim().length > 0
          const fb = fbByWord.get(s.wordId)
          return (
            <Card
              key={s.wordId}
              className={cn(
                'p-4 shadow-soft transition-colors',
                s.dontKnow && 'opacity-60',
                filled && !fb && 'border-success/40 bg-success/5'
              )}
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <span className="font-semibold">{s.word}</span>
                <button
                  onClick={() => speak(s.word)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent-dark"
                  aria-label={`Play ${s.word}`}
                >
                  <Volume2 className="h-4 w-4" />
                </button>
                {s.review && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-soft px-2 py-0.5 text-[11px] font-semibold text-accent-dark">
                    <RotateCcw className="h-3 w-3" /> review
                  </span>
                )}
                {showTranslation && (
                  <span className="text-sm text-muted-foreground">— {s.translation}</span>
                )}
                {!completed && (
                  <button
                    onClick={() => toggleDontKnow(s.wordId)}
                    className={cn(
                      'ml-auto inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                      s.dontKnow
                        ? 'border-warning bg-warning/15 text-warning'
                        : 'border-border text-muted-foreground hover:border-warning hover:text-warning'
                    )}
                  >
                    <HelpCircle className="h-3.5 w-3.5" /> Não sei
                  </button>
                )}
              </div>

              {s.dontKnow ? (
                <p className="text-sm italic text-muted-foreground">
                  Marcada como “Não sei” — sem problema, foque no que você já sabe.
                </p>
              ) : (
                <Textarea
                  value={s.text}
                  onChange={(e) => setSentence(s.wordId, e.target.value)}
                  placeholder={`Escreva uma frase com "${s.word}"...`}
                  rows={2}
                  disabled={completed}
                  className="bg-muted/40 transition-colors focus:bg-card focus:ring-2 focus:ring-accent"
                />
              )}

              {fb && <SentenceCorrection fb={fb} />}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function FeedbackSummary({
  feedback,
  earned,
}: {
  feedback: WritingFeedback
  earned?: number
}) {
  return (
    <Card className="space-y-3 p-5 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <span className="font-semibold">AI evaluation</span>
        {earned ? (
          <Badge className="gap-1 bg-accent text-accent-foreground">
            <Star className="h-3.5 w-3.5" /> +{earned} pts
          </Badge>
        ) : null}
        <Badge className="ml-auto bg-primary text-primary-foreground">
          {feedback.score}% correct
        </Badge>
      </div>
      {feedback.summary && (
        <p className="text-sm text-muted-foreground">{feedback.summary}</p>
      )}
      {feedback.insights.length > 0 && (
        <div className="rounded-xl bg-soft p-3">
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
            <Lightbulb className="h-4 w-4 text-accent-dark" /> Tips for you
          </div>
          <ul className="space-y-1">
            {feedback.insights.map((t, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                • {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}

function SentenceCorrection({ fb }: { fb: SentenceFeedback }) {
  return (
    <div
      className={cn(
        'mt-2 rounded-lg border p-3 text-sm',
        fb.ok ? 'border-success/40 bg-success/5' : 'border-warning/40 bg-warning/10'
      )}
    >
      <div className="mb-1 flex items-center gap-1.5 font-semibold">
        {fb.ok ? (
          <>
            <Check className="h-4 w-4 text-success" />
            <span className="text-success">Correct!</span>
          </>
        ) : (
          <>
            <X className="h-4 w-4 text-warning" />
            <span className="text-warning">Correction</span>
          </>
        )}
      </div>

      {/* A forma certa: a frase modelo (sempre, mesmo quando já estava certa) */}
      {fb.correction && (
        <p className="mb-1.5 flex items-center gap-1.5 font-medium text-foreground">
          <span className="text-xs font-normal uppercase tracking-wide text-muted-foreground">
            {fb.ok ? 'natural form:' : 'right:'}
          </span>
          {fb.correction}
          <button
            type="button"
            onClick={() => speak(fb.correction)}
            aria-label={`Play ${fb.correction}`}
            className="text-muted-foreground hover:text-primary"
          >
            <Volume2 className="h-3.5 w-3.5" />
          </button>
        </p>
      )}

      {/* Explicação: por que estava assim */}
      {fb.note && <p className="text-muted-foreground">{fb.note}</p>}

      {/* Regra prática: como fazer certo na próxima */}
      {fb.rule && (
        <div className="mt-2 flex items-start gap-1.5 rounded-md bg-soft px-2.5 py-2 text-soft-text">
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-dark" />
          <p>{fb.rule}</p>
        </div>
      )}
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
      <Card className="p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <div>
              <div className="font-mono text-xl font-bold">
                {knownCount}
                <span className="text-muted-foreground">/{total}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                words you already master
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
          placeholder="Search word or translation..."
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
          {list.length} result(s) for “{query.trim()}”
        </p>
      )}

      {/* Lista de palavras */}
      <div className="grid gap-2 sm:grid-cols-2">
        {list.map((w) => (
          <WordRow
            key={w.id}
            word={w.word}
            rank={w.rank}
            translation={w.translation}
            showTranslation={showTranslation}
            known={isKnown(w.id)}
            onToggle={() => toggleKnown(w.id)}
            onWroteCorrect={() => {
              if (!isKnown(w.id)) toggleKnown(w.id)
            }}
          />
        ))}
      </div>
    </div>
  )
}

const normWord = (s: string) => s.trim().toLowerCase()

function WordRow({
  word,
  rank,
  translation,
  showTranslation,
  known,
  onToggle,
  onWroteCorrect,
}: {
  word: string
  rank: number
  translation: string
  showTranslation: boolean
  known: boolean
  onToggle: () => void
  onWroteCorrect: () => void
}) {
  const [typed, setTyped] = useState('')
  const correct = typed.length > 0 && normWord(typed) === normWord(word)

  useEffect(() => {
    if (correct && !known) onWroteCorrect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correct])

  return (
    <Card
      className={cn(
        'space-y-2 p-3 shadow-soft transition-colors',
        known && 'border-success/40 bg-success/5'
      )}
    >
      <div className="flex items-center gap-3">
        <span className="w-8 shrink-0 font-mono text-xs text-muted-foreground">#{rank}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-semibold">{word}</span>
            <button
              onClick={() => speak(word)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent-dark"
              aria-label={`Play ${word}`}
            >
              <Volume2 className="h-3.5 w-3.5" />
            </button>
          </div>
          {showTranslation && (
            <div className="truncate text-sm text-muted-foreground">{translation}</div>
          )}
        </div>
        <button
          onClick={onToggle}
          aria-label={known ? 'Mark as not known' : 'Mark as known'}
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors',
            known
              ? 'border-success bg-success text-success-foreground'
              : 'border-border text-muted-foreground hover:text-foreground'
          )}
        >
          <Check className="h-4 w-4" />
        </button>
      </div>

      {/* Campo pra escrever a palavra (treino) */}
      <div className="relative">
        <Input
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder="type the word…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={cn(
            'h-9 pr-8 text-sm',
            correct && 'border-success text-success',
            typed.length > 0 && !correct && 'border-accent'
          )}
        />
        {correct && (
          <Check className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-success" />
        )}
      </div>
    </Card>
  )
}
