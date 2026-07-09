import { useCallback } from 'react'
import { useLocalStore } from './useLocalStore'
import { STORAGE_KEYS } from '@/lib/keys'
import { callFunction, isBackendConfigured } from '@/lib/api'
import { COMMON_WORDS } from '@/data/commonWords'

/** Frase com lacuna (cloze) para treinar uma palavra por múltipla escolha. */
export interface ClozeCard {
  /** frase em inglês com `___` no lugar da palavra-alvo */
  sentence: string
}

type ClozeStore = Record<string, ClozeCard>

const CLOZE_SYSTEM = `Você cria exercícios de vocabulário para a Ana — brasileira, nível iniciante/intermediário, aprendendo inglês.
Receberá UMA palavra em inglês. Escreva UMA frase curta, natural e simples em inglês (no máximo 10 palavras) que use essa palavra EXATAMENTE na forma dada (sem flexionar, sem plural, sem conjugar). Depois substitua a palavra por "___" na frase.
Regras:
- A palavra-alvo aparece uma única vez, trocada por "___".
- Contexto claro o suficiente para deduzir a palavra.
- Inglês do dia a dia, sem gírias difíceis.
Responda APENAS com JSON válido, sem markdown: {"sentence": "<a frase com ___>"}`

/** Extrai a frase do JSON (tolerante a cercas de código e texto extra). */
function parseSentence(reply: string): string | null {
  let txt = (reply ?? '').trim()
  const fence = txt.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fence) txt = fence[1].trim()
  try {
    const obj = JSON.parse(txt) as { sentence?: unknown }
    if (typeof obj.sentence === 'string' && obj.sentence.includes('___')) {
      return obj.sentence.trim()
    }
  } catch {
    const m = txt.match(/"sentence"\s*:\s*"([^"]*___[^"]*)"/)
    if (m) return m[1].trim()
  }
  return null
}

/** 3 distratores plausíveis: palavras de rank próximo, fora a alvo. */
export function pickDistractors(wordId: string): string[] {
  const idx = COMMON_WORDS.findIndex((w) => w.id === wordId)
  if (idx === -1) return []
  const target = COMMON_WORDS[idx].word.toLowerCase()
  const window = 60
  const pool = COMMON_WORDS.slice(
    Math.max(0, idx - window),
    Math.min(COMMON_WORDS.length, idx + window)
  ).filter((w) => w.word.toLowerCase() !== target)

  const out: string[] = []
  const used = new Set<string>()
  while (out.length < 3 && pool.length > 0) {
    const pick = pool[Math.floor(Math.random() * pool.length)]
    const key = pick.word.toLowerCase()
    if (!used.has(key)) {
      used.add(key)
      out.push(pick.word)
    }
    if (used.size >= pool.length) break
  }
  return out
}

/**
 * Gera e cacheia a frase-lacuna de cada palavra. A geração é sob demanda
 * (só quando a Ana pede pra praticar aquela palavra) e o resultado fica
 * salvo em localStorage, então cada palavra só chama a IA uma vez.
 */
export function useWordCloze() {
  const [store, setStore] = useLocalStore<ClozeStore>(
    STORAGE_KEYS.commonWordsCloze,
    {}
  )

  const getCached = useCallback((id: string) => store[id], [store])

  const generate = useCallback(
    async (id: string, word: string): Promise<ClozeCard | null> => {
      const cached = store[id]
      if (cached) return cached
      if (!isBackendConfigured()) return null
      const data = await callFunction<{ reply: string }>('chat', {
        system: CLOZE_SYSTEM,
        messages: [{ role: 'user', content: word }],
        json: true,
        maxTokens: 120,
      })
      const sentence = parseSentence(data.reply)
      if (!sentence) return null
      const card: ClozeCard = { sentence }
      setStore((prev) => ({ ...prev, [id]: card }))
      return card
    },
    [store, setStore]
  )

  return { getCached, generate }
}
