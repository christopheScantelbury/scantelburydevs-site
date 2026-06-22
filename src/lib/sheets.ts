// ─────────────────────────────────────────────────────────────────────────────
// Google Sheets — registra cada lead qualificado como uma linha.
// Autentica via Service Account (JWT RS256 → OAuth access token), sem
// dependências externas (usa o módulo `crypto` nativo do Node).
//
// Env necessárias (no-op se ausentes):
//   GOOGLE_SA_EMAIL        e-mail da service account
//   GOOGLE_SA_PRIVATE_KEY  private key (PEM; \n escapados são tratados)
//   GOOGLE_SHEETS_ID       id da planilha
//   GOOGLE_SHEETS_ABA      (opcional) nome da aba; padrão "Leads"
//
// Runtime: Node (não Edge) — depende de `crypto`.
// ─────────────────────────────────────────────────────────────────────────────

import crypto from 'crypto'
import type { ResumoLead } from './secretaria'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets'

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function config() {
  const email = process.env.GOOGLE_SA_EMAIL
  const rawKey = process.env.GOOGLE_SA_PRIVATE_KEY
  const sheetId = process.env.GOOGLE_SHEETS_ID
  if (!email || !rawKey || !sheetId) return null
  return {
    email,
    privateKey: rawKey.replace(/\\n/g, '\n'),
    sheetId,
    aba: process.env.GOOGLE_SHEETS_ABA || 'Leads',
  }
}

async function getAccessToken(email: string, privateKey: string): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000)
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = b64url(
    JSON.stringify({
      iss: email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  )
  const signingInput = `${header}.${claims}`
  const signature = crypto.sign('RSA-SHA256', Buffer.from(signingInput), privateKey)
  const jwt = `${signingInput}.${b64url(signature)}`

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.access_token ?? null
}

/**
 * Acrescenta o lead à planilha. Retorna true em sucesso, false se não
 * configurado ou em erro (sem lançar — não deve quebrar o atendimento).
 */
export async function salvarLeadSheets(lead: ResumoLead): Promise<boolean> {
  const cfg = config()
  if (!cfg) return false

  try {
    const token = await getAccessToken(cfg.email, cfg.privateKey)
    if (!token) return false

    const linha = [
      new Date().toISOString(),
      lead.nivel,
      lead.nome,
      lead.empresa,
      lead.segmento,
      lead.cargo,
      lead.contato,
      lead.origem,
      lead.dor_principal,
      lead.processo_atual,
      lead.impacto,
      lead.solucao_provavel,
      lead.urgencia,
      lead.orcamento,
      lead.objecoes,
      lead.call_agendada ? 'sim' : 'não',
      lead.data_horario,
      lead.proximo_passo,
      lead.resumo,
    ]

    const range = `${encodeURIComponent(cfg.aba)}!A1`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${cfg.sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [linha] }),
    })
    return res.ok
  } catch {
    return false
  }
}

// Cabeçalho de referência (criar manualmente na primeira linha da aba "Leads"):
export const SHEETS_HEADER = [
  'data',
  'nivel',
  'nome',
  'empresa',
  'segmento',
  'cargo',
  'contato',
  'origem',
  'dor_principal',
  'processo_atual',
  'impacto',
  'solucao_provavel',
  'urgencia',
  'orcamento',
  'objecoes',
  'call_agendada',
  'data_horario',
  'proximo_passo',
  'resumo',
]
