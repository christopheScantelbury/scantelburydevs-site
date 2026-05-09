'use client'

import { Logo } from '@/components/ui'
import { Button } from '@/components/ui'
import { Card } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Input, Textarea, Select } from '@/components/ui'
import { useState, useRef, useEffect } from 'react'

type Lang = 'pt' | 'en'

const t = {
  nav: {
    services: { pt: 'Serviços', en: 'Services' },
    produtos: { pt: 'Produtos', en: 'Products' },
    process:  { pt: 'Como trabalhamos', en: 'Process' },
    about:    { pt: 'Sobre', en: 'About' },
    cta:      { pt: 'Fale conosco', en: 'Get in touch' },
  },
  hero: {
    eyebrow: { pt: 'Blumenau, SC — Brasil', en: 'Blumenau, SC — Brazil' },
    title1:  { pt: 'Software que funciona.', en: 'Software that works.' },
    title2:  { pt: 'Time que entrega.', en: 'Team that delivers.' },
    sub:     { pt: 'Desenvolvemos aplicações, migramos sistemas e construímos soluções customizadas. Do MVP ao enterprise — com qualidade e prazo.', en: 'We build applications, migrate systems and craft custom solutions. From MVP to enterprise — quality and on time.' },
    cta1:    { pt: 'Iniciar Projeto', en: 'Start a Project' },
    cta2:    { pt: 'Ver Serviços', en: 'Our Services' },
    stat1l:  { pt: 'Anos de experiência', en: 'Years of experience' },
    stat2l:  { pt: 'Produtos em produção', en: 'Products live' },
    stat3l:  { pt: 'Base em Blumenau', en: 'Based in Blumenau' },
    stat4l:  { pt: 'Foco em qualidade', en: 'Quality focused' },
  },
  services: {
    label: { pt: 'O que fazemos', en: 'What we do' },
    title: { pt: 'Serviços que entregam resultado', en: 'Services that deliver results' },
    desc:  { pt: 'Cada projeto é tratado com rigor de engenharia e atenção aos detalhes do seu negócio.', en: 'Every project is handled with engineering rigor and attention to your business needs.' },
    s1name: { pt: 'Desenvolvimento de Aplicações', en: 'Application Development' },
    s1desc: { pt: 'Criamos aplicações web e mobile sob medida, desde levantamento de requisitos até o deploy em produção. Stack moderna, código limpo e arquitetura escalável.', en: 'We build custom web and mobile applications, from requirements to production. Modern stack, clean code and scalable architecture.' },
    s2name: { pt: 'Migração de Sistemas', en: 'System Migration' },
    s2desc: { pt: 'Modernizamos sistemas legados com zero downtime. Migramos bancos de dados, infraestrutura e aplicações garantindo integridade de dados e continuidade de negócio.', en: 'We modernize legacy systems with zero downtime. Database, infrastructure and application migrations ensuring data integrity and business continuity.' },
    s3name: { pt: 'Soluções Customizadas', en: 'Custom Solutions' },
    s3desc: { pt: 'Quando o software pronto não resolve, desenvolvemos a solução exata para o seu problema. Integrações, automações, ferramentas internas e sistemas sob demanda.', en: "When off-the-shelf doesn't work, we build the exact solution for your problem. Integrations, automations, internal tools and on-demand systems." },
  },
  about: {
    label: { pt: 'Sobre a empresa', en: 'About us' },
    title: { pt: 'Tecnologia com propósito real', en: 'Technology with real purpose' },
    p1:    { pt: 'A ScantelburyDevs é uma empresa de tecnologia especializada em transformar desafios de software em soluções que funcionam. Nascemos para ser o parceiro técnico que empresas precisam — sem burocracia, com resultado.', en: 'ScantelburyDevs is a technology company specialized in turning software challenges into solutions that work. We exist to be the technical partner that companies need — no bureaucracy, just results.' },
    p2:    { pt: 'Com base em Blumenau, SC, combinamos profundidade técnica com visão de negócio. Cada projeto é tratado como se fosse o nosso — porque quando você cresce, nós crescemos junto.', en: 'Based in Blumenau, SC, we combine technical depth with business vision. Every project is treated as if it were our own — because when you grow, we grow together.' },
  },
  contact: {
    label:     { pt: 'Entre em contato', en: 'Get in touch' },
    title:     { pt: 'Vamos construir juntos', en: "Let's build together" },
    desc:      { pt: 'Tem um projeto em mente? Quer migrar um sistema crítico? Fale com a gente — sem compromisso.', en: 'Have a project in mind? Need to migrate a critical system? Talk to us — no commitment.' },
    formTitle: { pt: 'Conte-nos sobre seu projeto', en: 'Tell us about your project' },
    nameLbl:   { pt: 'Nome', en: 'Name' },
    typeLbl:   { pt: 'Tipo de projeto', en: 'Project type' },
    msgLbl:    { pt: 'Mensagem', en: 'Message' },
    submit:    { pt: 'Enviar via WhatsApp →', en: 'Send via WhatsApp →' },
    types:     { pt: ['Selecione...','Desenvolvimento de Aplicação','Migração de Sistema','Solução Customizada','Outro'], en: ['Select...','Application Development','System Migration','Custom Solution','Other'] },
  },
}

// ── ÍCONES DECORATIVOS ────────────────────────────────────────────
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

// ── AI CHAT WIDGET ────────────────────────────────────────────────
interface Message { role: 'user' | 'assistant'; content: string }

function AIChatWidget({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: lang === 'pt'
      ? 'Olá! Sou o assistente da ScantelburyDevs. Como posso ajudar com seu projeto hoje?'
      : "Hi! I'm the ScantelburyDevs assistant. How can I help with your project today?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const updated: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(updated)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated.map(m => ({ role: m.role, content: m.content })) }),
      })
      const data = await res.json()
      const reply = data?.reply || 'Desculpe, houve um erro. Fale pelo WhatsApp.'
      setMessages([...updated, { role: 'assistant', content: reply }])
    } catch {
      setMessages([...updated, { role: 'assistant', content: 'Erro de conexão. Fale conosco: (47) 99735-2380' }])
    }
    setLoading(false)
  }

  return (
    <>
      {!open && (
        <div className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-cyan/20 animate-ping pointer-events-none" aria-hidden="true" />
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyan flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label={open ? 'Fechar chat' : 'Abrir chat com assistente'}
      >
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0F1E" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A0F1E" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
      </button>

      {open && (
        <div
          role="dialog" aria-label="Chat com assistente ScantelburyDevs"
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] flex flex-col bg-navy-mid border border-cyan/20 rounded-2xl shadow-2xl overflow-hidden"
          style={{ maxHeight: '520px' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-navy-card flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 72 72" fill="none">
                <path d="M36 12L58 24V48L36 60L14 48V24L36 12Z" fill="#0A0F1E" stroke="#00D4FF" strokeWidth="1.5"/>
                <rect x="22" y="24" width="20" height="4" rx="2" fill="#00D4FF"/>
                <rect x="30" y="33" width="20" height="4" rx="2" fill="#00D4FF"/>
                <rect x="22" y="42" width="20" height="4" rx="2" fill="#00D4FF"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-sans text-[13px] font-medium text-offwhite leading-none">ScantelburyDevs</p>
              <p className="font-mono text-[10px] text-cyan mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" aria-hidden="true" />
                {lang === 'pt' ? 'Online agora' : 'Online now'}
              </p>
            </div>
            <a href="https://wa.me/5547997352380" target="_blank" rel="noopener noreferrer"
              aria-label="Ir para WhatsApp"
              className="font-mono text-[9px] text-steel tracking-[0.1em] border border-white/10 px-2 py-1.5 rounded hover:border-cyan/30 hover:text-cyan transition-colors min-h-[32px] flex items-center">
              WhatsApp
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ minHeight: 0, maxHeight: '360px' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] px-3.5 py-2.5 rounded-xl font-sans text-[13px] leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-cyan text-navy font-medium rounded-br-sm'
                    : 'bg-navy-card border border-white/[0.06] text-steel-light rounded-bl-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start" aria-label="Digitando...">
                <div className="bg-navy-card border border-white/[0.06] px-4 py-3 rounded-xl rounded-bl-sm">
                  <div className="flex gap-1.5 items-center h-4">
                    {[0, 150, 300].map(d => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/[0.06] flex gap-2 flex-shrink-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder={lang === 'pt' ? 'Digite sua mensagem...' : 'Type your message...'}
              aria-label="Mensagem para o assistente"
              className="flex-1 bg-navy border border-white/10 rounded-lg px-3 py-2 font-sans text-[13px] text-offwhite placeholder:text-steel outline-none focus:border-cyan/40 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Enviar mensagem"
              className="w-9 h-9 rounded-lg bg-cyan flex items-center justify-center disabled:opacity-40 transition-opacity flex-shrink-0 hover:opacity-90"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A0F1E" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2" fill="#0A0F1E"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────
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

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {(['services','produtos','process','about'] as const).map(s => (
              <a key={s} href={`#${s}`}
                className="font-mono text-[13px] text-steel hover:text-offwhite transition-colors tracking-[0.04em] min-h-[44px] flex items-center">
                {tx(t.nav[s])}
              </a>
            ))}
            <a href="#contact"><Button size="sm">{tx(t.nav.cta)}</Button></a>
            <div className="flex gap-1 ml-2">
              {(['pt','en'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} aria-label={`Idioma ${l.toUpperCase()}`}
                  className={`font-mono text-[10px] tracking-[0.1em] px-2 min-h-[36px] min-w-[36px] rounded border transition-all ${lang===l ? 'bg-cyan/10 text-cyan border-cyan/30' : 'text-steel border-cyan/12 hover:text-offwhite'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            {(['pt','en'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)} aria-label={`Idioma ${l.toUpperCase()}`}
                className={`font-mono text-[10px] tracking-[0.1em] px-2 py-1 min-h-[36px] min-w-[36px] rounded border transition-all ${lang===l ? 'bg-cyan/10 text-cyan border-cyan/30' : 'text-steel border-cyan/12'}`}>
                {l.toUpperCase()}
              </button>
            ))}
            <button onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-lg border border-white/10">
              <span className={`w-4 h-[1.5px] bg-offwhite transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`w-4 h-[1.5px] bg-offwhite transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-4 h-[1.5px] bg-offwhite transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-navy-mid px-5 py-4 flex flex-col gap-1">
            {(['services','produtos','process','about'] as const).map(s => (
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
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-[120px] md:pt-[140px] pb-20 md:pb-[120px] overflow-hidden">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-glow-cyan pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-4xl w-full">
          {/* h1 com clamp proporcional — não estoura containers em nenhum viewport */}
          <h1 className="font-display font-[800] leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 62px)', letterSpacing: '-0.02em' }}>
            <span className="text-offwhite block">{tx(t.hero.title1)}</span>
            <span className="text-cyan block">{tx(t.hero.title2)}</span>
          </h1>

          <p className="font-sans text-[16px] md:text-[18px] text-steel-light max-w-lg mx-auto mb-10 leading-[1.7] font-light">
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

        {/* Stats — flex-wrap centralizado, funciona em qualquer viewport */}
        <div className="relative z-10 flex flex-wrap justify-center gap-8 md:gap-14 mt-16 pt-10 border-t border-white/[0.06] w-full max-w-2xl" role="list" aria-label="Destaques">
          {[
            { n: '10+', l: t.hero.stat1l },
            { n: '4',   l: t.hero.stat2l },
            { n: 'SC',  l: t.hero.stat3l },
            { n: '100%',l: t.hero.stat4l },
          ].map(s => (
            <div key={s.n} className="text-center" role="listitem">
              <div className="font-display font-[800] text-3xl text-cyan">{s.n}</div>
              <div className="font-mono text-[10px] text-steel tracking-[0.15em] uppercase mt-1.5">{tx(s.l)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 md:py-24 px-5 md:px-12 bg-navy-card border-y border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="label-tag">{tx(t.services.label)}</p>
            <h2 className="section-title">
              {lang === 'pt' ? <>Serviços que <span className="text-cyan">entregam resultado</span></> : <>Services that <span className="text-cyan">deliver results</span></>}
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
              {lang === 'pt' ? <>Processo <span className="text-cyan">transparente e direto</span></> : <>A <span className="text-cyan">transparent, direct process</span></>}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n:'01', t:{pt:'Descoberta',en:'Discovery'}, d:{pt:'Entendemos profundamente o problema, o contexto e os objetivos técnicos.',en:'We deeply understand the problem, business context and technical objectives.'} },
              { n:'02', t:{pt:'Planejamento',en:'Planning'}, d:{pt:'Definimos escopo, arquitetura e cronograma. Sem surpresas no meio do caminho.',en:'We define scope, architecture and timeline. No surprises along the way.'} },
              { n:'03', t:{pt:'Execução',en:'Execution'}, d:{pt:'Desenvolvimento com ciclos curtos, entregas frequentes e comunicação constante.',en:'Short cycles, frequent deliveries and constant communication.'} },
              { n:'04', t:{pt:'Entrega & Suporte',en:'Delivery & Support'}, d:{pt:'Deploy, documentação e suporte pós-entrega. O projeto não termina no go-live.',en:"Deploy, docs and post-delivery support. The project doesn't end at go-live."} },
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
                {lang === 'pt' ? <>Tecnologia com <span className="text-cyan">propósito real</span></> : <>Technology with <span className="text-cyan">real purpose</span></>}
              </h2>
              <p className="font-sans text-steel-light text-[15px] md:text-[16px] leading-[1.75] mb-4">{tx(t.about.p1)}</p>
              <p className="font-sans text-steel-light text-[15px] md:text-[16px] leading-[1.75] mb-8">{tx(t.about.p2)}</p>
              <div className="flex flex-col gap-4">
                {[
                  { pt:'Empresa ativa desde 2022, baseada em Blumenau, SC', en:'Company active since 2022, based in Blumenau, SC' },
                  { pt:'Especialistas em desenvolvimento, migração e soluções customizadas', en:'Specialists in development, migration and custom solutions' },
                  { pt:'Compromisso com qualidade de código e resultado de negócio', en:'Committed to code quality and business outcomes' },
                ].map((h, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 flex-shrink-0" aria-hidden="true" />
                    <p className="font-sans text-[13px] md:text-[14px] text-steel-light leading-relaxed">{tx(h)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card institucional (v2) */}
            <Card className="p-7 md:p-10 relative overflow-hidden bg-navy">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-glow-cyan pointer-events-none" aria-hidden="true" />
              <div className="grid grid-cols-2 gap-4 mb-7">
                {[
                  { n: '2022', l: { pt:'Fundação', en:'Founded' } },
                  { n: 'EPP',  l: { pt:'Porte', en:'Company size' } },
                  { n: 'SC',   l: { pt:'Santa Catarina', en:'Santa Catarina' } },
                  { n: '3+',   l: { pt:'Serviços core', en:'Core services' } },
                ].map(s => (
                  <div key={s.n} className="bg-navy-card rounded-xl p-4 border border-white/[0.05]">
                    <div className="font-display font-[800] text-[26px] text-cyan leading-none mb-1">{s.n}</div>
                    <div className="font-mono text-[10px] text-steel tracking-[0.12em] uppercase">{tx(s.l)}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/[0.06] pt-5 mb-5">
                <p className="font-mono text-[10px] text-steel tracking-[0.15em] uppercase mb-3">{lang === 'pt' ? 'Stack tecnológico' : 'Tech stack'}</p>
                <div className="flex flex-wrap gap-2">
                  {['React','Next.js','Go','Node.js','PostgreSQL','AWS','Docker','TypeScript'].map(tag => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/[0.06] pt-5">
                <p className="font-mono text-[11px] text-steel tracking-[0.08em]">
                  📍 Blumenau, SC · CNPJ 44.967.160/0001-80
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ── PRODUTOS ── */}
      <section id="produtos" className="py-20 md:py-24 px-5 md:px-12 bg-navy border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-glow-cyan pointer-events-none -translate-y-1/3 translate-x-1/4" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto relative">
          <div className="text-center mb-12 md:mb-16">
            <p className="label-tag">{lang === 'pt' ? 'Produtos em produção' : 'Live products'}</p>
            <h2 className="section-title">
              {lang === 'pt' ? <>Software nosso, <span className="text-cyan">no ar agora</span></> : <>Our software, <span className="text-cyan">live right now</span></>}
            </h2>
            <p className="font-sans text-steel max-w-xl mx-auto text-[15px]">
              {lang === 'pt'
                ? 'Não falamos só de teoria. Construímos, lançamos e operamos produtos reais — usados por clientes reais todos os dias.'
                : "We don't just talk theory. We ship, run and operate real products — used by real customers every day."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[
              {
                badge: { pt: 'Fiscal · SaaS', en: 'Fiscal · SaaS' },
                bv: 'cyan' as const,
                name: 'NotaFácil',
                tagline: { pt: 'Emissão de NFS-e do MEI, sem complicação.', en: 'MEI invoice issuance, made simple.' },
                desc: { pt: 'Plataforma + API REST para emissão automatizada de NFS-e Nacional. Suporte a 5.000+ municípios, certificado A1 protegido em AWS, webhooks assinados.', en: 'Platform + REST API for automated NFS-e issuance. Supports 5,000+ municipalities, A1 certificate stored in AWS, signed webhooks.' },
                tags: ['Go', 'Fiber', 'PostgreSQL', 'AWS KMS', 'Stripe'],
                accent: 'from-cyan to-[#0088CC]',
                href: 'https://www.emitirnotafacil.com.br/',
                logo: '/products/notafacil.svg',
                logoBg: 'bg-white',
              },
              {
                badge: { pt: 'IA · E-commerce', en: 'AI · E-commerce' },
                bv: 'blue' as const,
                name: 'Descrição AI',
                tagline: { pt: 'Seu produto merece uma descrição que vende.', en: 'Your product deserves a description that sells.' },
                desc: { pt: 'Geração automática de título, descrição e bullets em ~10 segundos. Pronto para colar no Mercado Livre, Shopee e lojas próprias. API para integração em larga escala.', en: 'Auto-generates title, description and bullets in ~10s. Ready to paste into marketplaces. API for large-scale integration.' },
                tags: ['Next.js', 'OpenAI', 'Supabase', 'Stripe'],
                accent: 'from-[#7C6FFF] to-[#00D4FF]',
                href: 'https://descricaoai.com.br/',
                logo: '/products/descricaoai.svg',
                logoBg: 'bg-white',
              },
              {
                badge: { pt: 'Eventos · Logística', en: 'Events · Logistics' },
                bv: 'steel' as const,
                name: 'EventGear',
                tagline: { pt: 'Controle total dos equipamentos do seu evento.', en: 'Total control over your event equipment.' },
                desc: { pt: 'Gestão de inventário técnico para produtoras de eventos. Rastreamento de equipamentos, reservas, devoluções e relatórios — tudo num só lugar.', en: 'Technical inventory management for event producers. Equipment tracking, bookings, returns and reports — all in one place.' },
                tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
                accent: 'from-[#F59E0B] to-[#0C1220]',
                href: 'https://eventgear-web.h1dq2d.easypanel.host/',
                logo: '/products/eventgear.svg',
                logoBg: 'bg-[#0C1220]',
              },
              {
                badge: { pt: 'Agendamento · IA', en: 'Scheduling · AI' },
                bv: 'cyan' as const,
                name: 'Agenda Inteligente',
                tagline: { pt: 'Sua agenda, organizada por uma IA que entende contexto.', en: 'Your calendar, organized by an AI that understands context.' },
                desc: { pt: 'Plataforma de agendamento com camada inteligente: sugestão de horários, lembretes automáticos, integrações e gestão multi-cliente para profissionais e clínicas.', en: 'Smart scheduling platform: time suggestions, automated reminders, integrations and multi-client management for professionals and clinics.' },
                tags: ['Next.js', 'Node.js', 'AI', 'Cloud'],
                accent: 'from-[#7C3AED] to-[#10B981]',
                href: 'https://agendainteligentefrontend.agendainteligenteapp.cloud/',
                logo: '/products/agenda.svg',
                logoBg: 'bg-white',
              },
            ].map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${lang === 'pt' ? 'Visitar' : 'Visit'} ${p.name}`}
                className="group block"
              >
                <Card hover className="p-6 md:p-8 h-full flex flex-col relative overflow-hidden bg-navy-card">
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${p.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true" />

                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-xl ${p.logoBg} flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden border border-white/10 p-1.5`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.logo} alt={`${p.name} logo`} className="w-full h-full object-contain" />
                    </div>
                    <Badge variant={p.bv}>{tx(p.badge)}</Badge>
                  </div>

                  <h3 className="font-display font-[800] text-[20px] md:text-[22px] text-offwhite mb-2 leading-tight">
                    {p.name}
                  </h3>
                  <p className="font-sans text-cyan text-[13px] md:text-[14px] mb-3 leading-snug">
                    {tx(p.tagline)}
                  </p>
                  <p className="font-sans text-[13px] md:text-[14px] text-steel-muted leading-[1.65] mb-5 flex-1">
                    {tx(p.desc)}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.map(t => <Badge key={t} variant="steel">{t}</Badge>)}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <span className="font-mono text-[10px] text-steel tracking-[0.15em] uppercase truncate max-w-[180px] md:max-w-[220px]">
                      {p.href.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                    <span className="font-mono text-[11px] text-cyan tracking-[0.08em] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      {lang === 'pt' ? 'Visitar' : 'Visit'}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </div>
                </Card>
              </a>
            ))}
          </div>

          <div className="text-center mt-12 md:mt-14">
            <p className="font-sans text-[14px] text-steel-muted mb-4">
              {lang === 'pt' ? 'Quer construir o próximo com a gente?' : 'Want to build the next one with us?'}
            </p>
            <a href="#contact">
              <Button variant="outline" size="md">
                {lang === 'pt' ? 'Iniciar um projeto →' : 'Start a project →'}
              </Button>
            </a>
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
                {lang === 'pt' ? <>Vamos construir <span className="text-cyan">juntos</span></> : <>Let's build <span className="text-cyan">together</span></>}
              </h2>
              <p className="font-sans text-steel-muted text-[15px] md:text-[16px] leading-[1.7] mb-8 md:mb-10">{tx(t.contact.desc)}</p>
              <div className="flex flex-col gap-3 md:gap-4">
                {[
                  { href:'https://wa.me/5547997352380', label:'WhatsApp', value:'+55 (47) 99735-2380',
                    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="#00D4FF" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg> },
                  { href:'mailto:contato@scantelburydevs.com.br', label:'E-mail', value:'contato@scantelburydevs.com.br',
                    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                  { href:'https://linkedin.com/in/christophe-alexander-scantelbury-neves-gaia-3593bab6/', label:'LinkedIn', value:'ScantelburyDevs',
                    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="#00D4FF" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
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
          <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-10 md:mb-12">
            <div className="col-span-2 md:col-span-1">
              <Logo size="sm" className="mb-4" />
              <p className="font-sans text-[13px] text-steel-muted leading-[1.65] max-w-[260px]">
                {lang === 'pt' ? 'Desenvolvimento, migração e soluções customizadas. Blumenau, SC.' : 'Development, migration and custom solutions. Blumenau, SC.'}
              </p>
            </div>
            {[
              { title:{pt:'Serviços',en:'Services'}, links:[{pt:'Desenvolvimento',en:'Development',href:'#services'},{pt:'Migração',en:'Migration',href:'#services'},{pt:'Soluções Custom',en:'Custom Solutions',href:'#services'}] },
              { title:{pt:'Empresa',en:'Company'}, links:[{pt:'Sobre',en:'About',href:'#about'},{pt:'Produtos',en:'Products',href:'#produtos'},{pt:'Processo',en:'Process',href:'#process'}] },
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
            <p className="font-mono text-[10px] md:text-[11px] text-steel tracking-[0.08em] text-center md:text-left">© 2025 Scantelbury Serviços em TI Ltda · CNPJ 44.967.160/0001-80</p>
            <p className="font-display font-[700] text-[13px] text-steel">Software que funciona. Time que <span className="text-cyan">entrega.</span></p>
          </div>
        </div>
      </footer>

      {/* ── AI CHAT WIDGET ── */}
      <AIChatWidget lang={lang} />

    </div>
  )
}
