// ─────────────────────────────────────────────────────────────────────────────
// Registro do lead qualificado: grava no Google Sheets e notifica o Christophe
// por e-mail com o resumo comercial estruturado. Tudo fire-and-forget seguro.
// ─────────────────────────────────────────────────────────────────────────────

import { Resend } from 'resend'
import type { ResumoLead } from './secretaria'
import { salvarLeadSheets } from './sheets'

const NIVEL_COR: Record<string, string> = {
  quente: '#FF3232',
  morno: '#F0B414',
  frio: '#6473A0',
}

function esc(s: string): string {
  return (s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function resumoHtml(lead: ResumoLead, transcript: string): string {
  const cor = NIVEL_COR[lead.nivel] ?? '#00D4FF'
  const linha = (label: string, valor: string) =>
    `<tr><td style="padding:6px 12px;color:#888;font-size:13px;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#222;font-size:13px">${esc(valor) || '—'}</td></tr>`

  return `
  <div style="font-family:sans-serif;max-width:640px;margin:0 auto">
    <h2 style="color:#fff;background:#0A0F1E;padding:16px 20px;border-radius:8px 8px 0 0;margin:0">
      🔔 Novo lead <span style="background:${cor};padding:2px 10px;border-radius:99px;font-size:14px;text-transform:uppercase">${lead.nivel}</span> — ScantelburyDevs
    </h2>
    <div style="background:#f9f9f9;padding:16px 8px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
      <table style="width:100%;border-collapse:collapse">
        ${linha('Nome', lead.nome)}
        ${linha('Empresa', lead.empresa)}
        ${linha('Segmento', lead.segmento)}
        ${linha('Cargo', lead.cargo)}
        ${linha('Contato', lead.contato)}
        ${linha('Origem', lead.origem)}
        ${linha('Dor principal', lead.dor_principal)}
        ${linha('Processo atual', lead.processo_atual)}
        ${linha('Impacto', lead.impacto)}
        ${linha('Solução provável', lead.solucao_provavel)}
        ${linha('Urgência', lead.urgencia)}
        ${linha('Orçamento', lead.orcamento)}
        ${linha('Objeções', lead.objecoes)}
        ${linha('Call agendada', lead.call_agendada ? 'SIM' : 'não')}
        ${linha('Data/horário', lead.data_horario)}
        ${linha('Próximo passo', lead.proximo_passo)}
      </table>
      <div style="padding:12px">
        <p style="font-size:13px;color:#333;margin:0 0 6px"><strong>Resumo:</strong></p>
        <p style="font-size:13px;color:#444;line-height:1.6;margin:0">${esc(lead.resumo)}</p>
      </div>
      ${
        transcript
          ? `<details style="padding:0 12px"><summary style="cursor:pointer;font-size:13px;color:#0A66C2">Ver transcrição completa</summary>
        <pre style="background:#fff;border:1px solid #ddd;border-radius:4px;padding:12px;white-space:pre-wrap;font-size:12px;line-height:1.6">${esc(transcript)}</pre></details>`
          : ''
      }
      <p style="font-size:11px;color:#aaa;padding:8px 12px;margin:0">Enviado automaticamente pela assistente comercial · scantelburydevs.com.br</p>
    </div>
  </div>`
}

async function enviarEmail(lead: ResumoLead, transcript: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'ScantelburyDevs Leads <onboarding@resend.dev>',
      to: ['christophescantelbury@gmail.com'],
      subject: `🔔 Lead ${lead.nivel.toUpperCase()} — ${lead.empresa !== 'não informado' ? lead.empresa : lead.nome}`,
      html: resumoHtml(lead, transcript),
    })
    return true
  } catch {
    return false
  }
}

/**
 * Registra o lead nos destinos configurados (Sheets + e-mail).
 * Nunca lança — pensado para ser chamado com .catch(()=>{}) ou await seguro.
 */
export async function registrarLead(
  lead: ResumoLead,
  transcript = ''
): Promise<{ sheets: boolean; email: boolean }> {
  const [sheets, email] = await Promise.all([
    salvarLeadSheets(lead),
    enviarEmail(lead, transcript),
  ])
  return { sheets, email }
}
