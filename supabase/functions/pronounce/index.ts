// Edge Function: proxy do Azure Speech Pronunciation Assessment.
// Chaves como secrets no Supabase:
//   supabase secrets set AZURE_SPEECH_KEY=...  AZURE_SPEECH_REGION=westeurope
// Deploy: supabase functions deploy pronounce
import { corsHeaders, json } from '../_shared/cors.ts'

declare const Deno: { env: { get(k: string): string | undefined } }

interface Body {
  audioBase64: string
  referenceText: string
}

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const key = Deno.env.get('AZURE_SPEECH_KEY')
  const region = Deno.env.get('AZURE_SPEECH_REGION')
  if (!key || !region) return json({ error: 'Chaves do Azure não configuradas' }, 500)

  let body: Body
  try {
    body = await req.json()
  } catch {
    return json({ error: 'JSON inválido' }, 400)
  }
  if (!body.audioBase64 || !body.referenceText) {
    return json({ error: 'audioBase64 e referenceText são obrigatórios' }, 400)
  }

  const assessmentParams = btoa(
    JSON.stringify({
      ReferenceText: body.referenceText,
      GradingSystem: 'HundredMark',
      Granularity: 'Word',
      Dimension: 'Comprehensive',
      EnableProsodyAssessment: true,
    })
  )

  const url =
    `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`

  try {
    const azureRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
        'Pronunciation-Assessment': assessmentParams,
        Accept: 'application/json',
      },
      body: base64ToBytes(body.audioBase64),
    })

    if (!azureRes.ok) {
      const err = await azureRes.text()
      return json({ error: `Azure ${azureRes.status}: ${err}` }, 502)
    }

    const data = await azureRes.json()
    const nbest = data?.NBest?.[0]
    if (!nbest) {
      return json({ error: 'Não consegui entender o áudio. Tente falar mais perto do microfone.' }, 422)
    }

    const pa = nbest.PronunciationAssessment ?? {}
    const result = {
      accuracyScore: pa.AccuracyScore ?? 0,
      fluencyScore: pa.FluencyScore ?? 0,
      completenessScore: pa.CompletenessScore ?? 0,
      pronunciationScore: pa.PronScore ?? 0,
      prosodyScore: pa.ProsodyScore ?? undefined,
      recognizedText: data?.DisplayText ?? '',
      words: (nbest.Words ?? []).map((w: any) => ({
        word: w.Word,
        accuracyScore: w.PronunciationAssessment?.AccuracyScore ?? 0,
        errorType: w.PronunciationAssessment?.ErrorType,
      })),
    }

    return json(result)
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})
