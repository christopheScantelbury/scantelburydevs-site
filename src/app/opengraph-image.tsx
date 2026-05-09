import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ScantelburyDevs — Software que funciona. Time que entrega.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 88px',
          background:
            'radial-gradient(ellipse at top right, rgba(0,212,255,0.18) 0%, transparent 55%), linear-gradient(135deg, #0A0F1E 0%, #111827 100%)',
          color: '#F0F4FA',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Top: brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 14,
              background: 'rgba(0,212,255,0.10)',
              border: '1px solid rgba(0,212,255,0.30)',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 72 72" fill="none">
              <path d="M36 12L58 24V48L36 60L14 48V24L36 12Z" fill="#0A0F1E" stroke="#00D4FF" strokeWidth="2" />
              <rect x="22" y="24" width="20" height="4" rx="2" fill="#00D4FF" />
              <rect x="30" y="33" width="20" height="4" rx="2" fill="#00D4FF" />
              <rect x="22" y="42" width="20" height="4" rx="2" fill="#00D4FF" />
            </svg>
          </div>
          <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' }}>
            <span style={{ color: '#F0F4FA' }}>Scantelbury</span>
            <span style={{ color: '#00D4FF' }}>Devs</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ color: '#F0F4FA' }}>Software que funciona.</span>
            <span style={{ color: '#00D4FF' }}>Time que entrega.</span>
          </div>
          <div style={{ fontSize: 26, color: '#8AA0B8', lineHeight: 1.4, maxWidth: 920 }}>
            Desenvolvimento, migração e soluções customizadas. 4 produtos em produção.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 28,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            fontFamily: 'monospace',
            fontSize: 18,
            color: '#8B9DB7',
            letterSpacing: '0.08em',
          }}
        >
          <span>SCANTELBURYDEVS.COM.BR</span>
          <span>BLUMENAU · SC · BR</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
