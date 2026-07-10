/**
 * MobileShowcase — variante do ProductShowcase para apps MOBILE.
 * Em vez da moldura de navegador (16:10 landscape), renderiza um leque de
 * celulares (portrait) com screenshots reais. Usado para o Reino do Garcia.
 *
 * Mantém o mesmo layout editorial (grid 12-col, texto de um lado, visual do
 * outro) e os mesmos padrões de acento/tipografia do ProductShowcase.
 */

import Image from 'next/image'
import Link from 'next/link'

export interface MobileShowcaseProps {
  name: string
  tagline: { pt: string; en: string }
  url: string
  /** 2 ou 3 screenshots portrait (relativos a /public). O do meio fica em destaque. */
  screenshots: string[]
  techStack?: string[]
  /** Reverte a ordem (texto à direita, celulares à esquerda) */
  reverse?: boolean
  /** Cor de acento (hex). Default: dourado do Reino. */
  accentColor?: string
  /** Rótulo de status acima do nome. Default: "Em produção". */
  statusLabel?: { pt: string; en: string }
  lang: 'pt' | 'en'
  priority?: boolean
}

export function MobileShowcase({
  name,
  tagline,
  url,
  screenshots,
  techStack = [],
  reverse = false,
  accentColor = '#D4A82A',
  statusLabel,
  lang,
  priority = false,
}: MobileShowcaseProps) {
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const status = statusLabel ?? { pt: 'Em produção', en: 'Live now' }

  // O do meio em destaque; laterais menores, rotacionadas e sobrepostas (leque).
  const phones = screenshots.slice(0, 3)

  return (
    <article className="grid grid-cols-12 gap-x-6 gap-y-8 items-center">
      {/* Texto */}
      <div className={`col-span-12 md:col-span-5 ${reverse ? 'md:order-2 md:col-start-8' : 'md:order-1'}`}>
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: accentColor }}>
          {status[lang]}
        </p>
        <h3 className="font-display font-[700] text-[28px] md:text-[34px] text-offwhite mb-3 leading-[1.1]">
          {name}
        </h3>
        <p className="font-sans text-[15px] md:text-[16px] text-steel-light leading-[1.65] mb-6">
          {tagline[lang]}
        </p>

        {techStack.length > 0 && (
          <div className="mb-6">
            <p className="font-mono text-[10px] text-steel tracking-[0.15em] uppercase mb-3">Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map(tech => (
                <span key={tech}
                  className="font-mono text-[11px] text-steel-light bg-navy-card border border-white/[0.06] px-2.5 py-1 rounded-md tracking-[0.04em]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link href={url} target="_blank" rel="noopener noreferrer"
          className="font-mono text-[13px] tracking-[0.05em] inline-flex items-center gap-2 transition-colors hover:opacity-80"
          style={{ color: accentColor }}>
          {lang === 'pt' ? 'Ver no ar' : 'See it live'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M17 7H8M17 7V16" />
          </svg>
        </Link>
      </div>

      {/* Leque de celulares */}
      <div className={`col-span-12 md:col-span-7 ${reverse ? 'md:order-1 md:col-start-1' : 'md:order-2'}`}>
        <div
          className="relative flex items-center justify-center gap-0 py-4"
          style={{
            filter: `drop-shadow(0 24px 48px ${hexToRgba(accentColor, 0.12)})`,
          }}
        >
          {phones.map((src, i) => {
            const isCenter = i === 1 || phones.length === 1
            // Laterais: menores, rotacionadas, sobrepostas atrás do centro
            const side = i === 0 ? 'left' : i === 2 ? 'right' : 'center'
            const wrapperCls =
              side === 'center'
                ? 'z-20 w-[46%] max-w-[210px]'
                : side === 'left'
                ? 'z-10 w-[40%] max-w-[180px] -mr-[8%] -rotate-6 translate-y-4 hidden sm:block'
                : 'z-10 w-[40%] max-w-[180px] -ml-[8%] rotate-6 translate-y-4 hidden sm:block'

            return (
              <div key={src} className={`relative ${wrapperCls}`}>
                <Phone
                  src={src}
                  alt={`Tela do app ${name} (${i + 1})`}
                  accentColor={accentColor}
                  emphasized={isCenter}
                  priority={priority && isCenter}
                />
              </div>
            )
          })}
        </div>

        <p className="text-center font-mono text-[10px] text-steel-muted tracking-[0.06em] mt-3">
          {displayUrl}
        </p>
      </div>
    </article>
  )
}

/** Moldura de celular (bezel escuro + tela). Screenshots já trazem a status bar do iOS. */
function Phone({
  src,
  alt,
  accentColor,
  emphasized,
  priority,
}: {
  src: string
  alt: string
  accentColor: string
  emphasized: boolean
  priority: boolean
}) {
  return (
    <div
      className="rounded-[1.6rem] overflow-hidden bg-black shadow-2xl"
      style={{
        border: `4px solid #14181f`,
        boxShadow: emphasized
          ? `0 0 0 1px ${hexToRgba(accentColor, 0.25)}, 0 18px 40px rgba(0,0,0,0.5)`
          : '0 12px 28px rgba(0,0,0,0.45)',
      }}
    >
      <div className="relative aspect-[9/19.5] bg-navy overflow-hidden rounded-[1.25rem]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          priority={priority}
          sizes="(max-width: 768px) 45vw, 210px"
        />
      </div>
    </div>
  )
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
