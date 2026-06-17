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
      new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR', {
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
        setError('A avaliação por IA precisa do backend configurado.')
      } else if (e instanceof SyntaxError) {
        setError('A IA respondeu num formato inesperado. Tente finalizar de novo.')
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
            {reviewCount > 0 && (
              <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-accent-dark">
                <RotateCcw className="h-3.5 w-3.5" />
                {reviewCount} {reviewCount === 1 ? 'palavra de revisão' : 'palavras de revisão'}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {completed ? (
              <Badge className="gap-1 bg-success text-success-foreground">
                <CheckCircle2 className="h-4 w-4" /> Concluído
                {feedback ? ` · ${feedback.score}%` : ' hoje'}
              </Badge>
            ) : (
              <Button variant="gradient" disabled={loading} onClick={finalize}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Avaliando…
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" /> Finalizar e avaliar
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        <Progress value={pct} className="mt-4" />
        <p className="mt-2 text-sm text-muted-foreground">
          Escreva o que souber e marque <strong>“não sei”</strong> no resto — pode
          finalizar a qualquer momento que a IA corrige suas frases e traz dicas. As
          palavras que você <strong>errar voltam noutro dia</strong>, em uma frase
          nova, até você dominar.
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
                'p-4 transition-colors',
                s.dontKnow && 'opacity-60',
                filled && !fb && 'border-success/40 bg-success/5'
              )}
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
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
                {s.review && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent-dark">
                    <RotateCcw className="h-3 w-3" /> revisão
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
                        : 'border-border text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <HelpCircle className="h-3.5 w-3.5" /> não sei
                  </button>
                )}
              </div>

              {s.dontKnow ? (
                <p className="text-sm italic text-muted-foreground">
                  Marcada como “não sei” — sem problema, foco no que você já sabe.
                </p>
              ) : (
                <Textarea
                  value={s.text}
                  onChange={(e) => setSentence(s.wordId, e.target.value)}
                  placeholder={`Escreva uma frase com "${s.word}"...`}
                  rows={2}
                  disabled={completed}
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
    <Card className="space-y-3 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <span className="font-semibold">Avaliação da IA</span>
        {earned ? (
          <Badge className="gap-1 bg-accent text-accent-foreground">
            <Star className="h-3.5 w-3.5" /> +{earned} pts
          </Badge>
        ) : null}
        <Badge className="ml-auto bg-primary text-primary-foreground">
          {feedback.score}% certas
        </Badge>
      </div>
      {feedback.summary && (
        <p className="text-sm text-muted-foreground">{feedback.summary}</p>
      )}
      {feedback.insights.length > 0 && (
        <div className="rounded-xl bg-soft p-3">
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
            <Lightbulb className="h-4 w-4 text-accent-dark" /> Dicas pra você
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
            <span className="text-success">Correto!</span>
          </>
        ) : (
          <>
            <X className="h-4 w-4 text-warning" />
            <span className="text-warning">Correção</span>
          </>
        )}
      </div>

      {/* A forma certa: a frase modelo (sempre, mesmo quando já estava certa) */}
      {fb.correction && (
        <p className="mb-1.5 flex items-center gap-1.5 font-medium text-foreground">
          <span className="text-xs font-normal uppercase tracking-wide text-muted-foreground">
            {fb.ok ? 'forma certa:' : 'certo:'}
          </span>
          {fb.correction}
          <button
            type="button"
            onClick={() => speak(fb.correction)}
            aria-label={`Ouvir ${fb.correction}`}
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
