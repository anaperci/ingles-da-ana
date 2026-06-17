-- Tabela de notas (página "Notes" — estilo Evernote simples).
-- Schema `ingles`, projeto único Supabase (ydnwqptkrftonunyjzoc).
-- Acesso só via Edge Function `notes` (conexão direta no Postgres, ignora RLS).
-- RLS habilitado SEM policies permissivas = defesa em profundidade (PostgREST/anon
-- não conseguem ler nem escrever). App não tem auth: user_id é a conta fixa 'ana'.

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
-- sem policies: ninguém acessa via API pública; só a Edge Function (service/DB url).
