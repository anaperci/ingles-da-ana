/**
 * Text-to-Speech. Usa as vozes NEURAIS do Azure (naturais) via a Edge Function
 * `tts`, com cache por texto. Se o backend não estiver configurado ou falhar,
 * cai na voz nativa do navegador (Web Speech API) para não ficar mudo.
 */
import { callFunctionBlob, isBackendConfigured } from '@/lib/api'
import { azureAvailable, azureExtras } from '@/lib/azure'

const cache = new Map<string, string>() // texto -> object URL do MP3
let currentAudio: HTMLAudioElement | null = null

function stopCurrent() {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

/** Voz nativa do navegador (fallback). */
function browserSpeak(text: string, lang: string) {
  try {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = lang
    utter.rate = 0.95
    window.speechSynthesis.speak(utter)
  } catch {
    /* sem suporte — ignora */
  }
}

function play(url: string, text: string, lang: string) {
  const audio = new Audio(url)
  currentAudio = audio
  audio.play().catch(() => browserSpeak(text, lang))
}

export function speak(text: string, lang = 'en-US') {
  const clean = text.trim()
  if (!clean) return
  stopCurrent()

  // Azure é pago: só a dona (ou quem tem chave própria) usa a voz neural.
  // Os demais usam a voz do navegador silenciosamente.
  if (!isBackendConfigured() || !azureAvailable()) {
    browserSpeak(clean, lang)
    return
  }

  const cached = cache.get(clean)
  if (cached) {
    play(cached, clean, lang)
    return
  }

  callFunctionBlob('tts', { text: clean, ...azureExtras() })
    .then((blob) => {
      const url = URL.createObjectURL(blob)
      cache.set(clean, url)
      play(url, clean, lang)
    })
    .catch(() => browserSpeak(clean, lang))
}

export function ttsSupported(): boolean {
  return (
    isBackendConfigured() ||
    (typeof window !== 'undefined' && 'speechSynthesis' in window)
  )
}
