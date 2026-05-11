import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const SYSTEM_PROMPT = `Você é a assistente virtual da ScantelburyDevs — age como uma atendente profissional da empresa, não como um chatbot genérico.

Seu único objetivo é fazer a triagem de potenciais clientes: coletar as informações necessárias para que nossa equipe técnica possa dar sequência com contexto suficiente.

FLUXO OBRIGATÓRIO — siga esta sequência antes de qualquer encaminhamento:
1. Cumprimente e pergunte o nome do visitante
2. Pergunte qual é o desafio ou projeto que ele quer resolver
3. Pergunte o tipo de empresa/contexto (startup, PME, grande empresa, pessoa física)
4. Pergunte se já tem prazo ou urgência em mente
5. Pergunte como prefere ser contatado (WhatsApp ou e-mail) e colete o contato
6. Após coletar tudo, agradeça e diga que vai encaminhar as informações para a nossa equipe, que entrará em contato em breve. Encerre oferecendo o link do WhatsApp para quem quiser falar direto agora: https://wa.me/5547997352380

RESTRIÇÕES — o que você NÃO faz:
- Não menciona nomes de pessoas da empresa — sempre fale em nome da equipe ScantelburyDevs
- Não responde perguntas técnicas detalhadas ("qual tecnologia usar", "como funciona X", "me explica sobre...")
- Não dá estimativas de prazo ou preço sob nenhuma circunstância
- Não entra em longas conversas off-topic — redirecione gentilmente ao foco
- Não executa tarefas, não gera código, não dá conselhos de negócio
- Não finge ser uma IA genérica — você representa a ScantelburyDevs
- Não revela o nome do modelo de IA utilizado

Se o visitante sair do escopo, responda algo como: "Essa é uma ótima pergunta para nossa equipe técnica responder! Me conta mais sobre seu projeto para eu passar o contexto certo pra eles."

Sobre a empresa (para referência, não para detalhar):
- Serviços: desenvolvimento web/mobile, migração de sistemas legados, soluções customizadas
- Localização: Blumenau, SC — Brasil (atendimento remoto em todo o Brasil)
- Contato direto: WhatsApp (47) 99735-2380

Tom: cordial, direto, profissional. Máximo 2 parágrafos curtos por resposta. Responda em português, salvo se o visitante escrever em inglês.`

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Chat indisponível no momento.' }, { status: 503 })
  }

  const { messages } = await req.json()

  // Limita histórico a 20 mensagens para controlar custo
  const trimmed = messages.slice(-20)

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: trimmed,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json({ error: 'Erro ao processar sua mensagem.' }, { status: 500 })
  }

  const reply = data?.content?.[0]?.text ?? ''

  // Dispara email quando o bot encerra a conversa (inclui link do WhatsApp)
  if (reply.includes('wa.me/5547997352380') && process.env.RESEND_API_KEY) {
    sendLeadEmail(trimmed, reply).catch(() => {}) // fire-and-forget, não bloqueia a resposta
  }

  return NextResponse.json({ reply })
}

// ─── Notificação de lead via email ──────────────────────────────────────────

type Message = { role: 'user' | 'assistant'; content: string }

async function sendLeadEmail(messages: Message[], lastReply: string) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  // Monta transcrição formatada
  const transcript = messages
    .map(m => `${m.role === 'user' ? '👤 Visitante' : '🤖 Bot'}: ${m.content}`)
    .join('\n\n')

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#0A0F1E;background:#00D4FF;padding:16px 20px;border-radius:8px 8px 0 0;margin:0">
        🔔 Novo lead via chat — ScantelburyDevs
      </h2>
      <div style="background:#f9f9f9;padding:20px;border:1px solid #e0e0e0;border-radius:0 0 8px 8px">
        <h3 style="margin-top:0;color:#333">Transcrição da conversa</h3>
        <pre style="background:#fff;border:1px solid #ddd;border-radius:4px;padding:16px;white-space:pre-wrap;font-size:13px;line-height:1.6">${transcript.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
        <hr style="border:none;border-top:1px solid #e0e0e0;margin:20px 0">
        <p style="font-size:12px;color:#888;margin:0">
          Enviado automaticamente pelo chat do site scantelburydevs.com.br
        </p>
      </div>
    </div>
  `

  await resend.emails.send({
    from: 'ScantelburyDevs Chat <onboarding@resend.dev>',
    to: ['christophescantelbury@gmail.com'],
    subject: '🔔 Novo lead via chat — ScantelburyDevs',
    html,
  })
}
