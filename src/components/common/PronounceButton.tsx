import { useState } from 'react'
import { Mic, Square, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRecorder } from '@/hooks/useRecorder'
import { blobToWavBase64 } from '@/lib/audio'
import { callFunction, isBackendConfigured } from '@/lib/api'
import { azureAvailable, azureExtras } from '@/lib/azure'
import type { PronunciationResult } from '@/types/pronunciation'

/**
 * Botão compacto para praticar a fala de um texto curto (palavra/forma verbal)
 * e receber o score do Azure. Recurso pago: só aparece pra quem tem Azure.
 */
export function PronounceButton({ text, label }: { text: string; label?: string }) {
  const { state, start, stop } = useRecorder()
  const [busy, setBusy] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [error, setError] = useState(false)
  const recording = state === 'recording'

  if (!isBackendConfigured() || !azureAvailable()) return null

  async function handleStop() {
    const blob = await stop()
    if (!blob) return
    setBusy(true)
    setError(false)
    try {
      const base64 = await blobToWavBase64(blob)
      const res = await callFunction<PronunciationResult>('pronounce', {
        audioBase64: base64,
        referenceText: text,
        ...azureExtras(),
      })
      setScore(Math.round(res.pronunciationScore))
    } catch {
      setError(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      onClick={recording ? handleStop : start}
      disabled={busy}
      title={`Falar "${text}"`}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-colors',
        recording ? 'bg-error/15 text-error' : 'bg-secondary text-muted-foreground hover:text-foreground'
      )}
    >
      {busy ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : recording ? (
        <Square className="h-3.5 w-3.5" />
      ) : (
        <Mic className="h-3.5 w-3.5" />
      )}
      {score != null ? (
        <span className={score >= 80 ? 'text-success' : score >= 60 ? 'text-warning' : 'text-error'}>
          {score}
        </span>
      ) : error ? (
        '—'
      ) : (
        label ?? 'falar'
      )}
    </button>
  )
}
