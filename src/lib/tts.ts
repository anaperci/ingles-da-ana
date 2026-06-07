/**
 * Text-to-Speech via Web Speech API (nativo do navegador, sem chave).
 * Reutilizável por Vocabulário, Verbos e Pronúncia para ouvir a palavra.
 */
export function speak(text: string, lang = 'en-US') {
  try {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = lang
    utter.rate = 0.95
    window.speechSynthesis.speak(utter)
  } catch {
    /* navegador sem suporte — ignora */
  }
}

export function ttsSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}
