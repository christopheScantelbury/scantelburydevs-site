/**
 * SiteFooter — rodapé único das páginas internas. Mesmos dados legais e a
 * mesma assinatura do rodapé da home, com os links que ligam as páginas
 * entre si (antes, /cases e as landing pages não eram alcançáveis pela home).
 *
 *  - `variant="full"`  (padrão): colunas de links + linha legal
 *  - `variant="minimal"`: só a linha legal — para landing pages de anúncio.
 */

import Link from 'next/link'
import { Logo } from '@/components/ui'

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Serviços',
    links: [
      { label: 'API de NFS-e Nacional', href: '/#nfse' },
      { label: 'Sistema sob medida', href: '/sistema-sob-medida' },
      { label: 'Migração de legado', href: '/migracao-sistemas-legados' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Empresa', href: '/#about' },
      { label: 'Trabalhos', href: '/cases' },
      { label: 'Insights', href: '/blog' },
    ],
  },
  {
    title: 'Contato',
    links: [
      { label: 'WhatsApp', href: 'https://wa.me/5547997352380' },
      { label: 'E-mail', href: 'mailto:contato@scantelburydevs.com.br' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/scantelburydevs/' },
    ],
  },
]

export function SiteFooter({ variant = 'full' }: { variant?: 'full' | 'minimal' }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] bg-navy-mid">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 pt-10 md:pt-12 pb-8">
        {variant === 'full' && (
          <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-10 md:mb-12">
            <div className="col-span-2 md:col-span-1">
              <Logo size="sm" className="mb-4" />
              <p className="font-sans text-[13px] text-steel-muted leading-[1.65] max-w-[260px]">
                NFS-e Nacional por API e integração fiscal para empresas de software. Operando produtos em produção desde 2022. 100% remoto, atendemos todo o Brasil.
              </p>
            </div>
            {COLUMNS.map(col => (
              <div key={col.title}>
                <div className="font-mono text-[10px] tracking-[0.18em] text-cyan uppercase mb-4">{col.title}</div>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map(l => (
                    <li key={l.label}>
                      {l.href.startsWith('/') ? (
                        <Link href={l.href} className="font-sans text-[13px] text-steel hover:text-offwhite transition-colors min-h-[36px] flex items-center no-underline">{l.label}</Link>
                      ) : (
                        <a href={l.href} className="font-sans text-[13px] text-steel hover:text-offwhite transition-colors min-h-[36px] flex items-center no-underline">{l.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <div className={`flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 ${variant === 'full' ? 'pt-6 md:pt-8 border-t border-white/[0.06]' : ''}`}>
          <p className="font-mono text-[10px] md:text-[11px] text-steel tracking-[0.08em] text-center md:text-left">
            © {year} Scantelbury Serviços em TI Ltda · CNPJ 44.967.160/0001-80 · Blumenau, SC
          </p>
          <p className="font-display font-[700] text-[13px] text-steel">
            Construímos. Lançamos. <span className="text-cyan">Operamos.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
