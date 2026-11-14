/**
 * SiteHeader — cabeçalho único das páginas internas (/cases, /blog, artigos e
 * landing pages). Usa o mesmo logo e a mesma altura da home, para o visitante
 * não sentir que mudou de site ao sair dela.
 *
 *  - `variant="full"`  (padrão): logo + navegação + CTA
 *  - `variant="minimal"`: logo + CTA — para landing pages de anúncio, que não
 *    devem oferecer saídas além da conversão.
 */

import Link from 'next/link'
import { Logo } from '@/components/ui'

export interface SiteHeaderProps {
  variant?: 'full' | 'minimal'
  /** Destaca o item da navegação correspondente à página atual. */
  current?: 'cases' | 'blog'
  cta?: { href: string; label: string; external?: boolean }
}

const NAV: { key: 'home' | 'cases' | 'blog'; href: string; label: string }[] = [
  { key: 'home', href: '/', label: 'Início' },
  { key: 'cases', href: '/cases', label: 'Trabalhos' },
  { key: 'blog', href: '/blog', label: 'Insights' },
]

export function SiteHeader({
  variant = 'full',
  current,
  cta = { href: '/#contact', label: 'Falar com a gente' },
}: SiteHeaderProps) {
  const ctaClass =
    'inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg bg-cyan text-navy font-mono text-[11px] font-medium tracking-[0.06em] whitespace-nowrap transition-all duration-200 hover:opacity-90 hover:-translate-y-px'

  return (
    <nav className="sticky top-0 z-40 bg-navy/90 backdrop-blur-md border-b border-cyan/[0.12]" aria-label="Principal">
      <div className="flex items-center justify-between gap-4 px-5 md:px-12 h-16">
        <Link href="/" className="flex items-center min-h-[44px] no-underline" aria-label="ScantelburyDevs — página inicial">
          <Logo />
        </Link>

        <div className="flex items-center gap-5 md:gap-7">
          {variant === 'full' && NAV.map(item => (
            <Link key={item.key} href={item.href}
              aria-current={current === item.key ? 'page' : undefined}
              className={`nav-link hidden sm:flex font-mono text-[13px] tracking-[0.04em] min-h-[44px] items-center no-underline ${
                current === item.key ? 'text-offwhite' : 'text-steel hover:text-offwhite'
              }`}>
              {item.label}
            </Link>
          ))}
          {cta.external ? (
            <a href={cta.href} target="_blank" rel="noopener noreferrer" className={ctaClass}>{cta.label}</a>
          ) : (
            <Link href={cta.href} className={ctaClass}>{cta.label}</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
