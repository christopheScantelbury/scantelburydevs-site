// ─────────────────────────────────────────────────────────────────────────────
// Camada unificada de tracking de conversão.
// Dispara o mesmo evento para Meta Pixel, Google Ads/GA4 e LinkedIn Insight Tag.
// Todos os disparos são tolerantes a falha: se um pixel não estiver carregado
// (env var ausente), aquele canal é simplesmente ignorado — nada quebra.
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    lintrk?: (action: string, data?: Record<string, unknown>) => void
    dataLayer?: unknown[]
  }
}

// IDs/labels expostos ao cliente (NEXT_PUBLIC_*). Vazios = canal desligado.
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const GOOGLE_ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL
const LINKEDIN_LEAD_CONVERSION_ID = process.env.NEXT_PUBLIC_LINKEDIN_LEAD_CONVERSION_ID

export type LeadSource = 'form' | 'whatsapp' | 'chat'

export interface LeadPayload {
  source: LeadSource
  projectType?: string
  lang?: string
}

function fbq(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args)
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args)
  }
}

function lintrk(conversionId?: string) {
  if (!conversionId) return
  if (typeof window !== 'undefined' && typeof window.lintrk === 'function') {
    window.lintrk('track', { conversion_id: Number(conversionId) })
  }
}

/**
 * Conversão principal: lead qualificado (submit do formulário de diagnóstico).
 * Este é o evento que as campanhas devem otimizar.
 */
export function trackLead(payload: LeadPayload) {
  // Meta Pixel — evento padrão "Lead"
  fbq('track', 'Lead', {
    content_category: payload.projectType,
    content_name: payload.source,
  })

  // GA4 — evento recomendado "generate_lead"
  gtag('event', 'generate_lead', {
    source: payload.source,
    project_type: payload.projectType,
    language: payload.lang,
  })

  // Google Ads — conversão dedicada (precisa do label da conta de Ads)
  if (GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_LABEL) {
    gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
    })
  }

  // LinkedIn — conversão por ID numérico
  lintrk(LINKEDIN_LEAD_CONVERSION_ID)
}

/**
 * Contato direto (clique no WhatsApp, e-mail ou LinkedIn).
 * Sinal mais fraco que Lead, mas útil para públicos de remarketing.
 */
export function trackContact(method: string) {
  fbq('track', 'Contact', { content_name: method })
  gtag('event', 'contact', { method })
}

/** Abertura do chat com a assistente — micro-conversão / intenção. */
export function trackChatOpen() {
  fbq('trackCustom', 'ChatOpen')
  gtag('event', 'chat_open')
}
