-- Inglês da Ana — schema inicial
-- Banco: projeto único do Supabase. Schema dedicado: ingles.
-- Idempotente: pode rodar várias vezes. Rode tudo de uma vez (transação única).

begin;

create schema if not exists ingles;

-- Sincronização de progresso entre dispositivos (opcional).
-- Guarda um snapshot do estado local (sessões + SRS) por dispositivo/usuária.
create table if not exists ingles.progress (
  id          uuid primary key default gen_random_uuid(),
  device_id   text not null unique,
  payload     jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

create index if not exists progress_device_idx on ingles.progress (device_id);

-- RLS habilitado SEM policies permissivas: ninguém acessa direto com a anon key.
-- O acesso acontece só via Edge Function usando a service_role (defesa em profundidade).
alter table ingles.progress enable row level security;

commit;
