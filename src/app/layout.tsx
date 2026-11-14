import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Pixels } from '@/components/Pixels'
import '@/styles/globals.css'

// ── FONTES (self-hosted via next/font, sem FOUT, sem layout shift) ──
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['300', '400', '500', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
})

const SITE_URL = 'https://www.scantelburydevs.com.br'
const SITE_NAME = 'ScantelburyDevs'
const DEFAULT_TITLE = 'ScantelburyDevs — NFS-e Nacional por API e integração fiscal para empresas de software'
const DEFAULT_DESC =
  'Integração de NFS-e Nacional para o seu sistema via API, com conexão direta à Receita Federal. A ScantelburyDevs, de Blumenau/SC, constrói e opera o NotaFácil e desenvolve sistemas sob medida, migrações e integrações.'

export const viewport: Viewport = {
  themeColor: '#0A0F1E',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s · ScantelburyDevs',
  },
  description: DEFAULT_DESC,
  applicationName: SITE_NAME,
  authors: [{ name: 'ScantelburyDevs', url: SITE_URL }],
  creator: 'ScantelburyDevs',
  publisher: 'Scantelbury Serviços em TI Ltda',
  keywords: [
    'NFS-e Nacional',
    'API NFS-e',
    'integração fiscal',
    'emissão de NFS-e via API',
    'desenvolvimento de software',
    'desenvolvimento web',
    'migração de sistemas',
    'soluções customizadas',
    'integração de sistemas',
    'API REST',
    'Next.js',
    'Go',
    'NotaFácil',
    'NFS-e MEI',
    'NFS-e ME EPP',
    'Agenda Inteligente',
    'Reino do Garcia',
    'Blumenau',
    'Santa Catarina',
    'fábrica de software',
  ],
  category: 'technology',
  // Sem hreflang: o inglês é uma alternância no cliente (?lang=en), não uma URL própria.
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ScantelburyDevs',
  legalName: 'Scantelbury Serviços em TI Ltda',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.svg`,
  email: 'contato@scantelburydevs.com.br',
  telephone: '+55-47-99735-2380',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Blumenau',
    addressRegion: 'SC',
    addressCountry: 'BR',
  },
  taxID: '44.967.160/0001-80',
  foundingDate: '2022',
  description: DEFAULT_DESC,
  sameAs: [
    'https://github.com/christopheScantelbury',
    'https://www.linkedin.com/company/scantelburydevs/',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+55-47-99735-2380',
      contactType: 'customer service',
      availableLanguage: ['Portuguese', 'English'],
      areaServed: 'BR',
    },
  ],
}

const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ['pt-BR', 'en'],
  publisher: { '@id': `${SITE_URL}#organization` },
}

const PRODUCTS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Produtos ScantelburyDevs',
  itemListElement: [
    {
      '@type': 'SoftwareApplication',
      position: 1,
      name: 'NotaFácil',
      description: 'Plataforma e API REST para emissão de NFS-e Nacional, com conexão direta à Receita Federal. Para MEI, ME/EPP e empresas de software.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://www.emitirnotafacil.com.br',
    },
    {
      '@type': 'SoftwareApplication',
      position: 2,
      name: 'Agenda Inteligente',
      description: 'Plataforma de agendamento com camada inteligente para profissionais e clínicas.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Sem JavaScript o IntersectionObserver não roda e o conteúdo com
            .reveal ficaria invisível (opacity: 0). Este fallback garante a leitura. */}
        <noscript>
          <style>{`.reveal, .reveal-stagger > * { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...ORG_JSONLD, '@id': `${SITE_URL}#organization` }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCTS_JSONLD) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <Pixels />
      </body>
    </html>
  )
}
