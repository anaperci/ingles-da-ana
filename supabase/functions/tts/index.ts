// Edge Function: Text-to-Speech com vozes neurais do Azure (naturais).
// Reaproveita os secrets AZURE_SPEECH_KEY / AZURE_SPEECH_REGION (region eastus).
// Deploy: supabase functions deploy tts
import { corsHeaders, json } from '../_shared/cors.ts'
import { resolveAzure, paidFeatureResponse, type AzureBody } from '../_shared/azure.ts'

const DEFAULT_VOICE = 'en-GB-SoniaNeural' // britânico natural (Malta); trocável via body.voice

interface Body extends AzureBody {
  text?: string
  voice?: string
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  let body: Body
  try {
    body = await req.json()
  } catch {
    return json({ error: 'JSON inválido' }, 400)
  }
  const text = (body.text ?? '').toString().trim()
  if (!text) return json({ error: 'text é obrigatório' }, 400)

  // Gating de custo: dona usa a chave do servidor; outros precisam de BYOK.
  const az = resolveAzure(body)
  if (!az) return json(paidFeatureResponse(), 402)
  if (!az.key) return json({ error: 'Chave do Azure não configurada' }, 500)
  const { key, region } = az
  const voice = body.voice || DEFAULT_VOICE

  const ssml = `<speak version='1.0' xml:lang='en-US'><voice name='${voice}'>${escapeXml(
    text
  )}</voice></speak>`

  try {
    const res = await fetch(
      `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
          'User-Agent': 'ingles-da-ana',
        },
        body: ssml,
      }
    )
    if (!res.ok) {
      const err = await res.text()
      return json({ error: `Azure ${res.status}: ${err}` }, 502)
    }
    const audio = await res.arrayBuffer()
    return new Response(audio, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})
