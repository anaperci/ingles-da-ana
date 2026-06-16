import { useState, type ReactNode } from 'react'
import { Mic, Square, Volume2, RotateCcw, MonitorX } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScoreRing } from './ScoreRing'
import { cn } from '@/lib/utils'
import { speak } from '@/lib/tts'
import { useShowTranslation } from '@/hooks/useShowTranslation'
import { useProgress } from '@/hooks/useProgress'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { evaluatePronunciation } from '@/lib/pronunciation/evaluator'
import type {
  PronunciationAssessment,
  WordAssessment,
} from '@/lib/pronunciation/types'
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
  /** callback opcional com o resultado da avaliação */
  onScored?: (assessment: PronunciationAssessment) => void
}

function wordColor(w: WordAssessment): string {
  if (w.status === 'missing') return 'text-error line-through'
  if (w.status === 'matched') return 'text-success'
  if (w.status === 'partial') return 'text-warning'
  return 'text-muted-foreground'
}

/**
 * Núcleo reutilizável de "falar uma frase e receber a nota de compreensibilidade".
 * Usa o reconhecimento de fala do navegador + o avaliador textual. Reaproveitado
 * pela página de Pronúncia e pelo modo FALAR de outros módulos.
 */
export function SpeakAndScore({ text, translation, badge, session, onScored }: Props) {
  const { show } = useShowTranslation()
  const { addSession } = useProgress()
  const [result, setResult] = useState<PronunciationAssessment | null>(null)

  const { isSupported, status, interim, error, start, stop, reset } =
    useSpeechRecognition({
      lang: 'en-US',
      onFinal: (transcript) => {
        const assessment = evaluatePronunciation(text, transcript)
        setResult(assessment)
        addSession({
          module: session.module,
          title: session.title,
          minutes: 1,
          score: assessment.overallScore,
          category: session.category,
        })
        onScored?.(assessment)
      },
    })

  const listening = status === 'listening'

  function handleStart() {
    setResult(null)
    reset()
    start()
  }

  function handleReset() {
    setResult(null)
    reset()
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

      {/* Transcrição ao vivo */}
      {listening && (
        <p className="min-h-[1.5rem] text-center text-sm italic text-muted-foreground">
          {interim || 'pode falar…'}
        </p>
      )}

      {/* Resultado */}
      {result && (
        <div className="animate-fade-in space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ScoreRing value={result.overallScore} label="Geral" size={112} />
            {result.accuracyScore != null && (
              <ScoreRing value={result.accuracyScore} label="Precisão" />
            )}
            {result.completenessScore != null && (
              <ScoreRing value={result.completenessScore} label="Completude" />
            )}
          </div>
          {result.transcript && (
            <p className="text-center text-sm text-muted-foreground">
              Você disse:{' '}
              <span className="font-medium text-foreground">“{result.transcript}”</span>
            </p>
          )}
          <p className="text-center text-sm text-muted-foreground">
            Palavras em <span className="text-success">verde</span> saíram bem;{' '}
            <span className="text-warning">amarelo</span> quase;{' '}
            <span className="text-error">vermelho</span> faltou ou não entendi.
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
      {isSupported ? (
        <div className="flex flex-col items-center gap-3">
          {result ? (
            <Button size="lg" variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="h-5 w-5" /> Tentar de novo
            </Button>
          ) : listening ? (
            <Button size="lg" variant="destructive" onClick={stop} className="gap-2">
              <Square className="h-5 w-5" /> Parar
            </Button>
          ) : (
            <Button size="lg" variant="gradient" onClick={handleStart} className="gap-2">
              <Mic className="h-5 w-5" /> Falar agora
            </Button>
          )}
          {listening && (
            <div className="flex items-center gap-2 text-sm text-error">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-error" />
              ouvindo…
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-lg bg-warning/10 px-4 py-3 text-sm text-warning">
          <MonitorX className="mt-0.5 h-5 w-5 shrink-0" />
          <span>
            Seu navegador não suporta reconhecimento de fala. Use o Chrome ou o
            Edge no computador para treinar a pronúncia. Você ainda pode ouvir o
            modelo no botão 🔊.
          </span>
        </div>
      )}
    </Card>
  )
}
