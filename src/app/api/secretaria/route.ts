import { NextRequest, NextResponse } from 'next/server'
import { gerarResposta, extrairResumoLead, type ChatMessage } from '@/lib/secretaria'
import { registrarLead } from '@/lib/lead-notify'

export const runtime = 'nodejs'

// Detecta o momento em que a secretária conduziu para o próximo passo
// (agendar com Christophe, ou encerrar orientando lead sem fit).
const FECHAMENTO = /(christophe|agend|hor[áa]rio|melhor.{0,6}(per[íi]odo|dia)|conversa gratuita|diagn[óo]stico gratuito|voltar a conversar)/i

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Atendimento indisponível no momento.' }, { status: 503 })
  }

  let body: { messages?: ChatMessage[]; origem?: string; resumoEnviado?: boolean }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 })
  }

  const messages = (body.messages ?? []).filter(
    m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
  )
  if (messages.length === 0) {
    return NextResponse.json({ error: 'Sem mensagens.' }, { status: 400 })
  }

  const origem = body.origem || 'landing page'

  let reply: string
  try {
    reply = await gerarResposta(messages, {
      contexto: `Canal: chat no site. Origem provável: ${origem}.`,
    })
  } catch {
    return NextResponse.json({ error: 'Erro ao processar sua mensagem.' }, { status: 500 })
  }

  const fullHistory: ChatMessage[] = [...messages, { role: 'assistant', content: reply }]
  const userTurns = fullHistory.filter(m => m.role === 'user').length

  // Gera + registra o resumo uma única vez, quando a conversa amadurece e a
  // secretária conduz para o próximo passo. O cliente devolve resumoEnviado=true
  // nas próximas requisições para não duplicar.
  let resumoEnviado = Boolean(body.resumoEnviado)
  if (!resumoEnviado && userTurns >= 3 && FECHAMENTO.test(reply)) {
    try {
      const resumo = await extrairResumoLead(fullHistory, { origem })
      if (resumo) {
        const transcript = fullHistory
          .map(m => `${m.role === 'user' ? 'Cliente' : 'Secretária'}: ${m.content}`)
          .join('\n')
        await registrarLead(resumo, transcript)
        resumoEnviado = true
      }
    } catch {
      // não bloqueia a resposta ao usuário
    }
  }

  return NextResponse.json({ reply, resumoEnviado })
}
