/**
 * ProductShowcase — exibe um produto da ScantelburyDevs com screenshot
 * em uma moldura de navegador. Substitui o "ícone + texto" antigo da
 * seção de Produtos da home.
 *
 * USO:
 *   <ProductShowcase
 *     name="NotaFácil"
 *     tagline="Emissão de NFS-e do MEI sem dor"
 *     url="https://www.emitirnotafacil.com.br"
 *     screenshot="/products/screenshots/notafacil.png"  // opcional; cai pra placeholder
 *     techStack={['Go', 'PostgreSQL', 'Next.js', 'Stripe']}
 *     accent="cyan"  // ou "violet" pra variar visual entre produtos
 *   />
 *
 * ASSETS PENDENTES (Christophe enviar e colocar em public/products/screenshots/):
 *   ⚠️ notafacil.png  — print do dashboard ou tela de emissão
 *   ⚠️ descricaoai.png — tela de geração de descrição com exemplo
 *   ⚠️ agenda-inteligente.png — tela do calendário ou agendamento
 *
 * Recomendação: 1440×900px, formato .png ou .webp, fundo claro/escuro
 * consistente entre prints. Próximo a uma tela "que vende".
 */

import Image from 'next/image'
import Link from 'next/link'

export interface ProductShowcaseProps {
  name: string
  tagline: { pt: string; en: string }
  url: string
  /** Caminho relativo a /public. Se ausente, mostra placeholder marcado. */
  screenshot?: string
  techStack?: string[]
  /** Reverte a ordem (texto à direita, mockup à esquerda) — alterna entre produtos */
  reverse?: boolean
  /** Acento da borda do mockup. 'cyan' = primário. 'violet' = secundário pontual. */
  accent?: 'cyan' | 'violet'
  /** Idioma corrente para textos internos. */
  lang: 'pt' | 'en'
  /** Carregar com prioridade (above-the-fold) */
  priority?: boolean
}

export function ProductShowcase({
  name,
  tagline,
  url,
  screenshot,
  techStack = [],
  reverse = false,
  accent = 'cyan',
  lang,
  priority = false,
}: ProductShowcaseProps) {
  const accentVar = accent === 'violet' ? 'var(--accent-2)' : 'var(--accent)'
  const accentSoftVar = accent === 'violet'
    ? 'rgba(180, 156, 255, 0.15)'
    : 'rgba(0, 212, 255, 0.15)'

  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <article className="grid grid-cols-12 gap-x-6 gap-y-8 items-center">
      {/* Texto */}
      <div className={`col-span-12 md:col-span-5 ${reverse ? 'md:order-2 md:col-start-8' : 'md:order-1'}`}>
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: accentVar }}>
          {lang === 'pt' ? 'Em produção' : 'Live now'}
        </p>
        <h3 className="font-display font-[700] text-[28px] md:text-[34px] text-offwhite mb-3 leading-[1.1]">
          {name}
        </h3>
        <p className="font-sans text-[15px] md:text-[16px] text-steel-light leading-[1.65] mb-6">
          {tagline[lang]}
        </p>

        {techStack.length > 0 && (
          <div className="mb-6">
            <p className="font-mono text-[10px] text-steel tracking-[0.15em] uppercase mb-3">
              {lang === 'pt' ? 'Stack' : 'Stack'}
            </p>
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
          style={{ color: accentVar }}>
          {lang === 'pt' ? 'Ver no ar' : 'See it live'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M17 7H8M17 7V16" />
          </svg>
        </Link>
      </div>

      {/* Mockup de navegador */}
      <div className={`col-span-12 md:col-span-7 ${reverse ? 'md:order-1 md:col-start-1' : 'md:order-2'}`}>
        <div
          className="card-glow rounded-2xl overflow-hidden border bg-navy-card shadow-2xl"
          style={{ borderColor: accentSoftVar }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b bg-navy/60"
            style={{ borderColor: accentSoftVar }}>
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
            </div>
            {/* URL bar */}
            <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-navy/80 border border-white/[0.05]
                            font-mono text-[10px] md:text-[11px] text-steel-muted tracking-[0.03em] truncate">
              <span className="opacity-50">https://</span>{displayUrl}
            </div>
          </div>

          {/* Screenshot ou placeholder */}
          <div className="relative aspect-[16/10] bg-navy">
            {screenshot ? (
              <Image
                src={screenshot}
                alt={`Screenshot de ${name}`}
                fill
                className="object-cover"
                priority={priority}
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            ) : (
              <ScreenshotPlaceholder name={name} accentVar={accentVar} />
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * Placeholder visual claramente marcado enquanto o screenshot real
 * não chega. Não passar por "produto pronto" — deixa óbvio que falta asset.
 */
function ScreenshotPlaceholder({ name, accentVar }: { name: string; accentVar: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy">
      {/* Grid de fundo */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col items-center gap-2 px-6 text-center">
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 rounded
                         border border-dashed text-steel"
          style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          Placeholder
        </span>
        <p className="font-display font-[700] text-offwhite text-[20px] md:text-[24px]"
          style={{ color: accentVar }}>
          {name}
        </p>
        <p className="font-mono text-[11px] text-steel-muted max-w-[220px]">
          screenshot real chega aqui
        </p>
      </div>
    </div>
  )
}
