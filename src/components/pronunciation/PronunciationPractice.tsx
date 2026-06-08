import { useState } from 'react'
import { Mic, Square, Volume2, Loader2, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScoreRing } from './ScoreRing'
import { cn } from '@/lib/utils'
import { speak } from '@/lib/tts'
import { blobToWavBase64 } from '@/lib/audio'
import { useRecorder } from '@/hooks/useRecorder'
import { useShowTranslation } from '@/hooks/useShowTranslation'
import { useProgress } from '@/hooks/useProgress'
import { callFunction, isBackendConfigured, NotConfiguredError } from '@/lib/api'
import type { PronunciationPhrase } from '@/data/pronunciationPhrases'
import type { PronunciationResult, WordScore } from '@/types/pronunciation'

interface Props {
  phrase: PronunciationPhrase
}

function wordColor(w: WordScore): string {
  if (w.errorType === 'Omission') return 'text-muted-foreground line-through'
  if (w.accuracyScore >= 80) return 'text-success'
  if (w.accuracyScore >= 60) return 'text-warning'
  return 'text-error'
}

export function PronunciationPractice({ phrase }: Props) {
  const { state, error: recError, start, stop } = useRecorder()
  const { show } = useShowTranslation()
  const { addSession } = useProgress()
  const [result, setResult] = useState<PronunciationResult | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const configured = isBackendConfigured()

  async function handleStop() {
    const blob = await stop()
    if (!blob) return
    setBusy(true)
    setError(null)
    try {
      const audioBase64 = await blobToWavBase64(blob)
      const res = await callFunction<PronunciationResult>('pronounce', {
        audioBase64,
        referenceText: phrase.text,
      })
      setResult(res)
      addSession({
        module: 'pronunciation',
        title: `Pronúncia · "${phrase.text.slice(0, 30)}…"`,
        minutes: 1,
        score: Math.round(res.pronunciationScore),
        category: phrase.category,
      })
    } catch (e) {
      if (e instanceof NotConfiguredError) {
        setError('A pronúncia precisa das chaves do Azure configuradas no Supabase.')
      } else {
        setError((e as Error).message)
      }
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setResult(null)
    setError(null)
  }

  const recording = state === 'recording'

  return (
    <Card className="space-y-6 p-6 sm:p-8">
      {/* Frase */}
      <div className="space-y-2 text-center">
        <Badge variant="secondary">{phrase.difficulty}</Badge>
        <div className="flex items-center justify-center gap-2">
          {result ? (
            <p className="text-xl font-bold leading-relaxed sm:text-2xl">
              {result.words.length > 0
                ? result.words.map((w, i) => (
                    <span key={i} className={cn('mx-0.5', wordColor(w))}>
                      {w.word}
                    </span>
                  ))
                : phrase.text}
            </p>
          ) : (
            <p className="text-xl font-bold leading-relaxed sm:text-2xl">{phrase.text}</p>
          )}
          <button
            className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
            onClick={() => speak(phrase.text)}
            aria-label="Ouvir modelo"
          >
            <Volume2 className="h-5 w-5" />
          </button>
        </div>
        {show && <p className="text-sm text-muted-foreground">{phrase.translation}</p>}
      </div>

      {/* Resultado */}
      {result && (
        <div className="animate-fade-in space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ScoreRing value={result.pronunciationScore} label="Geral" size={112} />
            <ScoreRing value={result.accuracyScore} label="Precisão" />
            <ScoreRing value={result.fluencyScore} label="Fluência" />
            <ScoreRing value={result.completenessScore} label="Completude" />
            {result.prosodyScore != null && (
              <ScoreRing value={result.prosodyScore} label="Prosódia" />
            )}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Palavras em <span className="text-success">verde</span> saíram bem;{' '}
            <span className="text-warning">amarelo</span> precisa de atenção;{' '}
            <span className="text-error">vermelho</span> treine mais.
          </p>
        </div>
      )}

      {/* Erros */}
      {(error || recError) && (
        <p className="rounded-lg bg-error/10 px-4 py-2 text-center text-sm text-error">
          {error || recError}
        </p>
      )}
      {!configured && !error && (
        <p className="rounded-lg bg-warning/10 px-4 py-2 text-center text-xs text-warning">
          Configure as chaves do Azure no Supabase para receber a avaliação.
        </p>
      )}

      {/* Controles */}
      <div className="flex flex-col items-center gap-3">
        {busy ? (
          <Button size="lg" disabled className="gap-2">
            <Loader2 className="h-5 w-5 animate-spin" /> Analisando…
          </Button>
        ) : result ? (
          <Button size="lg" variant="outline" onClick={reset} className="gap-2">
            <RotateCcw className="h-5 w-5" /> Tentar de novo
          </Button>
        ) : recording ? (
          <Button size="lg" variant="destructive" onClick={handleStop} className="gap-2">
            <Square className="h-5 w-5" /> Parar e avaliar
          </Button>
        ) : (
          <Button size="lg" variant="gradient" onClick={start} className="gap-2">
            <Mic className="h-5 w-5" /> Gravar minha fala
          </Button>
        )}
        {recording && (
          <div className="flex items-center gap-2 text-sm text-error">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-error" />
            gravando…
          </div>
        )}
      </div>
    </Card>
  )
}
