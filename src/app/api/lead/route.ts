import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Captura confiável do lead do formulário de diagnóstico.
// Roda server-side: grava o lead via e-mail (Resend) INDEPENDENTE de o
// WhatsApp abrir no cliente. É a rede de segurança contra lead perdido.

type LeadInput = {
  name?: string
  email?: string
  type?: string
  message?: string
  lang?: string
  source?: string
}

function esc(s: string) {
  return s.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function POST(req: NextRequest) {
  let body: LeadInput
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 })
  }

  const name = (body.name || 'Visitante').toString().slice(0, 120)
  const email = (body.email || '').toString().slice(0, 160)
  const type = (body.type || 'Não informado').toString().slice(0, 120)
  const message = (body.message || '').toString().slice(0, 4000)
  const lang = (body.lang || 'pt').toString().slice(0, 5)
  const source = (body.source || 'form').toString().slice(0, 40)

  // Sem Resend configurado: não falha o fluxo do cliente, só não notifica.
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, notified: false })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#0A0F1E;background:#00D4FF;padding:16px 20px;border-radius:8px 8px 0 0;margin:0">
        🎯 Novo lead via formulário — ScantelburyDevs
      </h2>
      <div style="background:#f9f9f9;padding:20px;border:1px solid #e0e0e0;border-radius:0 0 8px 8px">
        <table style="width:100%;font-size:14px;line-height:1.7;color:#333">
          <tr><td style="font-weight:600;width:130px">Nome</td><td>${esc(name)}</td></tr>
          <tr><td style="font-weight:600">E-mail</td><td>${esc(email) || '—'}</td></tr>
          <tr><td style="font-weight:600">Tipo de projeto</td><td>${esc(type)}</td></tr>
          <tr><td style="font-weight:600">Idioma</td><td>${esc(lang)}</td></tr>
          <tr><td style="font-weight:600">Origem</td><td>${esc(source)}</td></tr>
        </table>
        <h3 style="margin:18px 0 6px;color:#333">Mensagem</h3>
        <pre style="background:#fff;border:1px solid #ddd;border-radius:4px;padding:16px;white-space:pre-wrap;font-size:13px;line-height:1.6">${esc(message) || '(sem mensagem)'}</pre>
        <hr style="border:none;border-top:1px solid #e0e0e0;margin:20px 0">
        <p style="font-size:12px;color:#888;margin:0">
          Enviado automaticamente pelo formulário do site scantelburydevs.com.br
        </p>
      </div>
    </div>
  `

  try {
    await resend.emails.send({
      from: 'ScantelburyDevs Site <onboarding@resend.dev>',
      to: ['christophescantelbury@gmail.com'],
      replyTo: email || undefined,
      subject: `🎯 Novo lead (${type}) — ${name}`,
      html,
    })
  } catch {
    return NextResponse.json({ ok: false, notified: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true, notified: true })
}
