// Edge Function: sincronização de progresso (cross-device, conta fixa).
// Guarda um snapshot JSON do localStorage por accountId em ingles.progress.
// Conecta direto no Postgres (SUPABASE_DB_URL, auto-injetado) — não depende
// de o schema `ingles` estar exposto no PostgREST.
//
// Deploy:  supabase functions deploy progress
//
// Contrato:
//   POST { accountId }            -> { payload, updated_at }   (carregar)
//   POST { accountId, payload }   -> { ok: true, updated_at }  (salvar)
import postgres from 'https://deno.land/x/postgresjs@v3.4.5/mod.js'
import { corsHeaders, json } from '../_shared/cors.ts'

declare const Deno: { env: { get(k: string): string | undefined } }

interface Body {
  accountId?: string
  payload?: unknown
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const dbUrl = Deno.env.get('SUPABASE_DB_URL')
  if (!dbUrl) return json({ error: 'SUPABASE_DB_URL ausente' }, 500)

  let body: Body
  try {
    body = await req.json()
  } catch {
    return json({ error: 'JSON inválido' }, 400)
  }

  const accountId = (body?.accountId ?? '').toString().trim()
  if (!accountId) return json({ error: 'accountId obrigatório' }, 400)

  const sql = postgres(dbUrl, { prepare: false })
  try {
    if (body.payload !== undefined) {
      const rows = await sql`
        insert into ingles.progress (device_id, payload, updated_at)
        values (${accountId}, ${sql.json(body.payload as object)}, now())
        on conflict (device_id) do update
          set payload = excluded.payload, updated_at = now()
        returning updated_at
      `
      return json({ ok: true, updated_at: rows[0]?.updated_at ?? null })
    }

    const rows = await sql`
      select payload, updated_at from ingles.progress
      where device_id = ${accountId} limit 1
    `
    return json({
      payload: rows[0]?.payload ?? null,
      updated_at: rows[0]?.updated_at ?? null,
    })
  } catch (e) {
    return json({ error: String(e) }, 500)
  } finally {
    await sql.end()
  }
})
