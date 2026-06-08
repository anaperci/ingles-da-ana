// Edge Function: proxy da YouTube Data API v3 (sugestão de vídeo do dia).
// Secret: supabase secrets set YOUTUBE_API_KEY=...
// Deploy: supabase functions deploy daily-video
import { corsHeaders, json } from '../_shared/cors.ts'

declare const Deno: { env: { get(k: string): string | undefined } }

interface Body {
  queries: string[]
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const key = Deno.env.get('YOUTUBE_API_KEY')
  if (!key) return json({ error: 'YOUTUBE_API_KEY não configurada' }, 500)

  let body: Body
  try {
    body = await req.json()
  } catch {
    return json({ error: 'JSON inválido' }, 400)
  }

  const queries = body.queries?.length ? body.queries : ['learn english']
  const query = queries[Math.floor(Math.random() * queries.length)]

  const url = new URL('https://www.googleapis.com/youtube/v3/search')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('q', query)
  url.searchParams.set('type', 'video')
  url.searchParams.set('videoEmbeddable', 'true')
  url.searchParams.set('relevanceLanguage', 'en')
  url.searchParams.set('maxResults', '15')
  url.searchParams.set('key', key)

  try {
    const res = await fetch(url.toString())
    if (!res.ok) {
      const err = await res.text()
      return json({ error: `YouTube ${res.status}: ${err}` }, 502)
    }
    const data = await res.json()
    const items = (data.items ?? []).filter((i: any) => i.id?.videoId)
    if (!items.length) return json({ error: 'Nenhum vídeo encontrado' }, 404)

    const pick = items[Math.floor(Math.random() * items.length)]
    const sn = pick.snippet
    return json({
      video: {
        videoId: pick.id.videoId,
        title: sn.title,
        channel: sn.channelTitle,
        description: sn.description,
        thumbnail:
          sn.thumbnails?.high?.url ??
          sn.thumbnails?.medium?.url ??
          sn.thumbnails?.default?.url,
      },
    })
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})
