/**
 * ProductShowcase — exibe um produto da ScantelburyDevs em uma moldura de
 * navegador. Suporta 3 modos:
 *   1. screenshot (imagem real) — quando o asset existe
 *   2. preview (string identificando o mock visual interno) — dashboard
 *      estilizado em HTML/CSS, brand-consistente, sem precisar de arquivo
 *   3. nenhum dos dois — placeholder marcado
 *
 * USO:
 *   <ProductShowcase
 *     name="NotaFácil"
 *     tagline={{ pt: '...', en: '...' }}
 *     url="https://www.emitirnotafacil.com.br"
 *     preview="notafacil"                  // <- mockup interno
 *     // OU screenshot="/products/screenshots/notafacil.png"
 *     techStack={['Go', 'PostgreSQL']}
 *     accent="cyan"
 *     lang={lang}
 *   />
 */

import Image from 'next/image'
import Link from 'next/link'

export type ProductPreview = 'notafacil' | 'descricaoai' | 'agenda'

export interface ProductShowcaseProps {
  name: string
  tagline: { pt: string; en: string }
  url: string
  /** Caminho relativo a /public (PNG/WEBP real). Tem prioridade sobre preview. */
  screenshot?: string
  /** Mockup visual interno tematizado (alternativa ao screenshot). */
  preview?: ProductPreview
  techStack?: string[]
  /** Reverte a ordem (texto à direita, mockup à esquerda) */
  reverse?: boolean
  /** Acento da borda do mockup */
  accent?: 'cyan' | 'violet'
  lang: 'pt' | 'en'
  priority?: boolean
}

export function ProductShowcase({
  name,
  tagline,
  url,
  screenshot,
  preview,
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
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
            </div>
            <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-navy/80 border border-white/[0.05]
                            font-mono text-[10px] md:text-[11px] text-steel-muted tracking-[0.03em] truncate">
              <span className="opacity-50">https://</span>{displayUrl}
            </div>
          </div>

          {/* Conteúdo: screenshot real → preview tematizado → placeholder */}
          <div className="relative aspect-[16/10] bg-navy overflow-hidden">
            {screenshot ? (
              <Image
                src={screenshot}
                alt={`Screenshot de ${name}`}
                fill
                className="object-cover"
                priority={priority}
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            ) : preview ? (
              <>
                {/* Mobile: visual simples e legível */}
                <div className="md:hidden absolute inset-0">
                  <SimpleVisual name={name} accent={accent} preview={preview} lang={lang} />
                </div>
                {/* Desktop: mockup detalhado de dashboard */}
                <div className="hidden md:block absolute inset-0">
                  {preview === 'notafacil' && <NotaFacilPreview lang={lang} />}
                  {preview === 'descricaoai' && <DescricaoAIPreview lang={lang} />}
                  {preview === 'agenda' && <AgendaPreview lang={lang} />}
                </div>
              </>
            ) : (
              <Placeholder name={name} accentVar={accentVar} />
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

// ═════════════════════════════════════════════════════════════════════════
//  MOCKUPS TEMATIZADOS (substituem prints reais até os assets chegarem)
// ═════════════════════════════════════════════════════════════════════════

function NotaFacilPreview({ lang }: { lang: 'pt' | 'en' }) {
  const t = (pt: string, en: string) => (lang === 'pt' ? pt : en)
  const rows = [
    { id: 'NF-00428', dest: 'Padaria Pão de Ouro LTDA', valor: 'R$ 1.250,00', status: 'ok' as const, data: '24/06' },
    { id: 'NF-00427', dest: 'Studio Beauty M.E.I.', valor: 'R$ 480,00',   status: 'ok' as const, data: '24/06' },
    { id: 'NF-00426', dest: 'Clínica Vida Saudável', valor: 'R$ 3.700,00', status: 'ok' as const, data: '23/06' },
    { id: 'NF-00425', dest: 'TechFlow Consultoria',   valor: 'R$ 8.900,00', status: 'pending' as const, data: '23/06' },
  ]
  return (
    <div className="absolute inset-0 flex bg-[#0B1322] text-[#E6EAF2] font-sans text-[10px]">
      {/* Sidebar */}
      <aside className="w-[18%] border-r border-white/[0.06] py-4 px-3 bg-[#08101D]">
        <div className="flex items-center gap-1.5 mb-5">
          <div className="w-5 h-5 rounded bg-cyan grid place-items-center text-navy font-bold text-[11px]">N</div>
          <span className="font-display font-[700] text-[11px]">NotaFácil</span>
        </div>
        <nav className="flex flex-col gap-1 text-steel-light">
          {[
            { l: t('Dashboard','Dashboard'), active: true },
            { l: t('Notas','Invoices') },
            { l: t('Clientes','Clients') },
            { l: t('Relatórios','Reports') },
            { l: t('Configurações','Settings') },
          ].map((it, i) => (
            <div key={i} className={`px-2 py-1.5 rounded ${it.active ? 'bg-cyan/10 text-cyan' : 'hover:text-offwhite'}`}>
              {it.l}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 p-4 md:p-5 overflow-hidden">
        {/* Header com botão emitir */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-mono text-[8px] text-steel-muted tracking-[0.15em] uppercase">{t('Visão geral','Overview')}</p>
            <h4 className="font-display font-[700] text-[13px] mt-0.5">{t('Bem-vindo de volta','Welcome back')}</h4>
          </div>
          <div className="bg-cyan text-navy font-mono text-[9px] font-medium px-2.5 py-1.5 rounded">+ {t('Emitir nota','New invoice')}</div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: t('Notas emitidas','Issued'),   value: '428', sub: '+12% mês' },
            { label: t('Valor total','Total value'), value: 'R$ 142k', sub: '+8% mês' },
            { label: t('Pendentes','Pending'),       value: '03',  sub: 'Aguardando' },
          ].map((k, i) => (
            <div key={i} className="bg-navy-card/60 border border-white/[0.04] rounded-md p-2">
              <p className="text-[7.5px] text-steel-muted tracking-wider uppercase mb-0.5">{k.label}</p>
              <p className="font-display font-[700] text-[14px] text-cyan tabular-nums">{k.value}</p>
              <p className="text-[7px] text-steel-muted mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabela */}
        <div className="bg-navy-card/40 border border-white/[0.04] rounded-md overflow-hidden">
          <div className="grid grid-cols-[1fr_2fr_1.2fr_0.8fr_0.6fr] gap-2 px-3 py-1.5 border-b border-white/[0.04] text-[7px] text-steel-muted tracking-wider uppercase font-mono">
            <span>Nota</span><span>{t('Destinatário','Recipient')}</span><span>{t('Valor','Amount')}</span><span>Status</span><span>{t('Data','Date')}</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_2fr_1.2fr_0.8fr_0.6fr] gap-2 px-3 py-2 text-[9px] border-b border-white/[0.03] last:border-0 items-center">
              <span className="font-mono text-cyan">{r.id}</span>
              <span className="truncate">{r.dest}</span>
              <span className="tabular-nums">{r.valor}</span>
              <span className={`text-[7.5px] font-medium ${r.status === 'ok' ? 'text-[#00C85A]' : 'text-[#F0B414]'}`}>
                {r.status === 'ok' ? t('● Autorizada','● Authorized') : t('● Processando','● Processing')}
              </span>
              <span className="text-steel-muted text-[8px]">{r.data}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DescricaoAIPreview({ lang }: { lang: 'pt' | 'en' }) {
  const t = (pt: string, en: string) => (lang === 'pt' ? pt : en)
  return (
    <div className="absolute inset-0 flex bg-[#0B1322] text-[#E6EAF2] font-sans text-[10px]">
      {/* Form panel esquerdo */}
      <aside className="w-[42%] border-r border-white/[0.06] p-4 bg-[#08101D]">
        <p className="font-mono text-[8px] text-[var(--accent-2)] tracking-[0.18em] uppercase mb-3">{t('Novo produto','New product')}</p>
        <div className="space-y-2.5">
          <div>
            <p className="text-[7.5px] text-steel-muted uppercase tracking-wider mb-1">{t('Nome do produto','Product name')}</p>
            <div className="bg-navy-card/80 border border-white/[0.06] rounded px-2 py-1.5 text-[10px]">
              Fone Bluetooth XR-200 Pro
            </div>
          </div>
          <div>
            <p className="text-[7.5px] text-steel-muted uppercase tracking-wider mb-1">{t('Categoria','Category')}</p>
            <div className="bg-navy-card/80 border border-white/[0.06] rounded px-2 py-1.5 text-[10px]">
              {t('Eletrônicos · Áudio','Electronics · Audio')}
            </div>
          </div>
          <div>
            <p className="text-[7.5px] text-steel-muted uppercase tracking-wider mb-1">{t('Características','Features')}</p>
            <div className="bg-navy-card/80 border border-white/[0.06] rounded px-2 py-1.5 text-[9.5px] leading-snug min-h-[44px]">
              cancelamento ativo, 40h bateria, bluetooth 5.3, drivers 40mm
            </div>
          </div>
          <div className="text-navy font-mono text-[9px] font-bold px-2.5 py-1.5 rounded text-center mt-3"
            style={{ background: 'var(--accent-2)' }}>
            ✨ {t('Gerar descrição','Generate description')}
          </div>
        </div>
      </aside>

      {/* Preview panel direito */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[8px] text-steel-muted tracking-[0.15em] uppercase">{t('Gerado pela IA','AI generated')}</p>
          <div className="flex gap-1.5">
            <span className="font-mono text-[7.5px] text-steel-muted border border-white/10 px-1.5 py-0.5 rounded">Copiar</span>
            <span className="font-mono text-[7.5px] text-steel-muted border border-white/10 px-1.5 py-0.5 rounded">Regenerar</span>
          </div>
        </div>

        <h4 className="font-display font-[700] text-[14px] mb-2 leading-tight"
          style={{ color: 'var(--accent-2)' }}>
          Fone Bluetooth XR-200 Pro — Cancelamento Ativo de Ruído &amp; 40h de Bateria
        </h4>

        <p className="text-[9.5px] leading-relaxed text-steel-light mb-3">
          {t(
            'Mergulhe no som que você sempre quis. O XR-200 Pro combina cancelamento ativo de ruído de última geração com drivers de 40mm afinados para entregar graves precisos e médios cristalinos.',
            'Dive into the sound you always wanted. The XR-200 Pro combines next-gen active noise cancelling with custom-tuned 40mm drivers.'
          )}
        </p>

        <p className="font-mono text-[7.5px] text-steel-muted uppercase tracking-wider mb-1.5">{t('Por que escolher','Why choose')}</p>
        <ul className="space-y-1 text-[9.5px] text-steel-light leading-relaxed">
          {[
            t('40 horas de bateria — esqueça o carregador na bolsa','40 hours of battery — forget the charger'),
            t('Cancelamento ativo que silencia metrô e escritório','Active cancellation that silences subway and office'),
            t('Bluetooth 5.3 com pareamento instantâneo em 2 dispositivos','Bluetooth 5.3 with instant pairing on 2 devices'),
          ].map((b, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span style={{ color: 'var(--accent-2)' }}>✓</span><span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function AgendaPreview({ lang }: { lang: 'pt' | 'en' }) {
  const t = (pt: string, en: string) => (lang === 'pt' ? pt : en)
  const days = lang === 'pt'
    ? ['Seg','Ter','Qua','Qui','Sex']
    : ['Mon','Tue','Wed','Thu','Fri']
  const hours = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00']
  // Quais slots ocupados (linha, coluna) e cor
  const apts: Record<string, { who: string; color: string }> = {
    '0-0': { who: 'Marina S.',   color: '#00D4FF' },
    '1-2': { who: 'Pedro R.',    color: '#00D4FF' },
    '3-1': { who: 'Ana C.',      color: '#7C6FFF' },
    '3-2': { who: 'Ana C.',      color: '#7C6FFF' }, // bloco de 1h continuado
    '5-0': { who: 'Diego F.',    color: '#00C85A' },
    '6-3': { who: 'Carla M.',    color: '#00D4FF' },
  }
  return (
    <div className="absolute inset-0 flex bg-[#0B1322] text-[#E6EAF2] font-sans text-[10px]">
      {/* Calendar */}
      <div className="flex-1 p-3 md:p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-mono text-[8px] text-steel-muted tracking-[0.15em] uppercase">{t('Semana de','Week of')} 24 — 28 jun</p>
            <h4 className="font-display font-[700] text-[13px] mt-0.5">{t('Agenda da semana','This week')}</h4>
          </div>
          <div className="flex gap-1">
            <span className="font-mono text-[8px] text-steel-muted border border-white/10 px-1.5 py-0.5 rounded">← {t('Anterior','Prev')}</span>
            <span className="font-mono text-[8px] text-cyan border border-cyan/30 bg-cyan/10 px-1.5 py-0.5 rounded">{t('Hoje','Today')}</span>
            <span className="font-mono text-[8px] text-steel-muted border border-white/10 px-1.5 py-0.5 rounded">{t('Próxima','Next')} →</span>
          </div>
        </div>

        {/* Grid de calendário */}
        <div className="grid grid-cols-[36px_repeat(5,1fr)] gap-1 text-[7.5px]">
          {/* Header dias */}
          <div></div>
          {days.map(d => (
            <div key={d} className="text-center text-steel-muted font-mono tracking-wider uppercase pb-1">{d}</div>
          ))}
          {/* Grid hours x days */}
          {hours.flatMap((h, hi) => [
            <div key={`h-${hi}`} className="text-steel-muted font-mono text-right pr-1 leading-tight">{h}</div>,
            ...days.map((_d, di) => {
              const key = `${hi}-${di}`
              const apt = apts[key]
              return (
                <div key={key} className="h-7 bg-navy-card/40 border border-white/[0.04] rounded-sm relative">
                  {apt && (
                    <div
                      className="absolute inset-0.5 rounded-sm flex items-center px-1 text-[7px] font-medium"
                      style={{
                        background: `${apt.color}1A`,
                        borderLeft: `1.5px solid ${apt.color}`,
                        color: apt.color,
                      }}
                    >
                      <span className="truncate">{apt.who}</span>
                    </div>
                  )}
                </div>
              )
            }),
          ])}
        </div>
      </div>

      {/* Painel lateral direito */}
      <aside className="w-[28%] border-l border-white/[0.06] p-3 bg-[#08101D]">
        <p className="font-mono text-[7.5px] text-steel-muted tracking-[0.15em] uppercase mb-3">{t('Próximos','Upcoming')}</p>
        <div className="space-y-2">
          {[
            { who: 'Marina S.',   svc: t('Avaliação 60 min','Eval 60 min'), time: '09:00 · Hoje',     dot: '#00D4FF' },
            { who: 'Pedro R.',    svc: t('Retorno 30 min','Follow-up 30 min'), time: '11:00 · Hoje',  dot: '#00D4FF' },
            { who: 'Ana C.',      svc: t('Sessão 60 min','Session 60 min'),  time: '10:00 · Qui',    dot: '#7C6FFF' },
            { who: 'Diego F.',    svc: t('Avaliação 60 min','Eval 60 min'), time: '09:00 · Sex',     dot: '#00C85A' },
          ].map((a, i) => (
            <div key={i} className="bg-navy-card/60 border border-white/[0.04] rounded p-2 leading-tight">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: a.dot }} aria-hidden="true" />
                <span className="text-[9px] font-medium">{a.who}</span>
              </div>
              <p className="text-[7.5px] text-steel-light">{a.svc}</p>
              <p className="text-[7px] text-steel-muted mt-0.5 font-mono">{a.time}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}

/**
 * Visual simples e legível para MOBILE — no espaço de ~390x244px o
 * dashboard detalhado fica esmagado. Aqui mostramos apenas o essencial:
 * gradiente da cor do produto + ícone temático + nome do produto.
 */
function SimpleVisual({
  name,
  accent,
  preview,
  lang,
}: {
  name: string
  accent: 'cyan' | 'violet'
  preview: ProductPreview
  lang: 'pt' | 'en'
}) {
  const gradientFrom = accent === 'violet' ? 'rgba(180, 156, 255, 0.18)' : 'rgba(0, 212, 255, 0.18)'
  const accentColor = accent === 'violet' ? 'var(--accent-2)' : 'var(--accent)'

  // Ícone + tagline visual por produto
  const icons: Record<ProductPreview, { emoji: string; label: { pt: string; en: string } }> = {
    notafacil: {
      emoji: '🧾',
      label: { pt: 'Emissão de NFS-e em segundos', en: 'NFS-e issuance in seconds' },
    },
    descricaoai: {
      emoji: '✨',
      label: { pt: 'Descrições de produto com IA', en: 'AI-powered product descriptions' },
    },
    agenda: {
      emoji: '📅',
      label: { pt: 'Agendamento online inteligente', en: 'Smart online scheduling' },
    },
  }
  const item = icons[preview]

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-4"
      style={{
        background: `radial-gradient(ellipse at center, ${gradientFrom}, transparent 70%), #0B1322`,
      }}>
      {/* Grid sutil de fundo */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center gap-2.5">
        <div className="text-[40px]" aria-hidden="true">{item.emoji}</div>
        <p className="font-display font-[700] text-[20px] text-offwhite leading-tight"
          style={{ color: accentColor }}>
          {name}
        </p>
        <p className="font-mono text-[10px] text-steel tracking-[0.08em] leading-tight max-w-[200px]">
          {item.label[lang]}
        </p>
      </div>
    </div>
  )
}

function Placeholder({ name, accentVar }: { name: string; accentVar: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy">
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col items-center gap-2 px-6 text-center">
        <p className="font-display font-[700] text-offwhite text-[20px] md:text-[24px]"
          style={{ color: accentVar }}>
          {name}
        </p>
        <p className="font-mono text-[11px] text-steel-muted max-w-[220px]">
          {/* sem screenshot */}
        </p>
      </div>
    </div>
  )
}
