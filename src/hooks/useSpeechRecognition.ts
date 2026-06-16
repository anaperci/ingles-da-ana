import { useCallback, useEffect, useRef, useState } from 'react'

export type SpeechStatus = 'idle' | 'listening' | 'error'

interface Options {
  /** idioma do reconhecimento (padrão en-US) */
  lang?: string
  /** chamado quando o reconhecimento termina, com o texto final */
  onFinal?: (transcript: string) => void
}

function getRecognition(): SpeechRecognitionConstructor | undefined {
  if (typeof window === 'undefined') return undefined
  return window.SpeechRecognition || window.webkitSpeechRecognition
}

/** Mensagens amigáveis para os códigos de erro da Web Speech API. */
function messageFor(error: string): string {
  switch (error) {
    case 'not-allowed':
    case 'service-not-allowed':
      return 'Permita o acesso ao microfone para treinar a pronúncia.'
    case 'no-speech':
      return 'Não ouvi nada. Tente falar mais perto do microfone.'
    case 'audio-capture':
      return 'Nenhum microfone encontrado. Conecte um e tente de novo.'
    case 'network':
      return 'Falha de rede no reconhecimento de fala. Tente novamente.'
    case 'aborted':
      return ''
    default:
      return 'Não foi possível reconhecer a fala. Tente de novo.'
  }
}

/**
 * Reconhecimento de fala nativo do navegador (Web Speech API).
 * Captura o microfone, transcreve em tempo real (interim + final) e entrega
 * o texto final via `onFinal`. Sem chave, sem backend.
 */
export function useSpeechRecognition({ lang = 'en-US', onFinal }: Options = {}) {
  const Ctor = getRecognition()
  const isSupported = !!Ctor

  const [status, setStatus] = useState<SpeechStatus>('idle')
  const [interim, setInterim] = useState('')
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const finalRef = useRef('')
  // mantém o onFinal mais recente sem recriar a instância
  const onFinalRef = useRef(onFinal)
  useEffect(() => {
    onFinalRef.current = onFinal
  }, [onFinal])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
  }, [])

  const reset = useCallback(() => {
    setInterim('')
    setError(null)
    finalRef.current = ''
    setStatus('idle')
  }, [])

  const start = useCallback(() => {
    if (!Ctor) {
      setError('Seu navegador não suporta reconhecimento de fala.')
      setStatus('error')
      return
    }
    // limpa estado anterior
    finalRef.current = ''
    setInterim('')
    setError(null)

    const recognition = new Ctor()
    recognition.lang = lang
    recognition.continuous = false
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    recognition.onresult = (event) => {
      let interimText = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const text = result[0]?.transcript ?? ''
        if (result.isFinal) finalRef.current += text + ' '
        else interimText += text
      }
      setInterim(interimText)
    }

    recognition.onerror = (event) => {
      const msg = messageFor(event.error)
      if (msg) {
        setError(msg)
        setStatus('error')
      }
    }

    recognition.onend = () => {
      recognitionRef.current = null
      setInterim('')
      setStatus((prev) => (prev === 'error' ? 'error' : 'idle'))
      const finalText = (finalRef.current || '').trim()
      if (finalText) onFinalRef.current?.(finalText)
    }

    recognitionRef.current = recognition
    try {
      recognition.start()
      setStatus('listening')
    } catch {
      // start() lança se chamado durante uma sessão ativa
      setError('Não foi possível iniciar o microfone. Tente de novo.')
      setStatus('error')
    }
  }, [Ctor, lang])

  // encerra o reconhecimento se o componente desmontar
  useEffect(() => {
    return () => recognitionRef.current?.abort()
  }, [])

  return { isSupported, status, interim, error, start, stop, reset }
}
