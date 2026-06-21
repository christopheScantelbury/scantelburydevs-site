import type { Metadata } from 'next'
import SistemaSobMedidaClient from './SistemaSobMedidaClient'
import { FAQ_ITEMS } from './faq'

const TITLE = 'Sistema Sob Medida para Empresas | ScantelburyDevs'
const DESCRIPTION =
  'Criamos sistemas, aplicativos e automações sob medida para empresas que querem sair das planilhas, reduzir retrabalho e organizar processos. Faça um diagnóstico gratuito.'
const PATH = '/sistema-sob-medida'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'sistema sob medida',
    'desenvolvimento de sistema sob medida',
    'sistema personalizado',
    'criar sistema para empresa',
    'desenvolvimento de aplicativo',
    'automação de processos',
    'modernização de sistema antigo',
    'software sob medida',
    'sistema para pequenas empresas',
    'empresa de desenvolvimento de software',
  ],
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: PATH,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <SistemaSobMedidaClient />
    </>
  )
}
