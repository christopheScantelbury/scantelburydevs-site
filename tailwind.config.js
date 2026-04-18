/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // ── BRAND TOKENS ──────────────────────────────────
      colors: {
        navy: {
          DEFAULT: '#0A0F1E',
          mid:     '#111827',
          card:    '#0F1929',   // auditoria: superfície de cards
          border:  '#1A2235',   // auditoria: bordas sutis, inputs
          hover:   '#243044',   // auditoria: hover states
        },
        cyan: {
          DEFAULT: '#00D4FF',
          dark:    '#0088CC',
          glow:    'rgba(0,212,255,0.12)',
        },
        steel: {
          DEFAULT: '#8B9DB7',
          light:   '#C4D2E6',
          muted:   '#8899AA',   // auditoria: body text em dark mode
        },
        offwhite: '#F0F4FA',
      },
      // ── TYPOGRAPHY ────────────────────────────────────
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
        sans:    ['Inter', 'sans-serif'],
      },
      fontWeight: {
        display: '800',
      },
      letterSpacing: {
        tag:      '0.22em',
        mono:     '0.08em',
        display:  '-0.02em',  // auditoria: tracking negativo para Syne 800
      },
      lineHeight: {
        display:  '1.05',   // auditoria: h1
        heading:  '1.15',   // auditoria: h2
      },
      // ── BORDER ────────────────────────────────────────
      borderColor: {
        brand:  'rgba(0,212,255,0.12)',
        soft:   'rgba(255,255,255,0.06)',
        medium: 'rgba(0,212,255,0.3)',
      },
      // ── BACKGROUND ────────────────────────────────────
      backgroundImage: {
        'grid-brand': `
          linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)
        `,
        'glow-cyan': 'radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)',
        'gradient-accent': 'linear-gradient(90deg, #00D4FF, #0088CC)',
      },
      backgroundSize: {
        'grid': '48px 48px',
      },
      // ── SPACING ───────────────────────────────────────
      minHeight: {
        touch: '44px',  // auditoria: WCAG 2.5.5 touch target
      },
      minWidth: {
        touch: '44px',
      },
      // ── ANIMATION ─────────────────────────────────────
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.4' },
          '50%':     { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
