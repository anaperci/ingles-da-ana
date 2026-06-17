// Edge Function: CRUD das notas (página "Notes").
// Conecta direto no Postgres (SUPABASE_DB_URL, auto-injetado) — não depende de o
// schema `ingles` estar exposto no PostgREST, e ignora RLS (acesso controlado aqui).
//
// Deploy:  supabase functions deploy notes
//
// Contrato (POST):
//   { action: 'list',   accountId }                          -> { notes: [...] }
//   { action: 'create', accountId, note: {title,content,tag} } -> { note }
//   { action: 'update', accountId, id, note: {title,content,tag} } -> { note }
//   { action: 'delete', accountId, id }                      -> { ok: true }
import postgres from 'https://deno.land/x/postgresjs@v3.4.5/mod.js'
import { corsHeaders, json } from '../_shared/cors.ts'

declare const Deno: { env: { get(k: string): string | undefined } }

interface NoteInput {
  title?: string
  content?: string
  tag?: string | null
}

interface Body {
  action?: 'list' | 'create' | 'update' | 'delete'
  accountId?: string
  id?: string
  note?: NoteInput
}

const COLS = 'id, title, content, tag, created_at, updated_at'

// Conexão reaproveitada entre invocações (a instância da function persiste quando
// está "quente"): evita o handshake TLS no Postgres a cada request. ~1.5s -> ~0.3s.
// deno-lint-ignore no-explicit-any
let _sql: any = null
function db(dbUrl: string) {
  if (!_sql) _sql = postgres(dbUrl, { prepare: false })
  return _sql
}

// Garante a tabela só UMA vez por instância (idempotente). O banco é IPv6-only,
// então o bootstrap mora aqui — mas não precisa rodar DDL em toda requisição.
let tableReady = false
// deno-lint-ignore no-explicit-any
async function ensureTable(sql: any): Promise<void> {
  if (tableReady) return
  await sql.unsafe(`
    create schema if not exists ingles;
    create table if not exists ingles.notes (
      id         uuid primary key default gen_random_uuid(),
      user_id    text not null default 'ana',
      title      text not null default '',
      content    text not null default '',
      tag        text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
    create index if not exists notes_user_created_idx
      on ingles.notes (user_id, created_at desc);
    alter table ingles.notes enable row level security;
  `)
  tableReady = true
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

  const accountId = (body?.accountId ?? '').toString().trim() || 'ana'
  const action = body?.action ?? 'list'

  const sql = db(dbUrl)
  try {
    await ensureTable(sql)

    if (action === 'list') {
      const rows = await sql`
        select ${sql.unsafe(COLS)} from ingles.notes
        where user_id = ${accountId}
        order by created_at desc
      `
      return json({ notes: rows })
    }

    if (action === 'create') {
      const n = body.note ?? {}
      const rows = await sql`
        insert into ingles.notes (user_id, title, content, tag)
        values (${accountId}, ${n.title ?? ''}, ${n.content ?? ''}, ${n.tag ?? null})
        returning ${sql.unsafe(COLS)}
      `
      return json({ note: rows[0] })
    }

    if (action === 'update') {
      if (!body.id) return json({ error: 'id obrigatório' }, 400)
      const n = body.note ?? {}
      const rows = await sql`
        update ingles.notes set
          title = ${n.title ?? ''},
          content = ${n.content ?? ''},
          tag = ${n.tag ?? null},
          updated_at = now()
        where id = ${body.id} and user_id = ${accountId}
        returning ${sql.unsafe(COLS)}
      `
      if (!rows[0]) return json({ error: 'nota não encontrada' }, 404)
      return json({ note: rows[0] })
    }

    if (action === 'delete') {
      if (!body.id) return json({ error: 'id obrigatório' }, 400)
      await sql`delete from ingles.notes where id = ${body.id} and user_id = ${accountId}`
      return json({ ok: true })
    }

    return json({ error: 'ação inválida' }, 400)
  } catch (e) {
    // se a conexão caiu, descarta pra reconectar na próxima
    _sql = null
    return json({ error: String(e) }, 500)
  }
})
