import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Você é o assistente virtual da ScantelburyDevs, empresa de tecnologia especializada em desenvolvimento de aplicações, migração de sistemas e soluções customizadas, com sede em Blumenau, SC.

Seu papel é atender potenciais clientes com simpatia, profissionalismo e objetividade. Responda sempre em português, a não ser que o visitante escreva em inglês.

Sobre a empresa:
- Serviços: desenvolvimento de aplicações web/mobile, migração de sistemas legados, soluções customizadas e integrações
- Localização: Blumenau, SC — Brasil
- Contato: WhatsApp (47) 99735-2380
- CNPJ: 44.967.160/0001-80
- Stack: React, Next.js, Go, Node.js, PostgreSQL, AWS, Docker

Diretrizes:
- Seja direto e útil. Sem linguagem corporativa excessiva.
- Quando o cliente demonstrar interesse real, sugira contato via WhatsApp: https://wa.me/5547997352380
- Não invente preços — cada projeto é orçado sob demanda após entender o escopo
- Se a pergunta for muito técnica e específica, redirecione para conversa com a equipe
- Mantenha respostas curtas (máximo 3 parágrafos)
- Você é o assistente da ScantelburyDevs, não mencione que é uma IA de terceiros`

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Chat indisponível no momento.' }, { status: 503 })
  }

  const { messages } = await req.json()

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json({ error: 'Erro ao processar sua mensagem.' }, { status: 500 })
  }

  return NextResponse.json({ reply: data?.content?.[0]?.text ?? '' })
}
