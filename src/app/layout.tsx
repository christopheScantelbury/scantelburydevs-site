import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'ScantelburyDevs — Build · Migrate · Innovate',
  description: 'Desenvolvimento de aplicações, migração de sistemas e soluções customizadas. Blumenau, SC.',
  keywords: ['desenvolvimento de software', 'migração de sistemas', 'soluções customizadas', 'Blumenau', 'Santa Catarina'],
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    title: 'ScantelburyDevs',
    description: 'Software que funciona. Time que entrega.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
