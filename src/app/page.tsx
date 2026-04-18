'use client'

import { Logo } from '@/components/ui'
import { Button } from '@/components/ui'
import { Card } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Input, Textarea, Select } from '@/components/ui'
import { useState } from 'react'

type Lang = 'pt' | 'en'

const t = {
  nav: {
    services: { pt: 'Serviços', en: 'Services' },
    process:  { pt: 'Como trabalhamos', en: 'Process' },
    about:    { pt: 'Sobre', en: 'About' },
    cases:    { pt: 'Cases', en: 'Cases' },
    cta:      { pt: 'Fale conosco', en: 'Get in touch' },
  },
  hero: {
    eyebrow:  { pt: 'Blumenau, SC — Brasil', en: 'Blumenau, SC — Brazil' },
    title1:   { pt: 'Software que funciona.', en: 'Software that works.' },
    title2:   { pt: 'Time que entrega.', en: 'Team that delivers.' },
    sub:      { pt: 'Construímos aplicações robustas, migramos sistemas críticos e desenvolvemos soluções sob medida. Da ideia ao deploy — código limpo, arquitetura sólida, prazo real.', en: 'We build robust applications, migrate critical systems and craft custom solutions. From idea to deploy — clean code, solid architecture, real deadlines.' },
    cta1:     { pt: 'Iniciar Projeto', en: 'Start a Project' },
    cta2:     { pt: 'Ver Serviços', en: 'Our Services' },
    stat1l:   { pt: 'Anos de experiência', en: 'Years of experience' },
    stat2l:   { pt: 'Áreas de atuação', en: 'Service areas' },
    stat3l:   { pt: 'Base em Blumenau', en: 'Based in Blumenau' },
    stat4l:   { pt: 'Foco em qualidade', en: 'Quality focused' },
  },
  services: {
    label:    { pt: 'O que fazemos', en: 'What we do' },
    title:    { pt: 'Serviços que entregam resultado', en: 'Services that deliver results' },
    desc:     { pt: 'Cada projeto é tratado com rigor de engenharia e atenção aos detalhes do seu negócio.', en: 'Every project is handled with engineering rigor and attention to your business needs.' },
    s1name:   { pt: 'Desenvolvimento de Aplicações', en: 'Application Development' },
    s1desc:   { pt: 'Criamos aplicações web e mobile sob medida, desde levantamento de requisitos até o deploy em produção. Stack moderna, código limpo e arquitetura escalável.', en: 'We build custom web and mobile applications, from requirements to production. Modern stack, clean code and scalable architecture.' },
    s2name:   { pt: 'Migração de Sistemas', en: 'System Migration' },
    s2desc:   { pt: 'Modernizamos sistemas legados com zero downtime. Migramos bancos de dados, infraestrutura e aplicações garantindo integridade de dados e continuidade de negócio.', en: 'We modernize legacy systems with zero downtime. Database, infrastructure and application migrations ensuring data integrity and business continuity.' },
    s3name:   { pt: 'Soluções Customizadas', en: 'Custom Solutions' },
    s3desc:   { pt: 'Quando o software pronto não resolve, desenvolvemos a solução exata para o seu problema. Integrações, automações, ferramentas internas e sistemas sob demanda.', en: "When off-the-shelf doesn't work, we build the exact solution for your problem. Integrations, automations, internal tools and on-demand systems." },
  },
  about: {
    label:  { pt: 'Sobre a empresa', en: 'About us' },
    title:  { pt: 'Tecnologia com propósito real', en: 'Technology with real purpose' },
    p1:     { pt: 'A ScantelburyDevs nasceu da convicção de que software bem feito transforma negócios. Focados em entregar soluções que funcionam de verdade — não apenas no prazo, mas a longo prazo.', en: 'ScantelburyDevs was born from the conviction that well-built software transforms businesses. Focused on delivering solutions that truly work — not just on deadline, but for the long run.' },
    p2:     { pt: 'Com base em Blumenau, SC, atendemos clientes de todos os portes que precisam de um parceiro técnico confiável — alguém que entende o código e entende o negócio.', en: 'Based in Blumenau, SC, we serve clients of all sizes who need a reliable technical partner — someone who understands the code and understands the business.' },
    role:   { pt: 'Fundador & Desenvolvedor', en: 'Founder & Developer' },
    bio:    { pt: 'Mais de 10 anos de experiência em desenvolvimento de software. Fundou a ScantelburyDevs para oferecer ao mercado a combinação de solidez técnica e visão de negócio.', en: 'Over 10 years of software development experience. Founded ScantelburyDevs to bring technical solidity and business vision to every project.' },
  },
  contact: {
    label:    { pt: 'Entre em contato', en: 'Get in touch' },
    title:    { pt: 'Vamos construir juntos', en: "Let's build together" },
    desc:     { pt: 'Tem um projeto em mente? Quer migrar um sistema crítico? Fale com a gente — sem compromisso.', en: 'Have a project in mind? Need to migrate a critical system? Talk to us — no commitment.' },
    formTitle:{ pt: 'Conte-nos sobre seu projeto', en: 'Tell us about your project' },
    nameLbl:  { pt: 'Nome', en: 'Name' },
    typeLbl:  { pt: 'Tipo de projeto', en: 'Project type' },
    msgLbl:   { pt: 'Mensagem', en: 'Message' },
    submit:   { pt: 'Enviar via WhatsApp →', en: 'Send via WhatsApp →' },
    types:    { pt: ['Selecione...','Desenvolvimento de Aplicação','Migração de Sistema','Solução Customizada','Outro'], en: ['Select...','Application Development','System Migration','Custom Solution','Other'] },
  },
}

// Ícones de serviço com aria-hidden (decorativos)
const IconCode = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
)
const IconMigrate = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)
const IconCustom = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
  </svg>
)

export default function Home() {
  const [lang, setLang] = useState<Lang>('pt')
  const [menuOpen, setMenuOpen] = useState(false)
  const tx = (obj: { pt: string; en: string }) => obj[lang]

  function handleWhatsApp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = fd.get('name') || 'Visitante'
    const email = fd.get('email') || ''
    const type = fd.get('type') || ''
    const msg = fd.get('message') || ''
    const text = encodeURIComponent(`Olá! Sou ${name} (${email}).\nProjeto: ${type}\n\n${msg}`)
    window.open(`https://wa.me/5547997352380?text=${text}`, '_blank')
  }

  return (
    <div className="bg-navy text-offwhite min-h-screen overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/90 backdrop-blur-md border-b border-cyan/[0.12]">
        <div className="flex items-center justify-between px-5 md:px-12 h-16">
          <a href="#hero" onClick={() => setMenuOpen(false)} className="flex items-center min-h-[44px]">
            <Logo />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {(['services','process','about','cases'] as const).map(s => (
              <a key={s} href={`#${s}`}
                className="font-mono text-[13px] text-steel hover:text-offwhite transition-colors tracking-[0.04em] min-h-[44px] flex items-center">
                {tx(t.nav[s])}
              </a>
            ))}
            <a href="#contact"><Button size="sm">{tx(t.nav.cta)}</Button></a>
            <div className="flex gap-1 ml-2">
              {(['pt','en'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} aria-label={`Mudar idioma para ${l.toUpperCase()}`}
                  className={`font-mono text-[10px] tracking-[0.1em] px-2 min-h-[36px] min-w-[36px] rounded border transition-all ${lang===l ? 'bg-cyan/10 text-cyan border-cyan/30' : 'text-steel border-cyan/12 hover:text-offwhite'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {(['pt','en'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)} aria-label={`Idioma ${l.toUpperCase()}`}
                className={`font-mono text-[10px] tracking-[0.1em] px-2 py-1 min-h-[36px] min-w-[36px] rounded border transition-all ${lang===l ? 'bg-cyan/10 text-cyan border-cyan/30' : 'text-steel border-cyan/12'}`}>
                {l.toUpperCase()}
              </button>
            ))}
            {/* auditoria: hamburger com min 44x44px */}
            <button onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-lg border border-white/10">
              <span className={`w-4 h-[1.5px] bg-offwhite transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`w-4 h-[1.5px] bg-offwhite transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-4 h-[1.5px] bg-offwhite transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-navy-mid px-5 py-4 flex flex-col gap-1">
            {(['services','process','about','cases'] as const).map(s => (
              <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)}
                className="font-mono text-[13px] text-steel hover:text-offwhite py-3.5 border-b border-white/[0.04] tracking-[0.04em] min-h-[44px] flex items-center">
                {tx(t.nav[s])}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-3">
              <Button size="sm" className="w-full">{tx(t.nav.cta)}</Button>
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      {/* auditoria: padding vertical mínimo 120px desktop / 80px mobile */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-[120px] md:pt-[140px] pb-20 md:pb-[120px] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-100" aria-hidden="true" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-glow-cyan pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-3xl w-full">
          <div className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] text-cyan uppercase mb-5 flex items-center justify-center gap-3">
            <span className="w-6 md:w-8 h-px bg-cyan/40" aria-hidden="true" />
            {tx(t.hero.eyebrow)}
            <span className="w-6 md:w-8 h-px bg-cyan/40" aria-hidden="true" />
          </div>

          {/* auditoria: hero-title com clamp fluido clamp(2rem, 8vw, 5rem) */}
          <h1 className="font-display font-[800] mb-5" style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', letterSpacing: '-0.02em', lineHeight: '1.05' }}>
            {tx(t.hero.title1)}<br />
            <span className="text-cyan">{tx(t.hero.title2)}</span>
          </h1>

          {/* auditoria: body text em DM Sans (font-sans), não mono */}
          <p className="font-sans text-[16px] md:text-[18px] text-steel-light max-w-xl mx-auto mb-8 md:mb-10 leading-[1.65] font-light">
            {tx(t.hero.sub)}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="#contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">{tx(t.hero.cta1)} →</Button>
            </a>
            <a href="#services" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">{tx(t.hero.cta2)}</Button>
            </a>
          </div>
        </div>

        {/* Stats — 2x2 no mobile, linha centralizada no desktop */}
        <div className="relative z-10 grid grid-cols-2 md:flex md:flex-row md:justify-center gap-8 md:gap-16 mt-14 md:mt-20 pt-8 md:pt-10 border-t border-white/[0.06] w-full max-w-3xl" role="list" aria-label="Destaques">
          {[
            { n: '10+', l: t.hero.stat1l },
            { n: '3',   l: t.hero.stat2l },
            { n: 'SC',  l: t.hero.stat3l },
            { n: '100%',l: t.hero.stat4l },
          ].map(s => (
            <div key={s.n} className="text-center" role="listitem">
              <div className="font-display font-[800] text-2xl md:text-3xl text-cyan">{s.n}</div>
              <div className="font-mono text-[9px] md:text-[10px] text-steel tracking-[0.15em] uppercase mt-1.5">{tx(s.l)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      {/* auditoria: seção alternada com bg #0F1929 */}
      <section id="services" className="py-20 md:py-24 px-5 md:px-12 bg-navy-card border-y border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="label-tag">{tx(t.services.label)}</p>
            <h2 className="section-title">
              {tx(t.services.title).split(' ').slice(0,-2).join(' ')}{' '}
              <span className="text-cyan">{tx(t.services.title).split(' ').slice(-2).join(' ')}</span>
            </h2>
            <p className="font-sans text-steel max-w-md mx-auto text-[15px]">{tx(t.services.desc)}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              { name: t.services.s1name, desc: t.services.s1desc, tags: ['Web','Mobile','API REST','Cloud'], icon: <IconCode /> },
              { name: t.services.s2name, desc: t.services.s2desc, tags: ['Legacy','Cloud Migration','Database','Zero Downtime'], icon: <IconMigrate /> },
              { name: t.services.s3name, desc: t.services.s3desc, tags: ['Integrações','Automação','ERP','B2B'], icon: <IconCustom /> },
            ].map((s, i) => (
              <Card key={i} hover className="group p-7 md:p-9 relative bg-navy">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-t-2xl" aria-hidden="true" />
                <div className="w-12 h-12 bg-cyan/[0.08] border border-cyan/20 rounded-xl flex items-center justify-center mb-5">{s.icon}</div>
                <h3 className="font-display font-[700] text-[17px] md:text-[18px] text-offwhite mb-3 leading-tight">{tx(s.name)}</h3>
                {/* auditoria: descrição em DM Sans (font-sans), não mono */}
                <p className="font-sans text-[14px] text-steel-muted leading-[1.65] mb-5">{tx(s.desc)}</p>
                <div className="flex flex-wrap gap-1.5">{s.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-20 md:py-24 px-5 md:px-12 bg-navy border-b border-white/[0.06]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="label-tag">{lang === 'pt' ? 'Como trabalhamos' : 'How we work'}</p>
            <h2 className="section-title">
              {lang === 'pt' ? 'Processo ' : 'A '}
              <span className="text-cyan">{lang === 'pt' ? 'transparente e direto' : 'transparent, direct process'}</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n:'01', t:{pt:'Descoberta',en:'Discovery'}, d:{pt:'Entendemos profundamente o problema, o contexto do negócio e os objetivos técnicos.',en:'We deeply understand the problem, business context and technical objectives.'} },
              { n:'02', t:{pt:'Planejamento',en:'Planning'}, d:{pt:'Definimos escopo, arquitetura e cronograma. Sem surpresas no meio do caminho.',en:'We define scope, architecture and timeline. No surprises along the way.'} },
              { n:'03', t:{pt:'Execução',en:'Execution'}, d:{pt:'Desenvolvimento com ciclos curtos, entregas frequentes e comunicação constante.',en:'Development with short cycles, frequent deliveries and constant communication.'} },
              { n:'04', t:{pt:'Entrega & Suporte',en:'Delivery & Support'}, d:{pt:'Deploy, documentação e suporte pós-entrega. O projeto não termina no go-live.',en:"Deploy, documentation and post-delivery support. The project doesn't end at go-live."} },
            ].map(s => (
              <div key={s.n} className="text-center px-2 md:px-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-cyan/30 bg-navy-card flex items-center justify-center mx-auto mb-4 md:mb-5 font-mono text-sm md:text-base text-cyan" aria-hidden="true">{s.n}</div>
                <div className="font-display font-[700] text-[14px] md:text-[15px] text-offwhite mb-2">{tx(s.t)}</div>
                <p className="font-sans text-[12px] md:text-[13px] text-steel-muted leading-[1.6]">{tx(s.d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 md:py-24 px-5 md:px-12 bg-navy-card border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              <p className="label-tag">{tx(t.about.label)}</p>
              <h2 className="section-title">
                {tx(t.about.title).split(' ').slice(0,-2).join(' ')}{' '}
                <span className="text-cyan">{tx(t.about.title).split(' ').slice(-2).join(' ')}</span>
              </h2>
              <p className="font-sans text-steel-light text-[15px] md:text-[16px] leading-[1.75] mb-4">{tx(t.about.p1)}</p>
              <p className="font-sans text-steel-light text-[15px] md:text-[16px] leading-[1.75] mb-8">{tx(t.about.p2)}</p>
              <div className="flex flex-col gap-4">
                {[
                  {pt:'Empresa ativa desde 2022, CNPJ: 44.967.160/0001-80', en:'Company active since 2022, CNPJ: 44.967.160/0001-80'},
                  {pt:'Especialistas em desenvolvimento, migração e soluções customizadas', en:'Specialists in development, migration and custom solutions'},
                  {pt:'Comprometidos com qualidade de código e resultados de negócio', en:'Committed to code quality and business outcomes'},
                ].map((h, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 flex-shrink-0" aria-hidden="true" />
                    <p className="font-sans text-[13px] md:text-[14px] text-steel-light leading-relaxed">{tx(h)}</p>
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-7 md:p-10 relative overflow-hidden bg-navy">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-glow-cyan pointer-events-none" aria-hidden="true" />
              <div className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full bg-gradient-to-br from-cyan-dark to-cyan flex items-center justify-center font-display font-[800] text-[20px] md:text-[22px] text-navy mb-5" aria-hidden="true">CG</div>
              <div className="font-display font-[700] text-[17px] md:text-[18px] text-offwhite mb-1">Christophe Scantelbury</div>
              <div className="font-mono text-[11px] text-cyan tracking-[0.12em] mb-4 md:mb-5">{tx(t.about.role)}</div>
              <p className="font-sans text-[13px] md:text-[14px] text-steel-muted leading-[1.65] mb-5">{tx(t.about.bio)}</p>
              <a href="https://linkedin.com/in/christophe-alexander-scantelbury-neves-gaia-3593bab6/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] text-cyan tracking-[0.1em] border border-cyan/25 px-4 py-2.5 rounded-lg hover:bg-cyan/10 transition-colors min-h-[44px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#00D4FF" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <div className="mt-5 pt-5 border-t border-white/[0.06] font-mono text-[11px] text-steel tracking-[0.1em]">
                <span aria-label="Localização">📍</span> Blumenau, Santa Catarina — Brasil
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ── CASES ── */}
      <section id="cases" className="py-20 md:py-24 px-5 md:px-12 bg-navy border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="label-tag">{lang === 'pt' ? 'Portfólio' : 'Portfolio'}</p>
            <h2 className="section-title">
              {lang === 'pt' ? 'Projetos que ' : 'Projects we '}
              <span className="text-cyan">{lang === 'pt' ? 'fizemos acontecer' : 'made happen'}</span>
            </h2>
            <p className="font-sans text-steel max-w-md mx-auto text-[15px]">
              {lang === 'pt' ? 'Cases reais em breve. Enquanto isso, conheça os tipos de projeto que resolvemos.' : 'Real cases coming soon. Meanwhile, see the types of projects we solve.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              { badge: {pt:'Desenvolvimento',en:'Development'}, bv:'cyan' as const, title:{pt:'Plataforma de Gestão B2B',en:'B2B Management Platform'}, desc:{pt:'Sistema web completo com módulos de contratos, faturamento e relatórios. Do zero ao go-live em 4 meses.',en:'Full web system with contract, billing and reporting modules. Zero to go-live in 4 months.'}, result:{pt:'Redução de 60% no tempo de processo',en:'60% reduction in process time'} },
              { badge: {pt:'Migração',en:'Migration'}, bv:'blue' as const, title:{pt:'Modernização de ERP Legado',en:'Legacy ERP Modernization'}, desc:{pt:'Migração de sistema on-premise para cloud com reescrita gradual e zero interrupção para o negócio.',en:'On-premise to cloud migration with gradual rewrite and zero business interruption.'}, result:{pt:'100% de integridade dos dados migrados',en:'100% migrated data integrity'} },
              { badge: {pt:'Customizado',en:'Custom'}, bv:'steel' as const, title:{pt:'Integração Multi-sistema',en:'Multi-system Integration'}, desc:{pt:'Integração de ERP, e-commerce e sistema logístico via API, eliminando retrabalho manual da equipe.',en:'ERP, e-commerce and logistics integration via API, eliminating manual rework.'}, result:{pt:'80% menos operações manuais',en:'80% fewer manual operations'} },
            ].map((c, i) => (
              <Card key={i} hover className="p-6 md:p-8">
                <Badge variant={c.bv} className="mb-4 md:mb-5">{tx(c.badge)}</Badge>
                <h3 className="font-display font-[700] text-[16px] md:text-[17px] text-offwhite mb-2.5 leading-tight">{tx(c.title)}</h3>
                <p className="font-sans text-[13px] text-steel-muted leading-relaxed mb-4 md:mb-5">{tx(c.desc)}</p>
                <div className="font-mono text-[11px] text-cyan tracking-[0.08em] before:content-['→_']">{tx(c.result)}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 md:py-24 px-5 md:px-12 bg-navy-card border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div>
              <p className="label-tag">{tx(t.contact.label)}</p>
              <h2 className="section-title">
                {tx(t.contact.title).split(' ').slice(0,-1).join(' ')}{' '}
                <span className="text-cyan">{tx(t.contact.title).split(' ').slice(-1)}</span>
              </h2>
              <p className="font-sans text-steel-muted text-[15px] md:text-[16px] leading-[1.7] mb-8 md:mb-10">{tx(t.contact.desc)}</p>
              <div className="flex flex-col gap-3 md:gap-4">
                {[
                  { href:'https://wa.me/5547997352380', label:'WhatsApp', value:'+55 (47) 99735-2380',
                    icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="#00D4FF" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>) },
                  { href:'mailto:contato@scantelburydevs.com.br', label:'E-mail', value:'contato@scantelburydevs.com.br',
                    icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>) },
                  { href:'https://linkedin.com/in/christophe-alexander-scantelbury-neves-gaia-3593bab6/', label:'LinkedIn', value:'Christophe Scantelbury',
                    icon:(<svg width="18" height="18" viewBox="0 0 24 24" fill="#00D4FF" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>) },
                ].map(ch => (
                  <a key={ch.label} href={ch.href} target="_blank" rel="noopener noreferrer" aria-label={`${ch.label}: ${ch.value}`}
                    className="flex items-center gap-4 p-4 bg-navy border border-white/[0.06] rounded-xl hover:border-cyan/25 hover:bg-navy-border transition-all min-h-[64px]">
                    <div className="w-10 h-10 rounded-[10px] bg-cyan/[0.08] border border-cyan/20 flex items-center justify-center flex-shrink-0">{ch.icon}</div>
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] text-steel tracking-[0.12em] uppercase block">{ch.label}</span>
                      <span className="font-sans text-[13px] md:text-[14px] text-offwhite font-medium block mt-0.5 truncate">{ch.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <Card className="p-6 md:p-10 bg-navy">
              <div className="font-display font-[700] text-[18px] md:text-[20px] text-offwhite mb-6 md:mb-7">{tx(t.contact.formTitle)}</div>
              <form onSubmit={handleWhatsApp} className="flex flex-col gap-4 md:gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="font-mono text-[10px] text-steel tracking-[0.15em] uppercase block mb-2">{tx(t.contact.nameLbl)}</label>
                    <Input id="name" name="name" placeholder={lang === 'pt' ? 'Seu nome' : 'Your name'} />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-mono text-[10px] text-steel tracking-[0.15em] uppercase block mb-2">E-mail</label>
                    <Input id="email" name="email" type="email" placeholder="email@empresa.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="type" className="font-mono text-[10px] text-steel tracking-[0.15em] uppercase block mb-2">{tx(t.contact.typeLbl)}</label>
                  <Select id="type" name="type">
                    {t.contact.types[lang].map(o => <option key={o}>{o}</option>)}
                  </Select>
                </div>
                <div>
                  <label htmlFor="message" className="font-mono text-[10px] text-steel tracking-[0.15em] uppercase block mb-2">{tx(t.contact.msgLbl)}</label>
                  <Textarea id="message" name="message" placeholder={lang === 'pt' ? 'Descreva brevemente seu desafio...' : 'Briefly describe your challenge...'} />
                </div>
                <Button type="submit" size="lg" className="w-full mt-1">{tx(t.contact.submit)}</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] bg-navy-mid">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12 pt-10 md:pt-12 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">
            <div className="col-span-2 md:col-span-1">
              <Logo className="mb-4" />
              <p className="font-sans text-[13px] text-steel-muted leading-[1.65] max-w-[260px]">
                {lang === 'pt' ? 'Desenvolvimento de aplicações, migração de sistemas e soluções customizadas. Blumenau, SC.' : 'Application development, system migration and custom solutions. Blumenau, SC.'}
              </p>
            </div>
            {[
              { title:{pt:'Serviços',en:'Services'}, links:[{pt:'Desenvolvimento',en:'Development',href:'#services'},{pt:'Migração',en:'Migration',href:'#services'},{pt:'Soluções Custom',en:'Custom Solutions',href:'#services'}] },
              { title:{pt:'Empresa',en:'Company'}, links:[{pt:'Sobre',en:'About',href:'#about'},{pt:'Cases',en:'Cases',href:'#cases'},{pt:'Processo',en:'Process',href:'#process'}] },
              { title:{pt:'Contato',en:'Contact'}, links:[{pt:'WhatsApp',en:'WhatsApp',href:'https://wa.me/5547997352380'},{pt:'E-mail',en:'E-mail',href:'mailto:contato@scantelburydevs.com.br'},{pt:'LinkedIn',en:'LinkedIn',href:'https://linkedin.com/in/christophe-alexander-scantelbury-neves-gaia-3593bab6/'}] },
            ].map(col => (
              <div key={col.title.pt}>
                <div className="font-mono text-[10px] tracking-[0.18em] text-cyan uppercase mb-4">{tx(col.title)}</div>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map(l => (
                    <li key={l.pt}>
                      <a href={l.href} className="font-sans text-[13px] text-steel hover:text-offwhite transition-colors min-h-[36px] flex items-center">{tx(l)}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 md:pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="font-mono text-[10px] md:text-[11px] text-steel tracking-[0.08em] text-center md:text-left">© 2024 Scantelbury Serviços em TI Ltda · CNPJ 44.967.160/0001-80</p>
            <p className="font-display font-[700] text-[13px] text-steel">Software que funciona. Time que <span className="text-cyan">entrega.</span></p>
          </div>
        </div>
      </footer>

    </div>
  )
}
