// Edge Function: CRUD + prática dos exercícios (página "Exercises").
// Conecta direto no Postgres (SUPABASE_DB_URL) e escopa por accountId.
//
// Deploy:  supabase functions deploy exercises
//
// Contrato (POST):
//   { action: 'list',    accountId }                          -> { exercises: [...] }
//   { action: 'create',  accountId, exercises: [...], source } -> { inserted }
//   { action: 'attempt', accountId, exerciseId, userAnswer, isCorrect } -> { ok }
//   { action: 'stats',   accountId }                          -> { total, attempted, accuracy, weakestTopic }
import postgres from 'https://deno.land/x/postgresjs@v3.4.5/mod.js'
import { corsHeaders, json } from '../_shared/cors.ts'

declare const Deno: { env: { get(k: string): string | undefined } }

interface ExerciseInput {
  type: string
  topic?: string | null
  difficulty?: string | null
  question: string
  // deno-lint-ignore no-explicit-any
  options?: any
  correct_answer: string
  explanation?: string | null
}

interface Body {
  action?: 'list' | 'create' | 'attempt' | 'stats'
  accountId?: string
  exercises?: ExerciseInput[]
  source?: string
  exerciseId?: string
  userAnswer?: string
  isCorrect?: boolean
}

const COLS = 'id, type, topic, difficulty, question, options, correct_answer, explanation, source, created_at'

// deno-lint-ignore no-explicit-any
let _sql: any = null
function db(dbUrl: string) {
  if (!_sql) _sql = postgres(dbUrl, { prepare: false })
  return _sql
}

let tableReady = false
// deno-lint-ignore no-explicit-any
async function ensureTables(sql: any): Promise<void> {
  if (tableReady) return
  // Caminho quente: as tabelas já existem → só confere e sai (nada de DDL).
  // Isso evita rodar CREATE/ALTER em toda requisição, que causava deadlock
  // quando duas chamadas concorrentes (ex.: list + stats em paralelo) batiam juntas.
  const [{ exists }] = await sql`
    select (to_regclass('ingles.exercises') is not null) as exists
  `
  if (exists) {
    tableReady = true
    return
  }
  // Banco novo: cria as tabelas UMA vez, serializando com advisory lock pra que
  // chamadas concorrentes não tentem o mesmo DDL ao mesmo tempo (sem deadlock).
  await sql.unsafe(`
    begin;
    select pg_advisory_xact_lock(4823001);
    create schema if not exists ingles;
    create table if not exists ingles.exercises (
      id uuid primary key default gen_random_uuid(),
      type text not null,
      topic text,
      difficulty text,
      question text not null,
      options jsonb,
      correct_answer text not null,
      explanation text,
      source text,
      created_at timestamptz default now(),
      user_id uuid
    );
    create table if not exists ingles.exercise_attempts (
      id uuid primary key default gen_random_uuid(),
      exercise_id uuid references ingles.exercises on delete cascade,
      user_answer text,
      is_correct boolean,
      attempted_at timestamptz default now(),
      user_id uuid
    );
    create index if not exists exercises_user_idx on ingles.exercises(user_id);
    create index if not exists attempts_user_idx on ingles.exercise_attempts(user_id);
    alter table ingles.exercises enable row level security;
    alter table ingles.exercise_attempts enable row level security;
    commit;
  `)
  tableReady = true
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

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
  const action = body?.action ?? 'list'

  const sql = db(dbUrl)
  try {
    await ensureTables(sql)

    if (action === 'list') {
      const rows = await sql`
        select e.${sql.unsafe(COLS.split(', ').join(', e.'))},
               a.is_correct as last_correct, a.attempted_at as last_attempt
        from ingles.exercises e
        left join lateral (
          select is_correct, attempted_at
          from ingles.exercise_attempts
          where exercise_id = e.id and user_id = ${accountId}
          order by attempted_at desc limit 1
        ) a on true
        where e.user_id = ${accountId}
        order by e.created_at desc
      `
      return json({ exercises: rows })
    }

    if (action === 'create') {
      const list = body.exercises ?? []
      if (!list.length) return json({ error: 'exercises vazio' }, 400)
      const source = body.source ?? 'manual'
      let inserted = 0
      for (const e of list) {
        if (!e?.type || !e?.question || !e?.correct_answer) continue
        await sql`
          insert into ingles.exercises
            (type, topic, difficulty, question, options, correct_answer, explanation, source, user_id)
          values (
            ${e.type}, ${e.topic ?? null}, ${e.difficulty ?? null}, ${e.question},
            ${e.options != null ? sql.json(e.options) : null},
            ${e.correct_answer}, ${e.explanation ?? null}, ${source}, ${accountId}
          )
        `
        inserted++
      }
      return json({ inserted })
    }

    if (action === 'attempt') {
      if (!body.exerciseId) return json({ error: 'exerciseId obrigatório' }, 400)
      await sql`
        insert into ingles.exercise_attempts (exercise_id, user_answer, is_correct, user_id)
        values (${body.exerciseId}, ${body.userAnswer ?? null}, ${body.isCorrect ?? null}, ${accountId})
      `
      return json({ ok: true })
    }

    if (action === 'stats') {
      const [{ total }] = await sql`
        select count(*)::int as total from ingles.exercises where user_id = ${accountId}
      `
      const [{ attempted }] = await sql`
        select count(distinct exercise_id)::int as attempted
        from ingles.exercise_attempts where user_id = ${accountId}
      `
      const [acc] = await sql`
        select
          count(*)::int as tries,
          count(*) filter (where is_correct)::int as correct
        from ingles.exercise_attempts where user_id = ${accountId}
      `
      const accuracy = acc.tries > 0 ? Math.round((acc.correct / acc.tries) * 100) : 0
      const weak = await sql`
        select e.topic, count(*)::int as errors
        from ingles.exercise_attempts a
        join ingles.exercises e on e.id = a.exercise_id
        where a.user_id = ${accountId} and a.is_correct = false and e.topic is not null
        group by e.topic
        order by errors desc
        limit 1
      `
      return json({
        total,
        attempted,
        accuracy,
        weakestTopic: weak[0]?.topic ?? null,
      })
    }

    return json({ error: 'ação inválida' }, 400)
  } catch (e) {
    _sql = null
    return json({ error: String(e) }, 500)
  }
})
