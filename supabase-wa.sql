-- ─────────────────────────────────────────────────────────────────────────────
-- Memória de conversa do WhatsApp para a secretária comercial.
-- Rodar no SQL Editor do Supabase (uma vez).
-- A API acessa via service role key (bypassa RLS), então deixamos RLS ligado
-- sem policies públicas — apenas o backend lê/escreve.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.wa_conversas (
  phone       text primary key,
  state       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

alter table public.wa_conversas enable row level security;

-- Sem policies = nenhum acesso anônimo/autenticado. Apenas service_role entra.

-- Índice por data, útil para limpeza de conversas antigas:
create index if not exists wa_conversas_updated_idx
  on public.wa_conversas (updated_at);
