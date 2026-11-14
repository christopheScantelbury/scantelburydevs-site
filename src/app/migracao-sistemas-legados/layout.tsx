import type { Metadata } from 'next'

// A página é um client component (formulário) e não pode exportar metadata;
// este layout dá a ela título, descrição e canonical próprios, em vez de
// herdar os da home.
const TITLE = 'Migração de Sistemas Legados sem Parar a Empresa | ScantelburyDevs'
const DESCRIPTION =
  'Trocamos seu sistema antigo por um novo, por etapas, sem perder dados e sem parar o atendimento. Análise gratuita do sistema atual em 7 dias.'
const PATH = '/migracao-sistemas-legados'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
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

export default function MigracaoLayout({ children }: { children: React.ReactNode }) {
  return children
}
