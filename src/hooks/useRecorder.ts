import { useCallback, useRef, useState } from 'react'

type RecorderState = 'idle' | 'recording' | 'processing'

/** Gravação de microfone via MediaRecorder. Devolve o Blob ao parar. */
export function useRecorder() {
  const [state, setState] = useState<RecorderState>('idle')
  const [error, setError] = useState<string | null>(null)
  const mediaRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  const start = useCallback(async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.start()
      mediaRef.current = recorder
      setState('recording')
    } catch {
      setError('Não foi possível acessar o microfone. Permita o acesso e tente de novo.')
      setState('idle')
    }
  }, [])

  const stop = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const recorder = mediaRef.current
      if (!recorder) return resolve(null)
      setState('processing')
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType })
        streamRef.current?.getTracks().forEach((t) => t.stop())
        streamRef.current = null
        mediaRef.current = null
        setState('idle')
        resolve(blob)
      }
      recorder.stop()
    })
  }, [])

  return { state, error, start, stop }
}
