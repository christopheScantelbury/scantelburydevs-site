import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'

const SITE_URL = 'https://www.scantelburydevs.com.br'
const SITE_NAME = 'ScantelburyDevs'
const DEFAULT_TITLE = 'ScantelburyDevs — Construímos, lançamos e operamos software em produção'
const DEFAULT_DESC =
  'ScantelburyDevs: empresa de tecnologia em Blumenau, SC. Desenvolvimento de aplicações, migração de sistemas e soluções customizadas. Produtos em produção: NotaFácil, Descrição AI, EventGear e Agenda Inteligente.'

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
    'Descrição AI',
    'EventGear',
    'Agenda Inteligente',
    'Blumenau',
    'Santa Catarina',
    'fábrica de software',
  ],
  category: 'technology',
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      en: '/',
    },
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
    creator: '@scantelburydevs',
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
      description: 'Plataforma e API REST para emissão automatizada de NFS-e do MEI.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://www.emitirnotafacil.com.br/',
    },
    {
      '@type': 'SoftwareApplication',
      position: 2,
      name: 'Descrição AI',
      description: 'Geração automática de descrições de produtos para e-commerce com IA.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://descricaoai.com.br/',
    },
    {
      '@type': 'SoftwareApplication',
      position: 3,
      name: 'EventGear',
      description: 'Gestão de inventário técnico para produtoras de eventos.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://eventgear-web.h1dq2d.easypanel.host/',
    },
    {
      '@type': 'SoftwareApplication',
      position: 4,
      name: 'Agenda Inteligente',
      description: 'Plataforma de agendamento com camada inteligente para profissionais e clínicas.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://agendainteligentefrontend.agendainteligenteapp.cloud/',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
