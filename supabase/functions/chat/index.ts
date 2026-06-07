// Edge Function: proxy de conversação com a Claude API.
// A chave ANTHROPIC_API_KEY fica como secret no Supabase, nunca no frontend.
//
// Deploy:  supabase functions deploy chat
// Secret:  supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
import { corsHeaders, json } from '../_shared/cors.ts'

declare const Deno: { env: { get(k: string): string | undefined } }

const MODEL = Deno.env.get('ANTHROPIC_MODEL') ?? 'claude-haiku-4-5-20251001'

interface ChatBody {
  system: string
  messages: { role: 'user' | 'assistant'; content: string }[]
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const apiKey = Deno.env.get('ANTHROPIC_API_KEY')
  if (!apiKey) return json({ error: 'ANTHROPIC_API_KEY não configurada' }, 500)

  let body: ChatBody
  try {
    body = await req.json()
  } catch {
    return json({ error: 'JSON inválido' }, 400)
  }
  if (!body?.messages?.length) return json({ error: 'messages é obrigatório' }, 400)

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        system: body.system,
        messages: body.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return json({ error: `Anthropic ${res.status}: ${err}` }, 502)
    }

    const data = await res.json()
    const reply =
      data?.content?.map((c: { text?: string }) => c.text ?? '').join('') ?? ''
    return json({ reply })
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})
