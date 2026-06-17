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

  // À prova de troca: os dois secrets às vezes vêm embaralhados (chave no campo
  // da região, etc.). Detectamos qual é a chave (longa) e qual é a região (código
  // curto tipo "eastus"); se nenhum parecer região, usamos o padrão eastus.
  const raw1 = (Deno.env.get('AZURE_SPEECH_KEY') ?? '').trim()
  const raw2 = (Deno.env.get('AZURE_SPEECH_REGION') ?? '').trim()
  const looksLikeKey = (s: string) => s.length > 24
  const looksLikeRegion = (s: string) =>
    /^[a-z][a-z0-9]*$/.test(s) && s.length <= 24

  let key = looksLikeKey(raw1) ? raw1 : looksLikeKey(raw2) ? raw2 : raw1
  // chaves novas da Azure têm 84 chars; 85 = veio com o número "Key 1/2" colado no início
  if (key.length === 85) key = key.slice(1)
  const region =
    looksLikeRegion(raw1) && !looksLikeKey(raw1)
      ? raw1
      : looksLikeRegion(raw2) && !looksLikeKey(raw2)
        ? raw2
        : 'eastus'

  if (!key) return json({ error: 'Chave do Azure não configurada' }, 500)

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

    // A Azure devolve os scores direto no NBest[0] (e nas palavras); algumas
    // versões aninham em PronunciationAssessment. Lemos os dois, nessa ordem.
    const pa = nbest.PronunciationAssessment ?? {}
    const result = {
      accuracyScore: nbest.AccuracyScore ?? pa.AccuracyScore ?? 0,
      fluencyScore: nbest.FluencyScore ?? pa.FluencyScore ?? 0,
      completenessScore: nbest.CompletenessScore ?? pa.CompletenessScore ?? 0,
      pronunciationScore: nbest.PronScore ?? pa.PronScore ?? 0,
      prosodyScore: nbest.ProsodyScore ?? pa.ProsodyScore ?? undefined,
      recognizedText: data?.DisplayText ?? '',
      words: (nbest.Words ?? []).map((w: any) => ({
        word: w.Word,
        accuracyScore: w.AccuracyScore ?? w.PronunciationAssessment?.AccuracyScore ?? 0,
        errorType: w.ErrorType ?? w.PronunciationAssessment?.ErrorType,
      })),
    }

    return json(result)
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})
