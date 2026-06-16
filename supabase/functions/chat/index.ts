// Edge Function: proxy de conversação com a OpenAI API.
// A chave OPENAI_API_KEY fica como secret no Supabase, nunca no frontend.
//
// Deploy:  supabase functions deploy chat
// Secret:  supabase secrets set OPENAI_API_KEY=sk-...
import { corsHeaders, json } from '../_shared/cors.ts'

declare const Deno: { env: { get(k: string): string | undefined } }

const MODEL = Deno.env.get('OPENAI_MODEL') ?? 'gpt-4o-mini'

interface ChatBody {
  system: string
  messages: { role: 'user' | 'assistant'; content: string }[]
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const apiKey = Deno.env.get('OPENAI_API_KEY')
  if (!apiKey) return json({ error: 'OPENAI_API_KEY não configurada' }, 500)

  let body: ChatBody
  try {
    body = await req.json()
  } catch {
    return json({ error: 'JSON inválido' }, 400)
  }
  if (!body?.messages?.length) return json({ error: 'messages é obrigatório' }, 400)

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        messages: [
          { role: 'system', content: body.system ?? '' },
          ...body.messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return json({ error: `OpenAI ${res.status}: ${err}` }, 502)
    }

    const data = await res.json()
    const reply = data?.choices?.[0]?.message?.content ?? ''
    return json({ reply })
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})
