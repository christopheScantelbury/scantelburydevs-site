// ─────────────────────────────────────────────────────────────────────────────
// Memória de conversa para o WhatsApp (e qualquer canal stateless).
// Usa Supabase REST (PostgREST) quando configurado; caso contrário cai em um
// Map em memória — suficiente para um lambda quente, mas NÃO persiste entre
// cold starts. Em produção, configure o Supabase (ver SQL em supabase-wa.sql).
// ─────────────────────────────────────────────────────────────────────────────

import type { ChatMessage } from './secretaria'

export interface ConversationState {
  history: ChatMessage[]
  resumo_enviado: boolean
  meta: Record<string, string>
}

const TABLE = 'wa_conversas'
const MAX_HISTORY = 40

function supabaseConfig(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return { url: url.replace(/\/$/, ''), key }
}

// ── Fallback em memória ───────────────────────────────────────────────────────
const memStore = new Map<string, ConversationState>()

function emptyState(): ConversationState {
  return { history: [], resumo_enviado: false, meta: {} }
}

export async function getConversation(phone: string): Promise<ConversationState> {
  const cfg = supabaseConfig()
  if (!cfg) return memStore.get(phone) ?? emptyState()

  try {
    const res = await fetch(
      `${cfg.url}/rest/v1/${TABLE}?phone=eq.${encodeURIComponent(phone)}&select=state&limit=1`,
      {
        headers: {
          apikey: cfg.key,
          Authorization: `Bearer ${cfg.key}`,
        },
      }
    )
    if (!res.ok) return emptyState()
    const rows = (await res.json()) as { state: ConversationState }[]
    return rows[0]?.state ?? emptyState()
  } catch {
    return emptyState()
  }
}

export async function saveConversation(
  phone: string,
  state: ConversationState
): Promise<void> {
  // Mantém histórico enxuto
  if (state.history.length > MAX_HISTORY) {
    state.history = state.history.slice(-MAX_HISTORY)
  }

  const cfg = supabaseConfig()
  if (!cfg) {
    memStore.set(phone, state)
    return
  }

  try {
    await fetch(`${cfg.url}/rest/v1/${TABLE}`, {
      method: 'POST',
      headers: {
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
        'Content-Type': 'application/json',
        // upsert por phone (constraint UNIQUE)
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({ phone, state, updated_at: new Date().toISOString() }),
    })
  } catch {
    // silencioso: não bloqueia o atendimento
  }
}
