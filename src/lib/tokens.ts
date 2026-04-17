/**
 * ScantelburyDevs — Design Tokens
 * Use these in JS/TS contexts (canvas, charts, dynamic styles, etc.)
 */

export const tokens = {
  colors: {
    navy:       '#0A0F1E',
    navyMid:    '#111827',
    navyCard:   '#141C2F',
    cyan:       '#00D4FF',
    cyanDark:   '#0088CC',
    cyanGlow:   'rgba(0,212,255,0.12)',
    steel:      '#8B9DB7',
    steelLight: '#C4D2E6',
    offwhite:   '#F0F4FA',
    border:     'rgba(0,212,255,0.12)',
    borderSoft: 'rgba(255,255,255,0.06)',
  },
  fonts: {
    display: "'Syne', sans-serif",
    mono:    "'DM Mono', monospace",
    sans:    "'Inter', sans-serif",
  },
  radius: {
    sm:  '6px',
    md:  '8px',
    lg:  '12px',
    xl:  '16px',
    '2xl': '20px',
  },
} as const

export type ColorToken = keyof typeof tokens.colors
