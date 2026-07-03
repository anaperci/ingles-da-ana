// Edge Function: gera exercícios de inglês via OpenAI (GPT).
// GATING: recurso pago — só a conta dona (token) gera. A chave OPENAI_API_KEY
// vive como secret no Supabase, nunca no frontend.
//
// Deploy:  supabase functions deploy generate-exercises --no-verify-jwt
// Secret:  já existe OPENAI_API_KEY (mesma usada pela função `chat`).
//
// Contrato (POST): { prompt: string, token: string } -> { exercises: [...] }
import { corsHeaders, json } from '../_shared/cors.ts'
import { isOwnerToken, paidFeatureResponse } from '../_shared/owner.ts'

declare const Deno: { env: { get(k: string): string | undefined } }

const MODEL = Deno.env.get('OPENAI_MODEL') ?? 'gpt-4o-mini'

const SYSTEM = `You are an English exercise generator for a Brazilian Portuguese speaker.

When the user describes a difficulty or requests an exercise, generate one or more exercises and return ONLY a valid JSON array, no markdown, no explanation outside the JSON.

Each exercise object:
{
  "type": "multiple_choice" | "fill_blank" | "rewrite" | "match",
  "topic": "prepositions" | "adverbs" | "verbs" | "sentence_frames" | "vocabulary" | "other",
  "difficulty": "easy" | "medium" | "hard",
  "question": "string — the exercise instruction and/or sentence",
  "options": [...],   // required for multiple_choice and match
  "correct_answer": "string",
  "explanation": "string in Brazilian Portuguese explaining why"
}

For 'multiple_choice': options = ["A) ...", "B) ...", "C) ...", "D) ..."]
For 'fill_blank': question contains ___ where the answer goes
For 'rewrite': question contains a wrong sentence to be corrected
For 'match': options = { "left": [...], "right": [...], "pairs": [[0,1],[1,0]...] }

Generate between 1 and 5 exercises per request.
Always include a clear explanation in PT-BR.`

const VALID_TYPES = ['multiple_choice', 'fill_blank', 'rewrite', 'match']

// deno-lint-ignore no-explicit-any
function extractJsonArray(text: string): any[] {
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim()
  const start = cleaned.indexOf('[')
  const end = cleaned.lastIndexOf(']')
  if (start === -1 || end === -1) throw new Error('resposta sem array JSON')
  return JSON.parse(cleaned.slice(start, end + 1))
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  let body: { prompt?: string; token?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'JSON inválido' }, 400)
  }

  if (!isOwnerToken(body.token)) return json(paidFeatureResponse(), 402)

  const prompt = (body.prompt ?? '').trim()
  if (!prompt) return json({ error: 'prompt é obrigatório' }, 400)

  const apiKey = Deno.env.get('OPENAI_API_KEY')
  if (!apiKey) return json({ error: 'OPENAI_API_KEY não configurada' }, 500)

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 3000,
        temperature: 0.6,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: prompt },
        ],
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return json({ error: `OpenAI ${res.status}: ${err}` }, 502)
    }

    const data = await res.json()
    const text: string = data?.choices?.[0]?.message?.content ?? ''

    let parsed: unknown[]
    try {
      parsed = extractJsonArray(text)
    } catch (e) {
      return json({ error: `Não consegui interpretar a resposta da IA: ${String(e)}`, raw: text }, 502)
    }

    const exercises = parsed
      // deno-lint-ignore no-explicit-any
      .filter((e: any) => e && VALID_TYPES.includes(e.type) && e.question && e.correct_answer)
      // deno-lint-ignore no-explicit-any
      .map((e: any) => ({
        type: e.type,
        topic: e.topic ?? 'other',
        difficulty: e.difficulty ?? 'medium',
        question: String(e.question),
        options: e.options ?? null,
        correct_answer: String(e.correct_answer),
        explanation: e.explanation ?? '',
      }))

    if (!exercises.length) return json({ error: 'A IA não retornou exercícios válidos.', raw: text }, 502)
    return json({ exercises })
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})
