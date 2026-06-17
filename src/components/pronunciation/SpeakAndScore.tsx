import { useState, type ReactNode } from 'react'
import { Mic, Square, Volume2, RotateCcw, Loader2, MonitorX } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScoreRing } from './ScoreRing'
import { cn } from '@/lib/utils'
import { speak } from '@/lib/tts'
import { useShowTranslation } from '@/hooks/useShowTranslation'
import { useProgress } from '@/hooks/useProgress'
import { useRecorder } from '@/hooks/useRecorder'
import { blobToWavBase64 } from '@/lib/audio'
import { callFunction, isBackendConfigured } from '@/lib/api'
import type { PronunciationResult, WordScore } from '@/types/pronunciation'
import type { CategoryKey, ModuleKey } from '@/types'

interface SessionMeta {
  module: ModuleKey
  title: string
  category?: CategoryKey
}

interface Props {
  /** frase de referência (en) que será lida em voz alta */
  text: string
  /** tradução (pt), exibida conforme o toggle global */
  translation?: string
  /** conteúdo opcional no topo (ex.: badge de dificuldade) */
  badge?: ReactNode
  /** dados para registrar a sessão no progresso */
  session: SessionMeta
  /** callback opcional com o resultado da avaliação (Azure) */
  onScored?: (result: PronunciationResult) => void
}

/** Cor da palavra pela nota de precisão / tipo de erro do Azure. */
function wordColor(w: WordScore): string {
  if (w.errorType === 'Omission') return 'text-error line-through'
  if (w.errorType === 'Insertion') return 'text-muted-foreground italic'
  if (w.accuracyScore >= 80) return 'text-success'
  if (w.accuracyScore >= 60) return 'text-warning'
  return 'text-error'
}

/**
 * Núcleo reutilizável de "falar uma frase e receber a nota de pronúncia".
 * Usa o **Azure Speech** (grava o áudio → função `pronounce`) — funciona em
 * qualquer navegador, com nota por palavra de verdade. Reaproveitado pela página
 * de Pronúncia e pelo modo FALAR de outros módulos.
 */
export function SpeakAndScore({ text, translation, badge, session, onScored }: Props) {
  const { show } = useShowTranslation()
  const { addSession } = useProgress()
  const { state, start, stop } = useRecorder()
  const [result, setResult] = useState<PronunciationResult | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const recording = state === 'recording'
  const supported =
    isBackendConfigured() &&
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices

  function handleStart() {
    setResult(null)
    setError(null)
    start()
  }

  async function handleStop() {
    const blob = await stop()
    if (!blob) return
    setBusy(true)
    setError(null)
    try {
      const audioBase64 = await blobToWavBase64(blob)
      const res = await callFunction<PronunciationResult>('pronounce', {
        audioBase64,
        referenceText: text,
      })
      setResult(res)
      addSession({
        module: session.module,
        title: session.title,
        minutes: 1,
        score: Math.round(res.pronunciationScore),
        category: session.category,
      })
      onScored?.(res)
    } catch {
      setError('Não consegui avaliar o áudio. Fale perto do microfone e tente de novo.')
    } finally {
      setBusy(false)
    }
  }

  function handleReset() {
    setResult(null)
    setError(null)
  }

  return (
    <Card className="space-y-6 p-6 sm:p-8">
      {/* Frase */}
      <div className="space-y-2 text-center">
        {badge}
        <div className="flex items-center justify-center gap-2">
          {result && result.words.length > 0 ? (
            <p className="text-xl font-bold leading-relaxed sm:text-2xl">
              {result.words.map((w, i) => (
                <span key={i} className={cn('mx-0.5', wordColor(w))}>
                  {w.word}
                </span>
              ))}
            </p>
          ) : (
            <p className="text-xl font-bold leading-relaxed sm:text-2xl">{text}</p>
          )}
          <button
            className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
            onClick={() => speak(text)}
            aria-label="Ouvir modelo"
          >
            <Volume2 className="h-5 w-5" />
          </button>
        </div>
        {show && translation && (
          <p className="text-sm text-muted-foreground">{translation}</p>
        )}
      </div>

      {/* Resultado */}
      {result && (
        <div className="animate-fade-in space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ScoreRing value={Math.round(result.pronunciationScore)} label="Geral" size={112} />
            <ScoreRing value={Math.round(result.accuracyScore)} label="Precisão" />
            <ScoreRing value={Math.round(result.fluencyScore)} label="Fluência" />
            <ScoreRing value={Math.round(result.completenessScore)} label="Completude" />
          </div>
          {result.recognizedText && (
            <p className="text-center text-sm text-muted-foreground">
              Você disse:{' '}
              <span className="font-medium text-foreground">“{result.recognizedText}”</span>
            </p>
          )}
          <p className="text-center text-sm text-muted-foreground">
            Palavras em <span className="text-success">verde</span> saíram bem;{' '}
            <span className="text-warning">amarelo</span> quase;{' '}
            <span className="text-error">vermelho</span> precisa treinar.
          </p>
        </div>
      )}

      {/* Erro */}
      {error && (
        <p className="rounded-lg bg-error/10 px-4 py-2 text-center text-sm text-error">
          {error}
        </p>
      )}

      {/* Controles */}
      {supported ? (
        <div className="flex flex-col items-center gap-3">
          {busy ? (
            <Button size="lg" variant="outline" disabled className="gap-2">
              <Loader2 className="h-5 w-5 animate-spin" /> Avaliando…
            </Button>
          ) : result ? (
            <Button size="lg" variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="h-5 w-5" /> Tentar de novo
            </Button>
          ) : recording ? (
            <Button size="lg" variant="destructive" onClick={handleStop} className="gap-2">
              <Square className="h-5 w-5" /> Parar e avaliar
            </Button>
          ) : (
            <Button size="lg" variant="gradient" onClick={handleStart} className="gap-2">
              <Mic className="h-5 w-5" /> Falar agora
            </Button>
          )}
          {recording && (
            <div className="flex items-center gap-2 text-sm text-error">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-error" />
              gravando… fale a frase e clique em parar
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-lg bg-warning/10 px-4 py-3 text-sm text-warning">
          <MonitorX className="mt-0.5 h-5 w-5 shrink-0" />
          <span>
            A avaliação de pronúncia precisa de microfone e do backend configurado.
            Você ainda pode ouvir o modelo no botão 🔊.
          </span>
        </div>
      )}
    </Card>
  )
}
