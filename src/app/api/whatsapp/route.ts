import { NextRequest, NextResponse } from 'next/server'
import { gerarResposta, extrairResumoLead, type ChatMessage } from '@/lib/secretaria'
import { registrarLead } from '@/lib/lead-notify'
import { getConversation, saveConversation } from '@/lib/conversation-store'

export const runtime = 'nodejs'

const GRAPH_URL = 'https://graph.facebook.com/v21.0'
const FECHAMENTO = /(christophe|agend|hor[áa]rio|melhor.{0,6}(per[íi]odo|dia)|conversa gratuita|diagn[óo]stico gratuito|voltar a conversar)/i

// ─── GET: verificação do webhook (handshake da Meta) ──────────────────────────
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
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

  // Responde 200 rápido para a Meta não reenfileirar. Processa antes de retornar
  // (lambdas curtos); se o volume crescer, mover para fila.
  try {
    await processarPayload(payload)
  } catch (err) {
    console.error('[wa] erro no processamento:', err instanceof Error ? err.message : err)
  }

  return NextResponse.json({ ok: true })
}

async function processarPayload(payload: WhatsAppWebhookPayload) {
  const value = payload?.entry?.[0]?.changes?.[0]?.value

  // Eventos de status de entrega (sent/delivered/read/failed). Loga falhas para
  // operação (ex.: 130497 = conta não verificada / restrita por país).
  const status = value?.statuses?.[0]
  if (status) {
    if (status.status === 'failed') {
      const e = status.errors?.[0]
      console.error('[wa] entrega falhou', e?.code, e?.title)
    }
    return
  }

  const message = value?.messages?.[0]
  if (!message || message.type !== 'text') return

  const from = message.from // wa_id do cliente (forma canônica do WhatsApp)
  const texto = message.text?.body?.trim()
  if (!from || !texto) return

  const phoneNumberId = value?.metadata?.phone_number_id
  const nomeContato = value?.contacts?.[0]?.profile?.name

  const state = await getConversation(from)
  state.history.push({ role: 'user', content: texto })
  if (nomeContato && !state.meta.nome) state.meta.nome = nomeContato

  const reply = await gerarResposta(state.history, {
    contexto: `Canal: WhatsApp. Origem provável: Google Ads / landing page. ${
      state.meta.nome ? `Nome no WhatsApp: ${state.meta.nome}.` : ''
    }`,
  })

  state.history.push({ role: 'assistant', content: reply })

  await enviarWhatsApp(phoneNumberId, from, reply)

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

async function enviarWhatsApp(phoneNumberId: string | undefined, to: string, text: string) {
  const token = process.env.WHATSAPP_TOKEN
  const pnId = phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!token || !pnId) return

  // Responde ao wa_id exato recebido no webhook (a Meta entrega à forma canônica).
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
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('[wa] envio falhou', res.status, body.slice(0, 300))
  }
}

// ─── Tipos mínimos do payload do WhatsApp Cloud API ───────────────────────────
interface WhatsAppWebhookPayload {
  entry?: {
    changes?: {
      value?: {
        metadata?: { phone_number_id?: string }
        contacts?: { profile?: { name?: string }; wa_id?: string }[]
        messages?: {
          from?: string
          type?: string
          text?: { body?: string }
        }[]
        statuses?: {
          status?: string
          recipient_id?: string
          errors?: { code?: number; title?: string }[]
        }[]
      }
    }[]
  }[]
}
