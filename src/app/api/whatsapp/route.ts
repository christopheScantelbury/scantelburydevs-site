import { NextRequest, NextResponse } from 'next/server'
import { gerarResposta, extrairResumoLead, type ChatMessage } from '@/lib/secretaria'
import { registrarLead } from '@/lib/lead-notify'
import { getConversation, saveConversation } from '@/lib/conversation-store'

export const runtime = 'nodejs'

const GRAPH_URL = 'https://graph.facebook.com/v21.0'
const FECHAMENTO = /(christophe|agend|hor[áa]rio|melhor.{0,6}(per[íi]odo|dia)|conversa gratuita|diagn[óo]stico gratuito|voltar a conversar)/i

// debug temporário: guarda o último payload recebido em memória
let lastRaw = ''

// ─── GET: verificação do webhook (handshake da Meta) ──────────────────────────
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams

  if (params.get('debug') === 'scdevs-x9') {
    return new NextResponse(lastRaw || 'sem payload ainda', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const mode = params.get('hub.mode')
  const token = params.get('hub.verify_token')
  const challenge = params.get('hub.challenge')

  if (mode === 'subscribe' && token && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge ?? '', { status: 200 })
  }
  return new NextResponse('Forbidden', { status: 403 })
}

// ─── POST: mensagens recebidas ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let payload: WhatsAppWebhookPayload
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ ok: true })
  }

  // Sempre responde 200 rápido para a Meta não reenfileirar.
  // O processamento é feito antes de retornar (lambdas curtos); se crescer,
  // mover para fila.
  try {
    await processarPayload(payload)
  } catch (err) {
    console.error('[wa] erro no processamento:', err instanceof Error ? err.message : err)
  }

  return NextResponse.json({ ok: true })
}

async function processarPayload(payload: WhatsAppWebhookPayload) {
  lastRaw = JSON.stringify(payload)
  const value = payload?.entry?.[0]?.changes?.[0]?.value
  const message = value?.messages?.[0]
  const hasStatus = Boolean((value as { statuses?: unknown[] })?.statuses)
  if (!message || message.type !== 'text') {
    console.log('[wa]skip=' + (message?.type ?? (hasStatus ? 'status' : 'none')))
    return
  }

  const from = message.from // telefone do cliente (E.164 sem +)
  const texto = message.text?.body?.trim()
  if (!from || !texto) { console.log('[wa]skip=empty'); return }

  const phoneNumberId = value?.metadata?.phone_number_id
  const nomeContato = value?.contacts?.[0]?.profile?.name

  const state = await getConversation(from)
  state.history.push({ role: 'user', content: texto })
  if (nomeContato && !state.meta.nome) state.meta.nome = nomeContato

  let reply: string
  try {
    reply = await gerarResposta(state.history, {
      contexto: `Canal: WhatsApp. Origem provável: Google Ads / landing page. ${
        state.meta.nome ? `Nome no WhatsApp: ${state.meta.nome}.` : ''
      }`,
    })
  } catch (e) {
    console.error('[wa]IA-ERR:' + (e instanceof Error ? e.message.slice(0, 120) : 'x'))
    return
  }

  state.history.push({ role: 'assistant', content: reply })

  const envio = await enviarWhatsApp(phoneNumberId, from, reply)
  console.log('[wa]S=' + envio.status + ':' + envio.code)

  // Resumo uma única vez, ao conduzir para o próximo passo
  const userTurns = state.history.filter(m => m.role === 'user').length
  if (!state.resumo_enviado && userTurns >= 3 && FECHAMENTO.test(reply)) {
    const resumo = await extrairResumoLead(state.history, {
      origem: 'WhatsApp (Google Ads / landing page)',
      contato: `+${from}`,
    })
    if (resumo) {
      const transcript = state.history
        .map(m => `${m.role === 'user' ? 'Cliente' : 'Secretária'}: ${m.content}`)
        .join('\n')
      await registrarLead(resumo, transcript)
      state.resumo_enviado = true
    }
  }

  await saveConversation(from, state)
}

async function enviarWhatsApp(
  phoneNumberId: string | undefined,
  to: string,
  text: string
): Promise<{ status: number; code: string }> {
  const token = process.env.WHATSAPP_TOKEN
  const pnId = phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!token || !pnId) return { status: 0, code: 'no-env' }

  const res = await fetch(`${GRAPH_URL}/${pnId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    }),
  })
  if (res.ok) return { status: res.status, code: 'ok' }

  const body = await res.json().catch(() => null)
  const err = (body as { error?: { code?: number; error_subcode?: number } } | null)?.error
  const code = `${err?.code ?? 'x'}/${err?.error_subcode ?? '0'}`
  // primeiro log = código curto (cabe na tabela); segundo = corpo completo
  console.error('[wa]C=' + res.status + '|' + code)
  lastRaw = JSON.stringify(body)
  return { status: res.status, code }
}

// ─── Tipos mínimos do payload do WhatsApp Cloud API ───────────────────────────
interface WhatsAppWebhookPayload {
  entry?: {
    changes?: {
      value?: {
        metadata?: { phone_number_id?: string }
        contacts?: { profile?: { name?: string } }[]
        messages?: {
          from?: string
          type?: string
          text?: { body?: string }
        }[]
      }
    }[]
  }[]
}
