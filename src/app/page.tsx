'use client'

import { Logo } from '@/components/ui'
import { Button } from '@/components/ui'
import { Card } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Input, Textarea, Select } from '@/components/ui'
import { useState, useRef, useEffect } from 'react'
import { trackLead, trackContact, trackChatOpen } from '@/lib/analytics'
import { useProactiveChat } from '@/lib/useProactiveChat'
import { ProductShowcase } from '@/components/ProductShowcase'
import { MobileShowcase } from '@/components/MobileShowcase'

type Lang = 'pt' | 'en'

const t = {
  nav: {
    nfse:     { pt: 'API NFS-e', en: 'NFS-e API' },
    services: { pt: 'Serviços', en: 'Services' },
    produtos: { pt: 'Produtos', en: 'Products' },
    pricing:  { pt: 'Como cobramos', en: 'Engagement' },
    process:  { pt: 'Processo', en: 'Process' },
    about:    { pt: 'Empresa', en: 'Company' },
    insights: { pt: 'Insights', en: 'Insights' },
    cta:      { pt: 'Agendar conversa', en: 'Book a call' },
  },
  hero: {
    eyebrow: { pt: 'Engenharia de software · Integração fiscal', en: 'Software engineering · Fiscal integration' },
    title2:  { pt: 'para empresas de software.', en: 'for software companies.' },
    sub:     { pt: 'Integração de NFS-e Nacional para o seu sistema em até 10 dias úteis, via API, com conexão direta à Receita Federal. A mesma engenharia que constrói, lança e opera os nossos próprios produtos.', en: 'NFS-e Nacional (Brazil\'s national service e-invoice) integrated into your system in up to 10 business days, via API, with a direct connection to Receita Federal, the federal revenue service. The same engineering that builds, ships and operates our own products.' },
    cta1:    { pt: 'Falar sobre a integração', en: 'Talk about the integration' },
    cta2:    { pt: 'Ver a API do NotaFácil', en: 'See the NotaFácil API' },
    stat1l:  { pt: 'Anos em produção', en: 'Years in production' },
    stat2l:  { pt: 'Produtos no ar', en: 'Products live' },
    stat3l:  { pt: 'Atendimento remoto', en: 'Remote, Brazil-wide' },
    stat4l:  { pt: 'Sede em Blumenau', en: 'Based in Blumenau' },
  },
  nfse: {
    label:  { pt: 'NotaFácil API', en: 'NotaFácil API' },
    status: { pt: 'Em produção desde mai/2026', en: 'In production since May 2026' },
    desc:   { pt: 'Para software houses e SaaS que precisam emitir nota de serviço em nome dos clientes. A API assina o XML, envia à Receita Federal e devolve o resultado por webhook. Você integra; a operação fiscal fica com a gente.', en: 'For software houses and SaaS products that need to issue service invoices on behalf of their customers. The API signs the XML, submits it to Receita Federal and returns the result via webhook. You integrate; we run the fiscal operation.' },
    f1t: { pt: 'API REST', en: 'REST API' },
    f1d: { pt: 'JSON e Bearer. Sem SOAP, sem XSD.', en: 'JSON and Bearer. No SOAP, no XSD.' },
    f2t: { pt: 'Sandbox público', en: 'Public sandbox' },
    f2d: { pt: 'Teste sem cadastro, na mesma API da produção.', en: 'Try it without signing up, on the same API as production.' },
    f3t: { pt: 'Webhooks assinados', en: 'Signed webhooks' },
    f3d: { pt: 'HMAC-SHA256, com nova tentativa automática.', en: 'HMAC-SHA256, with automatic retries.' },
    f4t: { pt: 'Conexão direta', en: 'Direct connection' },
    f4d: { pt: 'mTLS com a Receita Federal, sem intermediário.', en: 'mTLS with Receita Federal, no middleman.' },
    cta:     { pt: 'Falar sobre a integração', en: 'Talk about the integration' },
    sandbox: { pt: 'Testar no sandbox', en: 'Try the sandbox' },
    docs:    { pt: 'Documentação', en: 'Documentation' },
    hook:    { pt: '→ webhook nfse.autorizada com o número da nota, PDF e XML', en: '→ nfse.autorizada webhook with the invoice number, PDF and XML' },
  },
  stack: {
    label: { pt: 'Stack técnico', en: 'Technical stack' },
    title: { pt: 'Mesma engenharia que opera nossos produtos', en: 'The same engineering that runs our products' },
    desc:  { pt: 'Tecnologias maduras, em produção todos os dias. Sem hype — só o que escala e sustenta operação.', en: 'Mature technologies, running every day. No hype — only what scales and sustains operations.' },
  },
  services: {
    label: { pt: 'O que fazemos', en: 'What we do' },
    title: { pt: 'Serviços que entregam resultado', en: 'Services that deliver results' },
    desc:  { pt: 'Cada projeto é tratado com rigor de engenharia e responsabilidade pela operação. Não entregamos código e desaparecemos — ficamos do lado em produção.', en: 'Every project handled with engineering rigor and operational accountability. We don\'t ship and disappear — we stay with you in production.' },
    s1name: { pt: 'Desenvolvimento de Aplicações', en: 'Application Development' },
    s1desc: { pt: 'Aplicações web, mobile e APIs sob medida — do levantamento ao deploy em produção. Stack moderna, código limpo, observabilidade desde o dia 1.', en: 'Custom web, mobile and API applications — from discovery to production deploy. Modern stack, clean code, observability from day one.' },
    s2name: { pt: 'Migração de Sistemas', en: 'System Migration' },
    s2desc: { pt: 'Modernização de sistemas legados com zero downtime. Migramos bancos, infraestrutura e aplicações garantindo integridade de dados e continuidade do negócio.', en: 'Legacy system modernization with zero downtime. Database, infrastructure and application migrations ensuring data integrity and business continuity.' },
    s3name: { pt: 'Integrações & Automações', en: 'Integrations & Automation' },
    s3desc: { pt: 'ERPs, marketplaces, gateways de pagamento, APIs fiscais e LLMs. Quando o sistema pronto não resolve, conectamos o que existe ou construímos sob medida.', en: 'ERPs, marketplaces, payment gateways, fiscal APIs and LLMs. When off-the-shelf doesn\'t fit, we connect what exists or build it for you.' },
  },
  pricing: {
    label: { pt: 'Como cobramos', en: 'Engagement models' },
    title: { pt: 'Três formas de trabalhar com a gente', en: 'Three ways to work with us' },
    desc:  { pt: 'Sem caixa-preta. Você escolhe o modelo que casa com a maturidade do seu projeto e a previsibilidade que precisa.', en: 'No black box. Choose the model that fits your project maturity and the predictability you need.' },
    p1name: { pt: 'Projeto fechado', en: 'Fixed-scope project' },
    p1desc: { pt: 'Escopo, prazo e valor definidos antes de começar. Ideal para MVPs, migrations e entregas com objetivo claro.', en: 'Scope, timeline and price set before we start. Ideal for MVPs, migrations and well-defined deliverables.' },
    p1tags: [{ pt: 'MVP', en: 'MVP' }, { pt: 'Migrações', en: 'Migrations' }, { pt: 'POCs', en: 'POCs' }],
    p2name: { pt: 'Sprint contínuo', en: 'Continuous sprints' },
    p2desc: { pt: 'Ciclos de 2 semanas com prioridades flexíveis. Ideal para evolução de produto, manutenção e novas features sob demanda.', en: 'Two-week cycles with flexible priorities. Ideal for product evolution, maintenance and on-demand features.' },
    p2tags: [{ pt: 'Evolução', en: 'Evolution' }, { pt: 'Manutenção', en: 'Maintenance' }, { pt: 'Backlog ativo', en: 'Active backlog' }],
    p3name: { pt: 'Alocação dedicada', en: 'Dedicated engineer' },
    p3desc: { pt: 'Engenheiro sênior dedicado ao seu time por período (3, 6 ou 12 meses). Ideal para produto enterprise, reforço de time e roadmap longo.', en: 'A senior engineer dedicated to your team for a period (3, 6 or 12 months). Ideal for enterprise products, team augmentation and long-term roadmaps.' },
    p3tags: [{ pt: 'Enterprise', en: 'Enterprise' }, { pt: 'Dedicado', en: 'Dedicated' }, { pt: 'Longo prazo', en: 'Long-term' }],
    cta:   { pt: 'Discutir o modelo certo →', en: 'Discuss the right model →' },
  },
  about: {
    label: { pt: 'A empresa', en: 'The company' },
    title: { pt: 'Engenharia técnica com responsabilidade pela operação', en: 'Technical engineering with operational accountability' },
    p1:    { pt: 'A ScantelburyDevs é uma empresa de engenharia de software especializada em sistemas críticos, com foco em integração fiscal: é quem constrói e opera a API de NFS-e Nacional do NotaFácil. Também atendemos e-commerce, agendamento, gestão e integrações entre sistemas.', en: 'ScantelburyDevs is a software engineering company specialized in mission-critical systems, focused on fiscal integration: we build and operate the NotaFácil NFS-e Nacional API. We also work on e-commerce, scheduling, operations and system integrations.' },
    p2:    { pt: 'Operamos remotamente em todo o Brasil. Combinamos profundidade técnica, visão de produto e responsabilidade pela operação — mais que entregar código, levamos o sistema até produção e ficamos do lado quando ele está rodando.', en: 'We operate remotely across Brazil. We combine technical depth, product vision and operational accountability — beyond shipping code, we take the system to production and stay with you while it runs.' },
    founderRole: { pt: 'Fundador · Engenheiro de software', en: 'Founder · Software engineer' },
    founder: { pt: 'Quem atende é quem constrói. Mais de 11 anos de engenharia de software, a maior parte em sistemas financeiros e regulados: PIX, Open Finance e prevenção à lavagem de dinheiro.', en: 'You talk to the person who builds. Over 11 years of software engineering, mostly on financial and regulated systems: PIX, Open Finance and anti-money laundering.' },
    factCompany: { pt: 'Empresa', en: 'Company' },
    factHq:      { pt: 'Sede', en: 'Based in' },
    factHqVal:   { pt: 'Blumenau, SC · atendimento remoto', en: 'Blumenau, SC, Brazil · remote' },
    factSince:   { pt: 'Desde', en: 'Since' },
    h1:    { pt: 'Operando produtos em produção desde 2022', en: 'Operating products in production since 2022' },
    h2:    { pt: 'Especialistas em backend técnico, integrações fiscais e plataformas SaaS', en: 'Specialists in technical backend, fiscal integrations and SaaS platforms' },
    h3:    { pt: 'Responsabilidade pelo código, pela operação e pelo resultado', en: 'Accountable for code, operations and outcomes' },
  },
  contact: {
    label:     { pt: 'Próximo passo', en: 'Next step' },
    title:     { pt: 'Agendar uma conversa', en: 'Book a call' },
    desc:      { pt: '30 minutos para entender seu contexto — integração de NFS-e ou projeto sob medida —, mapear o escopo e decidir se faz sentido continuar. Sem compromisso, sem proposta automática.', en: '30 minutes to understand your context — NFS-e integration or a custom project —, scope the problem and decide if it makes sense to move forward. No commitment, no auto-generated proposal.' },
    formTitle: { pt: 'Conte-nos sobre seu projeto', en: 'Tell us about your project' },
    nameLbl:   { pt: 'Nome', en: 'Name' },
    typeLbl:   { pt: 'Tipo de projeto', en: 'Project type' },
    msgLbl:    { pt: 'Mensagem', en: 'Message' },
    submit:    { pt: 'Iniciar conversa →', en: 'Start the conversation →' },
    types:     { pt: ['Selecione...','Integração de NFS-e via API','Desenvolvimento de aplicação','Migração de sistema','Integração / Automação','Alocação dedicada','Outro'], en: ['Select...','NFS-e integration via API','Application development','System migration','Integration / Automation','Dedicated engineer','Other'] },
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
  // A saudação acompanha o idioma; `thread` guarda só o que veio depois dela.
  const greeting: Message = {
    role: 'assistant',
    content: lang === 'pt'
      ? 'Olá! Sou o assistente da ScantelburyDevs. Como posso ajudar com seu projeto hoje?'
      : "Hi! I'm the ScantelburyDevs assistant. How can I help with your project today?",
  }
  const [thread, setThread] = useState<Message[]>([])
  const messages: Message[] = [greeting, ...thread]
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // O chat nunca cobre o formulário de contato por conta própria:
  //  - não abre sozinho enquanto #contact está na tela;
  //  - se abriu sozinho e o visitante não interagiu, recolhe ao chegar no formulário.
  const contactVisibleRef = useRef(false)
  const [contactVisible, setContactVisible] = useState(false)
  const autoOpenedRef = useRef(false)
  const touchedRef = useRef(false)

  const { showBubble, dismissBubble } = useProactiveChat({
    isOpen: open,
    onAutoOpen: () => { autoOpenedRef.current = true; setOpen(true); trackChatOpen('auto') },
    canAutoOpen: () => !contactVisibleRef.current,
    bubbleAutoHideMs: 15000,
    storageKey: 'proactiveChat:home',
  })

  useEffect(() => {
    const el = document.getElementById('contact')
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => {
      const visible = entries[0].isIntersecting
      contactVisibleRef.current = visible
      setContactVisible(visible)
      if (visible && autoOpenedRef.current && !touchedRef.current) {
        autoOpenedRef.current = false
        setOpen(false)
      }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread, open])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    touchedRef.current = true
    const updatedThread: Message[] = [...thread, { role: 'user', content: text }]
    setThread(updatedThread)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [greeting, ...updatedThread].map(m => ({ role: m.role, content: m.content })) }),
      })
      const data = await res.json()
      const reply = data?.reply || (lang === 'pt' ? 'Desculpe, houve um erro. Fale pelo WhatsApp.' : 'Sorry, something went wrong. Reach us on WhatsApp.')
      setThread([...updatedThread, { role: 'assistant', content: reply }])
    } catch {
      setThread([...updatedThread, { role: 'assistant', content: lang === 'pt' ? 'Erro de conexão. Fale conosco: (47) 99735-2380' : 'Connection error. Reach us at +55 (47) 99735-2380' }])
    }
    setLoading(false)
  }

  return (
    <>
      {!open && !contactVisible && (
        <div className="chat-ping fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-cyan/20 pointer-events-none" aria-hidden="true" />
      )}

      {/* Balão teaser proativo — convida sem abrir o modal */}
      {showBubble && !open && !contactVisible && (
        <div className="fixed bottom-24 right-6 z-50 w-[248px] max-w-[calc(100vw-3rem)] animate-fade-up">
          <div className="relative bg-navy-mid border border-cyan/25 rounded-2xl rounded-br-sm shadow-2xl">
            <button
              onClick={dismissBubble}
              aria-label={lang === 'pt' ? 'Dispensar' : 'Dismiss'}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy-card border border-white/10 flex items-center justify-center text-steel hover:text-offwhite hover:border-cyan/30 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <button
              onClick={() => { touchedRef.current = true; dismissBubble(); setOpen(true); trackChatOpen('bubble') }}
              className="text-left px-4 py-3.5 w-full"
            >
              <p className="font-sans text-[13px] text-offwhite leading-snug">
                {lang === 'pt' ? 'Oi 👋 Posso te ajudar com seu projeto?' : 'Hi 👋 Can I help with your project?'}
              </p>
              <p className="font-mono text-[10px] text-cyan mt-1.5 flex items-center gap-1">
                {lang === 'pt' ? 'Responder' : 'Reply'}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </p>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => { touchedRef.current = true; setOpen(o => { const next = !o; if (next) trackChatOpen('manual'); return next }) }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyan flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label={open
          ? (lang === 'pt' ? 'Fechar chat' : 'Close chat')
          : (lang === 'pt' ? 'Abrir chat com assistente' : 'Open chat with the assistant')}
      >
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0F1E" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A0F1E" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
      </button>

      {open && (
        <div
          role="dialog" aria-label={lang === 'pt' ? 'Chat com assistente ScantelburyDevs' : 'Chat with the ScantelburyDevs assistant'}
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
              aria-label={lang === 'pt' ? 'Ir para WhatsApp' : 'Go to WhatsApp'}
              onClick={() => trackContact('whatsapp_chat')}
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
              <div className="flex justify-start" role="status" aria-label={lang === 'pt' ? 'Digitando...' : 'Typing...'}>
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
              onChange={e => { touchedRef.current = true; setInput(e.target.value) }}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder={lang === 'pt' ? 'Digite sua mensagem...' : 'Type your message...'}
              aria-label={lang === 'pt' ? 'Mensagem para o assistente' : 'Message to the assistant'}
              className="flex-1 bg-navy border border-white/10 rounded-lg px-3 py-2 font-sans text-[13px] text-offwhite placeholder:text-steel outline-none focus:border-cyan/40 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label={lang === 'pt' ? 'Enviar mensagem' : 'Send message'}
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
  const [lang, setLangState] = useState<Lang>('pt')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const tx = (obj: { pt: string; en: string }) => obj[lang]

  // ── Idioma: aceita ?lang=en (link compartilhável), lembra a escolha no
  //    navegador e mantém o atributo lang do <html> coerente com o conteúdo. ──
  useEffect(() => {
    let initial: Lang | null = null
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('lang')
      if (fromUrl === 'en' || fromUrl === 'pt') initial = fromUrl
      else {
        const stored = window.localStorage.getItem('lang')
        if (stored === 'en' || stored === 'pt') initial = stored
      }
    } catch { /* modo privado */ }
    if (initial && initial !== 'pt') setLangState(initial)
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])
  function setLang(next: Lang) {
    setLangState(next)
    try {
      window.localStorage.setItem('lang', next)
      const url = new URL(window.location.href)
      if (next === 'en') url.searchParams.set('lang', 'en')
      else url.searchParams.delete('lang')
      window.history.replaceState(null, '', url.toString())
    } catch { /* modo privado */ }
  }

  // ── Scroll reveal: observa elementos .reveal e .reveal-stagger ──
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (typeof IntersectionObserver === 'undefined') return
    const els = document.querySelectorAll<HTMLElement>('.reveal, .reveal-stagger')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // ── Counter animation nos stats numéricos do hero ──
  // SSR e primeiro paint mostram valor final (5/4) — evita "0+" em conexão lenta.
  // No client, useEffect reseta para 0 e anima quando entra no viewport
  // (IntersectionObserver). Se já estiver visível, anima imediatamente.
  // five = anos em produção (desde 2022); four = produtos no ar. Nomes herdados
  // dos valores antigos (5 e 4) — manter os números fiéis à realidade.
  const HERO_STAT_FINAL = { five: 4, four: 3 }
  const [count5, setCount5] = useState(HERO_STAT_FINAL.five)
  const [count4, setCount4] = useState(HERO_STAT_FINAL.four)
  const heroStatsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return // mantém valor final estático
    const el = heroStatsRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    let raf = 0
    let started = false
    const animate = () => {
      const start = performance.now()
      const duration = 900
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
      // Reseta pra 0 e dispara no próximo frame (evita flash longo)
      setCount5(0); setCount4(0)
      const tick = (now: number) => {
        const elapsed = Math.min((now - start) / duration, 1)
        const eased = easeOut(elapsed)
        setCount5(Math.round(eased * HERO_STAT_FINAL.five))
        setCount4(Math.round(eased * HERO_STAT_FINAL.four))
        if (elapsed < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true
        io.disconnect()
        animate()
      }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [])

  function handleWhatsApp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') || 'Visitante')
    const email = String(fd.get('email') || '')
    const type = String(fd.get('type') || '')
    const msg = String(fd.get('message') || '')

    // 1) Captura confiável server-side (não depende do WhatsApp abrir).
    //    keepalive garante a entrega mesmo com a navegação para o wa.me em seguida.
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, type, message: msg, lang, source: 'form' }),
      keepalive: true,
    }).catch(() => {})

    // 2) Conversão para as campanhas (Meta + Google Ads + LinkedIn).
    trackLead({ source: 'form', projectType: type, lang })

    // 3) Abre o WhatsApp de forma síncrona (dentro do gesto do usuário →
    //    não é bloqueado por popup blocker).
    const text = encodeURIComponent(
      `Olá, ScantelburyDevs.\n\nMeu nome é ${name} (${email}).\nTipo de projeto: ${type}\n\nContexto:\n${msg}\n\nGostaria de agendar um diagnóstico.`
    )
    window.open(`https://wa.me/5547997352380?text=${text}`, '_blank')
  }

  const bookingUrl = `https://wa.me/5547997352380?text=${encodeURIComponent(
    'Olá, ScantelburyDevs. Gostaria de agendar um diagnóstico de 30 min sobre meu projeto.'
  )}`
  const nfseUrl = `https://wa.me/5547997352380?text=${encodeURIComponent(
    'Olá, ScantelburyDevs. Quero integrar NFS-e Nacional ao meu sistema via API.'
  )}`
  const NOTAFACIL_API = 'https://www.emitirnotafacil.com.br/gateway'
  const NOTAFACIL_SANDBOX = 'https://www.emitirnotafacil.com.br/sandbox'
  const NOTAFACIL_DOCS = 'https://www.emitirnotafacil.com.br/docs'
  const navSections = ['nfse', 'produtos', 'services', 'pricing', 'about'] as const
  const langLabel = (l: Lang) => (lang === 'pt'
    ? (l === 'pt' ? 'Idioma: português' : 'Idioma: inglês')
    : (l === 'pt' ? 'Language: Portuguese' : 'Language: English'))

  return (
    <div className="bg-navy text-offwhite min-h-screen overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/90 backdrop-blur-md border-b border-cyan/[0.12]">
        <div className="flex items-center justify-between px-5 md:px-12 h-16">
          <a href="#hero" onClick={() => setMenuOpen(false)} className="flex items-center min-h-[44px]">
            <Logo />
          </a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-7">
            {navSections.map(s => (
              <a key={s} href={`#${s}`}
                className="nav-link font-mono text-[13px] text-steel hover:text-offwhite tracking-[0.04em] min-h-[44px] flex items-center">
                {tx(t.nav[s])}
              </a>
            ))}
            <a href="/blog"
              className="nav-link font-mono text-[13px] text-steel hover:text-offwhite tracking-[0.04em] min-h-[44px] flex items-center">
              {tx(t.nav.insights)}
            </a>
            <a href="#contact"><Button size="sm">{tx(t.nav.cta)}</Button></a>
            <div className="flex gap-1 ml-2">
              {(['pt','en'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} aria-label={langLabel(l)} aria-pressed={lang === l}
                  className={`font-mono text-[10px] tracking-[0.1em] px-2 min-h-[36px] min-w-[36px] rounded border transition-all ${lang===l ? 'bg-cyan/10 text-cyan border-cyan/30' : 'text-steel border-white/10 hover:text-offwhite hover:border-white/25'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            {(['pt','en'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)} aria-label={langLabel(l)} aria-pressed={lang === l}
                className={`font-mono text-[10px] tracking-[0.1em] px-2 py-1 min-h-[40px] min-w-[40px] rounded border transition-all ${lang===l ? 'bg-cyan/10 text-cyan border-cyan/30' : 'text-steel border-white/10'}`}>
                {l.toUpperCase()}
              </button>
            ))}
            <button onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen}
              aria-label={menuOpen ? (lang === 'pt' ? 'Fechar menu' : 'Close menu') : (lang === 'pt' ? 'Abrir menu' : 'Open menu')}
              className="w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-lg border border-white/10">
              <span className={`w-4 h-[1.5px] bg-offwhite transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`w-4 h-[1.5px] bg-offwhite transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-4 h-[1.5px] bg-offwhite transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-white/[0.06] bg-navy-mid px-5 py-4 flex flex-col gap-1">
            {navSections.map(s => (
              <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)}
                className="font-mono text-[13px] text-steel hover:text-offwhite py-3.5 border-b border-white/[0.04] tracking-[0.04em] min-h-[44px] flex items-center">
                {tx(t.nav[s])}
              </a>
            ))}
            <a href="/blog" onClick={() => setMenuOpen(false)}
              className="font-mono text-[13px] text-steel hover:text-offwhite py-3.5 border-b border-white/[0.04] tracking-[0.04em] min-h-[44px] flex items-center">
              {tx(t.nav.insights)}
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-3">
              <Button size="sm" className="w-full">{tx(t.nav.cta)}</Button>
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-[120px] md:pt-[140px] pb-20 md:pb-[120px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-glow-cyan pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl w-full reveal-stagger">
          <p className="label-tag">{tx(t.hero.eyebrow)}</p>

          {/* h1 = posicionamento. O slogan "Construímos. Lançamos. Operamos." segue no rodapé. */}
          <h1 className="font-display font-[700] leading-[1.12] md:leading-[1.1] mb-6 md:text-balance"
            style={{ fontSize: 'clamp(28px, 4.4vw, 54px)', letterSpacing: '-0.05em' }}>
            {lang === 'pt' ? (
              <span className="text-offwhite"><span className="whitespace-nowrap">NFS-e Nacional</span> por API e integração fiscal</span>
            ) : (
              <span className="text-offwhite"><span className="whitespace-nowrap">NFS-e Nacional</span> via API and fiscal integration</span>
            )}{' '}
            <span className="shimmer-text">{tx(t.hero.title2)}</span>
          </h1>

          <p className="font-sans text-[16px] md:text-[18px] text-steel-light max-w-2xl mx-auto mb-10 leading-[1.7] font-light">
            {tx(t.hero.sub)}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href={nfseUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto"
              onClick={() => trackLead({ source: 'whatsapp', lang })}>
              <Button size="lg" className="w-full sm:w-auto">{tx(t.hero.cta1)} →</Button>
            </a>
            <a href={NOTAFACIL_API} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">{tx(t.hero.cta2)} ↗</Button>
            </a>
          </div>
        </div>

        {/* Stats — grade fixa: 2×2 no celular, 4 colunas a partir de sm (sem número órfão) */}
        <div ref={heroStatsRef} className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-7 mt-14 pt-9 border-t border-white/[0.06] w-full max-w-3xl" role="list" aria-label={lang === 'pt' ? 'Destaques' : 'Highlights'}>
          {[
            { n: `${count5}+`, l: t.hero.stat1l },
            { n: `${count4}`,  l: t.hero.stat2l },
            { n: 'BR',         l: t.hero.stat3l },
            { n: 'SC',         l: t.hero.stat4l },
          ].map((s, i) => (
            <div key={i} className="text-center" role="listitem">
              <div className="font-display font-[800] text-[28px] md:text-3xl text-cyan tabular-nums">{s.n}</div>
              <div className="font-mono text-[11px] text-steel tracking-[0.12em] uppercase mt-1.5">{tx(s.l)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NFS-E API ── */}
      <section id="nfse" className="py-20 md:py-24 px-5 md:px-12 bg-navy-card border-y border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="reveal">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
              <p className="label-tag !mb-0">{tx(t.nfse.label)}</p>
              <span className="font-mono text-[10px] tracking-[0.08em] text-[#7BE3A6] border border-[#7BE3A6]/30 bg-[#7BE3A6]/[0.08] px-2.5 py-1 rounded">
                {tx(t.nfse.status)}
              </span>
            </div>
            <h2 className="section-title text-left">
              {lang === 'pt'
                ? <>Seu sistema emite <span className="whitespace-nowrap">NFS-e Nacional</span> <span className="text-cyan">com uma chamada de API.</span></>
                : <>Your system issues <span className="whitespace-nowrap">NFS-e Nacional</span> <span className="text-cyan">with a single API call.</span></>}
            </h2>
            <p className="font-sans text-steel-light text-[15px] md:text-[16px] leading-[1.7] mb-7">{tx(t.nfse.desc)}</p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                { t: t.nfse.f1t, d: t.nfse.f1d },
                { t: t.nfse.f2t, d: t.nfse.f2d },
                { t: t.nfse.f3t, d: t.nfse.f3d },
                { t: t.nfse.f4t, d: t.nfse.f4d },
              ].map((f, i) => (
                <li key={i} className="bg-navy border border-white/[0.06] rounded-xl p-4">
                  <div className="font-display font-[700] text-[14px] text-offwhite mb-1">{tx(f.t)}</div>
                  <div className="font-sans text-[13px] text-steel leading-[1.5]">{tx(f.d)}</div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <a href={nfseUrl} target="_blank" rel="noopener noreferrer" className="sm:self-start"
                onClick={() => trackLead({ source: 'whatsapp', lang })}>
                <Button size="md" className="w-full sm:w-auto whitespace-nowrap">{tx(t.nfse.cta)} →</Button>
              </a>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                <a href={NOTAFACIL_SANDBOX} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[13px] tracking-[0.05em] text-cyan hover:text-offwhite transition-colors min-h-[44px] inline-flex items-center whitespace-nowrap">
                  {tx(t.nfse.sandbox)} ↗
                </a>
                <a href={NOTAFACIL_DOCS} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[13px] tracking-[0.05em] text-cyan hover:text-offwhite transition-colors min-h-[44px] inline-flex items-center whitespace-nowrap">
                  {tx(t.nfse.docs)} ↗
                </a>
              </div>
            </div>
          </div>

          {/* Exemplo real, o mesmo publicado em emitirnotafacil.com.br/gateway */}
          <div className="reveal min-w-0 bg-navy border border-cyan/15 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 border-b border-cyan/15 font-mono text-[11px] text-steel tracking-[0.04em]">
              <span><span className="text-cyan font-bold">POST</span> /v1/nfse</span>
              <span className="truncate">api.emitirnotafacil.com.br</span>
            </div>
            <pre className="m-0 px-4 md:px-5 py-5 font-mono text-[11.5px] md:text-[12.5px] leading-[1.7] text-steel-light overflow-x-auto [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.18)_transparent]" tabIndex={0}
              aria-label={lang === 'pt' ? 'Exemplo de chamada à API' : 'API call example'}>{`curl -X POST https://api.emitirnotafacil.com.br/v1/nfse \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tomador": {
      "cnpj": "12345678000190",
      "razao_social": "Cliente LTDA"
    },
    "servico": {
      "descricao": "Consultoria em software",
      "valor": 1500.00,
      "codigo_nbs": "01.01.01.10"
    },
    "webhook_url": "https://seusistema.com/webhooks/nfse"
  }'`}</pre>
            <div className="px-4 md:px-5 py-4 border-t border-white/[0.06] font-mono text-[11.5px] md:text-[12.5px] leading-[1.7] text-[#7BE3A6] break-words">
              {'{ "nota_id": "uuid", "status": "PROCESSANDO" }'}
            </div>
            <p className="px-4 md:px-5 pb-4 font-mono text-[11px] md:text-[11.5px] text-steel leading-[1.6]">{tx(t.nfse.hook)}</p>
          </div>
        </div>
      </section>

      {/* ── PRODUTOS ── */}
      <section id="produtos" className="py-20 md:py-24 px-5 md:px-12 bg-navy border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-glow-cyan pointer-events-none -translate-y-1/3 translate-x-1/4" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto relative">
          {/* Header editorial assimétrico */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-6 mb-12 md:mb-16 reveal">
            <div className="col-span-12 md:col-span-3">
              <p className="font-mono text-[11px] text-cyan tracking-[0.2em] uppercase mb-3">
                {lang === 'pt' ? 'Feito por nós' : 'Built by us'}
              </p>
              <div className="hidden md:block w-16 h-[3px] bg-cyan/60 rounded-full" aria-hidden="true" />
            </div>
            <div className="col-span-12 md:col-span-8 md:col-start-5 self-end">
              <h2 className="section-title text-left mb-3">
                {lang === 'pt' ? <>Alguns dos sistemas<br /><span className="text-cyan">que a gente construiu</span></> : <>Some of the systems<br /><span className="text-cyan">we&apos;ve built</span></>}
              </h2>
              <p className="font-sans text-steel-light text-[15px] md:text-[16px] leading-[1.7] max-w-xl">
                {lang === 'pt'
                  ? 'Não falamos só de teoria. Construímos, lançamos e operamos software real — do sistema web ao aplicativo de celular. Estes são alguns deles.'
                  : "We don't just talk theory. We build, ship and run real software — from web systems to mobile apps. Here are a few of them."}
              </p>
            </div>
          </div>

          {/* Produtos em mockup de browser — alterna texto à esquerda/direita pra ritmo */}
          <div className="flex flex-col gap-16 md:gap-20 reveal-stagger">
            <ProductShowcase
              name="NotaFácil"
              tagline={{
                pt: 'NFS-e Nacional para MEI, ME/EPP e empresas de software. Plataforma web + API REST com conexão direta à Receita Federal, sandbox público e webhooks assinados.',
                en: 'NFS-e Nacional for sole proprietors, small businesses and software companies. Web platform + REST API with a direct connection to Receita Federal, a public sandbox and signed webhooks.',
              }}
              url="https://www.emitirnotafacil.com.br"
              priority
              screenshot="/products/screenshots/notafacil.png"
              techStack={['Go', 'Fiber', 'PostgreSQL', 'AWS KMS', 'Stripe']}
              accent="cyan"
              lang={lang}
            />
            <ProductShowcase
              name="Agenda Inteligente"
              tagline={{
                pt: 'Agendamento online para clínicas, salões e prestadores de serviço. Reagendamento automático e WhatsApp Business integrado para confirmações.',
                en: 'Online scheduling for clinics, salons and service pros. Smart rescheduling and WhatsApp Business integration for confirmations.',
              }}
              /* Sem `url`: o produto ainda não tem domínio próprio. Quando tiver, é só passar aqui. */
              screenshot="/products/screenshots/agenda-inteligente.png"
              techStack={['Java', 'Spring Boot', 'Next.js', 'OpenAI API']}
              accent="violet"
              lang={lang}
              reverse
            />
            <MobileShowcase
              name="Reino do Garcia"
              tagline={{
                pt: 'App de bairro que junta moradores e comércio local num só lugar: feed de notícias e ofertas, vitrine dos comerciantes e um programa de fidelidade gamificado — os "Selos do Reino". Feito para o bairro Garcia, em Blumenau.',
                en: 'A hyperlocal neighborhood app connecting residents and local shops: news and deals feed, merchant directory and a gamified loyalty program — the "Reino stamps". Built for the Garcia district in Blumenau.',
              }}
              url="https://reinogarcia.com.br/"
              screenshots={[
                '/products/reino/reino-mural.jpg',
                '/products/reino/reino-reino.jpg',
                '/products/reino/reino-comercio.jpg',
              ]}
              techStack={['Next.js', 'NestJS', 'PostgreSQL', 'TypeORM', 'Railway']}
              accentColor="#D4A82A"
              statusLabel={{ pt: 'App de bairro · piloto 2026', en: 'Neighborhood app · 2026 pilot' }}
              reverse
              lang={lang}
            />
          </div>

          <div className="text-center mt-12 md:mt-14">
            <p className="font-sans text-[14px] text-steel-muted mb-4">
              {lang === 'pt' ? 'Quer construir o próximo com a gente?' : 'Want to build the next one with us?'}
            </p>
            <a href="#pricing">
              <Button variant="outline" size="md">
                {lang === 'pt' ? 'Ver como cobramos →' : 'See how we engage →'}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR / STACK ── */}
      <section id="stack" aria-label={lang === 'pt' ? 'Stack técnico' : 'Technical stack'}
        className="relative py-14 md:py-16 px-5 md:px-12 bg-navy-card border-b border-white/[0.06] overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative">
          <div className="text-center mb-8 md:mb-10">
            <p className="label-tag">{tx(t.stack.label)}</p>
            <h2 className="font-display font-[700] text-offwhite text-[20px] md:text-[24px] tracking-tight leading-tight max-w-2xl mx-auto">
              {tx(t.stack.title)}
            </h2>
            <p className="font-sans text-steel-muted text-[14px] mt-3 max-w-lg mx-auto">{tx(t.stack.desc)}</p>
          </div>
          {(() => {
            const techs = [
              'Go', 'Node.js', 'TypeScript', 'Next.js', 'React',
              'PostgreSQL', 'Redis', 'Supabase',
              'AWS', 'GCP', 'Vercel', 'Docker',
              'Stripe', 'OpenAI', 'Anthropic', 'RabbitMQ',
            ]
            // Duplica para criar loop infinito sem corte visual
            const doubled = [...techs, ...techs]
            return (
              <div className="marquee" aria-label={lang === 'pt' ? 'Tecnologias em produção' : 'Production stack'}>
                <div className="marquee-track" role="list">
                  {doubled.map((tech, i) => (
                    <span key={i} role="listitem"
                      className="font-mono text-[11px] md:text-[12px] text-steel-light bg-navy border border-white/[0.06] hover:border-cyan/30 hover:text-offwhite transition-colors px-3 py-1.5 rounded-md tracking-[0.04em] whitespace-nowrap">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 md:py-28 px-5 md:px-12 bg-navy border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-x-6 gap-y-10">
          {/* Header — alinhado à esquerda, ocupa 5 colunas no desktop */}
          <div className="col-span-12 md:col-span-5 md:sticky md:top-28 self-start reveal">
            <p className="label-tag">{tx(t.services.label)}</p>
            <h2 className="section-title text-left">
              {lang === 'pt' ? <>Serviços com<br /><span className="text-cyan">responsabilidade</span><br />operacional</> : <>Services with<br /><span className="text-cyan">operational</span><br />accountability</>}
            </h2>
            <p className="font-sans text-steel text-[15px] max-w-md mt-2">{tx(t.services.desc)}</p>
          </div>

          {/* Cards — coluna oposta, 7 colunas, ritmo vertical */}
          <div className="col-span-12 md:col-span-7 md:col-start-6 flex flex-col gap-5 reveal-stagger">
            {[
              { num: '01', name: t.services.s1name, desc: t.services.s1desc, icon: <IconCode />, tags: [
                { pt: 'Web', en: 'Web' }, { pt: 'Mobile', en: 'Mobile' }, { pt: 'API REST', en: 'REST API' }, { pt: 'Observabilidade', en: 'Observability' },
              ] },
              { num: '02', name: t.services.s2name, desc: t.services.s2desc, icon: <IconMigrate />, tags: [
                { pt: 'Legado', en: 'Legacy' }, { pt: 'Migração para nuvem', en: 'Cloud migration' }, { pt: 'Banco de dados', en: 'Database' }, { pt: 'Zero downtime', en: 'Zero downtime' },
              ] },
              { num: '03', name: t.services.s3name, desc: t.services.s3desc, icon: <IconCustom />, tags: [
                { pt: 'ERP', en: 'ERP' }, { pt: 'Marketplaces', en: 'Marketplaces' }, { pt: 'Pagamentos', en: 'Payments' }, { pt: 'Fiscal', en: 'Fiscal' }, { pt: 'LLMs', en: 'LLMs' },
              ] },
            ].map((s, i) => (
              <Card key={i} hover className="card-glow group p-6 md:p-8 relative bg-navy-card">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-t-2xl" aria-hidden="true" />
                {/* Celular: ícone na linha do título, texto na largura toda. Desktop: ícone em coluna. */}
                <div className="md:flex md:items-start md:gap-5">
                  <div className="hidden md:flex w-12 h-12 bg-cyan/[0.08] border border-cyan/20 rounded-xl items-center justify-center shrink-0">{s.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center md:items-baseline gap-3 mb-3 md:mb-2">
                      <div className="md:hidden w-10 h-10 bg-cyan/[0.08] border border-cyan/20 rounded-[10px] flex items-center justify-center shrink-0">{s.icon}</div>
                      <div className="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-3 min-w-0">
                        <span className="font-mono text-[11px] text-cyan tracking-[0.15em]">{s.num}</span>
                        <h3 className="font-display font-[700] text-[17px] md:text-[18px] text-offwhite leading-tight">{tx(s.name)}</h3>
                      </div>
                    </div>
                    <p className="font-sans text-[14px] text-steel-muted leading-[1.65] mb-5">{tx(s.desc)}</p>
                    <div className="flex flex-wrap gap-1.5">{s.tags.map(tag => <Badge key={tag.pt}>{tx(tag)}</Badge>)}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING / ENGAGEMENT MODELS ── */}
      <section id="pricing" className="py-20 md:py-24 px-5 md:px-12 bg-navy-card border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="label-tag">{tx(t.pricing.label)}</p>
            <h2 className="section-title">
              {lang === 'pt' ? <>Três formas de <span className="text-cyan">trabalhar com a gente</span></> : <>Three ways to <span className="text-cyan">work with us</span></>}
            </h2>
            <p className="font-sans text-steel max-w-xl mx-auto text-[15px]">{tx(t.pricing.desc)}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                num: '01',
                name: t.pricing.p1name,
                desc: t.pricing.p1desc,
                tags: t.pricing.p1tags,
                accent: 'from-cyan to-[#0088CC]',
                idealLabel: { pt: 'Risco previsível', en: 'Predictable risk' },
              },
              {
                num: '02',
                name: t.pricing.p2name,
                desc: t.pricing.p2desc,
                tags: t.pricing.p2tags,
                accent: 'from-[#7C6FFF] to-cyan',
                idealLabel: { pt: 'Mais comum', en: 'Most common' },
                featured: true,
              },
              {
                num: '03',
                name: t.pricing.p3name,
                desc: t.pricing.p3desc,
                tags: t.pricing.p3tags,
                accent: 'from-[#00C85A] to-cyan',
                idealLabel: { pt: 'Para escala', en: 'Built for scale' },
              },
            ].map((p) => (
              <div key={p.num} className={`relative p-7 md:p-9 rounded-2xl bg-navy border ${p.featured ? 'border-cyan/30' : 'border-white/[0.06]'} hover:border-cyan/40 transition-colors flex flex-col`}>
                {p.featured && (
                  <div className="absolute -top-2.5 right-6">
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase bg-cyan text-navy font-medium px-2.5 py-1 rounded">
                      {tx(p.idealLabel)}
                    </span>
                  </div>
                )}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${p.accent} opacity-60 rounded-t-2xl`} aria-hidden="true" />
                <div className="font-mono text-[11px] text-steel tracking-[0.18em] mb-4">{p.num}</div>
                <h3 className="font-display font-[800] text-[20px] text-offwhite mb-3 leading-tight">{tx(p.name)}</h3>
                <p className="font-sans text-[14px] text-steel-muted leading-[1.65] mb-5 flex-1">{tx(p.desc)}</p>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                  {p.tags.map((tag) => <Badge key={tag.pt} variant="steel">{tx(tag)}</Badge>)}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:mt-14">
            <p className="font-sans text-[14px] text-steel-muted mb-4">
              {lang === 'pt'
                ? 'Não sabe qual escolher? Conversamos e definimos juntos.'
                : "Not sure which fits? Let's talk and decide together."}
            </p>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
              onClick={() => trackLead({ source: 'whatsapp', lang })}>
              <Button size="md">{tx(t.pricing.cta)}</Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESS (tabs interativas) ── */}
      <section id="process" className="py-20 md:py-24 px-5 md:px-12 bg-navy border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10 md:mb-14 reveal">
            <p className="label-tag">{lang === 'pt' ? 'Como trabalhamos' : 'How we work'}</p>
            <h2 className="section-title">
              {lang === 'pt' ? <>Processo <span className="text-cyan">transparente e direto</span></> : <>A <span className="text-cyan">transparent, direct process</span></>}
            </h2>
          </div>

          {(() => {
            const steps = [
              {
                n: '01',
                t: { pt: 'Descoberta', en: 'Discovery' },
                d: { pt: 'Entendemos profundamente o problema, o contexto de negócio e os objetivos técnicos antes de propor qualquer linha de código.', en: 'We deeply understand the problem, business context and technical objectives before proposing any line of code.' },
                deliv: {
                  pt: ['Mapeamento de processos atuais', 'Lista de objetivos priorizada', 'Hipóteses técnicas validadas'],
                  en: ['Current process mapping', 'Prioritized goals list', 'Validated technical hypotheses'],
                },
                dur: { pt: '1-2 semanas', en: '1-2 weeks' },
              },
              {
                n: '02',
                t: { pt: 'Planejamento', en: 'Planning' },
                d: { pt: 'Definimos escopo, arquitetura e cronograma com proposta clara. Sem letra miúda, sem surpresa no meio do caminho.', en: 'We define scope, architecture and timeline with a clear proposal. No fine print, no surprises along the way.' },
                deliv: {
                  pt: ['Escopo detalhado por módulo', 'Arquitetura técnica documentada', 'Cronograma com marcos visíveis', 'Proposta com investimento fechado'],
                  en: ['Detailed scope by module', 'Documented technical architecture', 'Timeline with visible milestones', 'Proposal with fixed investment'],
                },
                dur: { pt: '3-5 dias', en: '3-5 days' },
              },
              {
                n: '03',
                t: { pt: 'Execução', en: 'Execution' },
                d: { pt: 'Ciclos curtos com entregas funcionais a cada 2 semanas. Você acompanha em tempo real e usa antes do projeto terminar.', en: 'Short cycles with functional deliveries every 2 weeks. You follow along live and use it before the project finishes.' },
                deliv: {
                  pt: ['Entregas a cada 2 semanas', 'Ambientes de teste sempre no ar', 'Acesso ao código em repositório', 'Reuniões quinzenais de revisão'],
                  en: ['Deliveries every 2 weeks', 'Test environments always live', 'Code access in repository', 'Biweekly review meetings'],
                },
                dur: { pt: 'Variável por projeto', en: 'Varies by project' },
              },
              {
                n: '04',
                t: { pt: 'Operação', en: 'Operations' },
                d: { pt: 'Deploy em produção, treinamento do time e acompanhamento contínuo. O projeto não termina no go-live — começa.', en: "Production deploy, team training and continuous support. The project doesn't end at go-live — it begins." },
                deliv: {
                  pt: ['Sistema em produção monitorado', 'Documentação técnica completa', 'Treinamento do time interno', 'Suporte e evolução contínuos'],
                  en: ['Monitored production system', 'Complete technical documentation', 'Internal team training', 'Continuous support and evolution'],
                },
                dur: { pt: 'Contínuo', en: 'Continuous' },
              },
            ]
            const step = steps[activeStep]
            // Calcula a posição da trilha: vai do centro do primeiro dot ao centro do dot ativo
            const trackProgress = steps.length > 1 ? (activeStep / (steps.length - 1)) * 100 : 0
            return (
              <>
                {/* Process flow track — trilha com pontos conectados */}
                <div
                  className="process-track hidden md:grid grid-cols-4 mb-10 mx-auto max-w-[760px]"
                  style={{ '--progress': `${trackProgress}%` } as React.CSSProperties}
                  aria-hidden="true"
                >
                  {steps.map((_s, i) => (
                    <div key={i} className="flex justify-center">
                      <div
                        className="process-dot"
                        data-state={i < activeStep ? 'done' : i === activeStep ? 'active' : 'pending'}
                      />
                    </div>
                  ))}
                </div>

                {/* Tab buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-8 md:mb-10" role="tablist">
                  {steps.map((s, i) => (
                    <button
                      key={s.n}
                      role="tab"
                      aria-selected={activeStep === i}
                      onClick={() => setActiveStep(i)}
                      className={`flex flex-col items-center md:items-start gap-1.5 px-4 md:px-5 py-3 md:py-4 rounded-lg border font-display font-[700] text-[13px] md:text-[14px] transition-all duration-200 ${
                        activeStep === i
                          ? 'bg-cyan/10 border-cyan text-offwhite'
                          : 'bg-navy-card border-white/[0.08] text-steel hover:border-cyan/30 hover:text-offwhite'
                      }`}
                    >
                      <span className={`font-mono text-[11px] ${activeStep === i ? 'text-cyan' : 'text-steel-muted'}`}>{s.n}</span>
                      <span className="text-center md:text-left">{tx(s.t)}</span>
                    </button>
                  ))}
                </div>

                {/* Active tab content */}
                <div
                  role="tabpanel"
                  className="bg-navy-card border border-white/[0.08] rounded-2xl p-7 md:p-10 transition-opacity duration-200"
                >
                  <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xs text-cyan tracking-[0.15em]">{lang === 'pt' ? 'FASE' : 'PHASE'} {step.n}</span>
                        <span className="w-1 h-1 rounded-full bg-steel/40" aria-hidden="true" />
                        <span className="font-mono text-xs text-steel-muted">{tx(step.dur)}</span>
                      </div>
                      <h3 className="font-display font-[800] text-[22px] md:text-[28px] text-offwhite mb-4 leading-tight">
                        {tx(step.t)}
                      </h3>
                      <p className="font-sans text-steel-light text-[14px] md:text-[15px] leading-[1.7]">
                        {tx(step.d)}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-steel-muted tracking-[0.15em] uppercase mb-3">
                        {lang === 'pt' ? 'Você recebe' : 'You get'}
                      </p>
                      <ul className="space-y-2.5">
                        {(lang === 'pt' ? step.deliv.pt : step.deliv.en).map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-[13px] text-steel-light leading-[1.55]">
                            <span className="text-cyan font-bold shrink-0 mt-0.5">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )
          })()}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 md:py-24 px-5 md:px-12 bg-navy-card border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          {/* Layout assimétrico — 7+5 invertido (texto à direita, card à esquerda no desktop) */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-start">
            {/* Card institucional — 5 colunas, esquerda */}
            <Card className="col-span-12 md:col-span-5 md:order-1 order-2 p-7 md:p-10 relative overflow-hidden bg-navy">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-glow-cyan pointer-events-none" aria-hidden="true" />
              {/* Ficha de quem atende. Sem foto por enquanto: o monograma ocupa o lugar dela. */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-full bg-cyan/[0.08] border border-cyan/30 flex items-center justify-center shrink-0 font-display font-[800] text-[20px] text-cyan" aria-hidden="true">CS</div>
                <div className="min-w-0">
                  <p className="font-display font-[700] text-[18px] text-offwhite leading-tight">Christophe Scantelbury</p>
                  <p className="font-mono text-[11px] text-steel tracking-[0.12em] uppercase mt-1.5">{tx(t.about.founderRole)}</p>
                </div>
              </div>
              <p className="font-sans text-[14px] text-steel-light leading-[1.7] mb-6">{tx(t.about.founder)}</p>
              <dl className="border-t border-white/[0.06] pt-5 mb-5 grid grid-cols-[88px_1fr] sm:grid-cols-[110px_1fr] gap-x-4 gap-y-2.5">
                {[
                  { k: tx(t.about.factCompany), v: 'Scantelbury Serviços em TI Ltda' },
                  { k: 'CNPJ', v: '44.967.160/0001-80' },
                  { k: tx(t.about.factHq), v: tx(t.about.factHqVal) },
                  { k: tx(t.about.factSince), v: '2022' },
                ].map(f => (
                  <div key={f.k} className="contents">
                    <dt className="font-mono text-[11px] text-steel tracking-[0.12em] uppercase pt-0.5">{f.k}</dt>
                    <dd className="font-sans text-[13px] text-offwhite">{f.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-white/[0.06] pt-4 flex gap-6">
                <a href="https://www.linkedin.com/company/scantelburydevs/" target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[12px] tracking-[0.05em] text-cyan hover:text-offwhite transition-colors min-h-[44px] inline-flex items-center">LinkedIn ↗</a>
                <a href="https://github.com/christopheScantelbury" target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[12px] tracking-[0.05em] text-cyan hover:text-offwhite transition-colors min-h-[44px] inline-flex items-center">GitHub ↗</a>
              </div>
            </Card>

            {/* Texto — 7 colunas, direita, alinhado à esquerda */}
            <div className="col-span-12 md:col-span-7 md:order-2 order-1 reveal">
              <p className="label-tag">{tx(t.about.label)}</p>
              <h2 className="section-title text-left">
                {lang === 'pt'
                  ? <>Engenharia técnica<br /><span className="text-cyan">com responsabilidade<br />pela operação</span></>
                  : <>Technical engineering<br /><span className="text-cyan">with operational<br />accountability</span></>}
              </h2>
              <p className="font-sans text-steel-light text-[15px] md:text-[16px] leading-[1.75] mb-4">{tx(t.about.p1)}</p>
              <p className="font-sans text-steel-light text-[15px] md:text-[16px] leading-[1.75] mb-8">{tx(t.about.p2)}</p>
              <div className="flex flex-col gap-4 mb-8">
                {[t.about.h1, t.about.h2, t.about.h3].map((h, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 flex-shrink-0" aria-hidden="true" />
                    <p className="font-sans text-[13px] md:text-[14px] text-steel-light leading-relaxed">{tx(h)}</p>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[11px] text-steel tracking-[0.15em] uppercase mb-3">{lang === 'pt' ? 'Áreas de domínio' : 'Areas of expertise'}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { pt:'Fiscal & NFS-e', en:'Fiscal & e-invoicing' },
                  { pt:'SaaS & APIs', en:'SaaS & APIs' },
                  { pt:'Integrações', en:'Integrations' },
                  { pt:'Migrações', en:'Migrations' },
                  { pt:'E-commerce', en:'E-commerce' },
                  { pt:'IA aplicada', en:'Applied AI' },
                ].map(tag => (
                  <Badge key={tag.pt}>{tx(tag)}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSIGHTS / BLOG ── */}
      {/* TODO: Quando atualizar o blog, atualizar essa lista com os 3 posts
          mais recentes. Página é client component — não dá pra usar getAllPosts()
          (que lê fs). Pra automatizar, mover Home para server component + props. */}
      <section id="insights-home" className="py-20 md:py-24 px-5 md:px-12 bg-navy border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          {/* Header assimétrico */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-6 mb-12 reveal">
            <div className="col-span-12 md:col-span-7">
              <p className="label-tag" style={{ color: 'var(--accent-2)' }}>{lang === 'pt' ? 'Insights' : 'Insights'}</p>
              <h2 className="section-title text-left">
                {lang === 'pt'
                  ? <>Engenharia e negócios<br /><span style={{ color: 'var(--accent-2)' }}>sem enrolação</span></>
                  : <>Engineering and business<br /><span style={{ color: 'var(--accent-2)' }}>without the fluff</span></>}
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 self-end">
              <a href="/blog" className="font-mono text-[13px] tracking-[0.04em] inline-flex items-center gap-2 transition-colors"
                 style={{ color: 'var(--accent-2)' }}>
                {lang === 'pt' ? 'Ver todos os artigos' : 'See all articles'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* Grid de 3 cards de insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal-stagger">
            {[
              {
                slug: 'mvp-em-4-semanas-o-que-e-possivel',
                title: { pt: 'MVP em 4 semanas: o que realmente é possível entregar', en: 'MVP in 4 weeks: what you can really deliver' },
                desc:  { pt: 'O que cabe (e o que não cabe) num MVP de 4 semanas — e como definir o escopo certo.', en: 'What fits (and what doesn\'t) in a 4-week MVP — and how to scope it right.' },
                date: { pt: '15 mai 2026', en: 'May 15, 2026' },
                read: 6,
              },
              {
                slug: 'quando-contratar-dev-freelancer-vs-empresa',
                title: { pt: 'Freelancer ou empresa: quando cada um faz sentido', en: 'Freelancer or agency: when each makes sense' },
                desc:  { pt: 'Como decidir entre contratar um dev freelancer ou uma empresa — e os riscos que a maioria ignora.', en: 'How to choose between hiring a freelance dev or an agency — and the risks most people ignore.' },
                date: { pt: '12 mai 2026', en: 'May 12, 2026' },
                read: 5,
              },
              {
                slug: 'como-escolher-tecnologia-para-seu-projeto',
                title: { pt: 'Como escolher a tecnologia certa para seu projeto', en: 'How to choose the right tech for your project' },
                desc:  { pt: 'React ou Next.js? Go ou Node? Os critérios que usamos — sem hype e sem achismo.', en: 'React or Next.js? Go or Node? The criteria we use — no hype, no guesswork.' },
                date: { pt: '10 mai 2026', en: 'May 10, 2026' },
                read: 7,
              },
            ].map(post => (
              <a key={post.slug} href={`/blog/${post.slug}`}
                className="card-glow group relative bg-navy-card border border-white/[0.06] rounded-2xl p-6 md:p-7 transition-all duration-300 no-underline"
                style={{ borderColor: 'rgba(180, 156, 255, 0.08)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(90deg, var(--accent-2), transparent)' }} aria-hidden="true" />
                <div className="flex items-center gap-3 mb-4 font-mono text-[10px] text-steel-muted tracking-[0.12em] uppercase">
                  <span>{tx(post.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-steel/40" aria-hidden="true" />
                  <span>{post.read} min</span>
                  {lang === 'en' && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-steel/40" aria-hidden="true" />
                      <span>in Portuguese</span>
                    </>
                  )}
                </div>
                <h3 className="font-display font-[700] text-[16px] md:text-[17px] text-offwhite mb-3 leading-snug transition-colors duration-200 group-hover:text-[color:var(--accent-2)]">
                  {tx(post.title)}
                </h3>
                <p className="font-sans text-[13px] md:text-[14px] text-steel-muted leading-[1.65] mb-5">
                  {tx(post.desc)}
                </p>
                <div className="font-mono text-[11px] tracking-[0.06em] inline-flex items-center gap-1.5"
                  style={{ color: 'var(--accent-2)' }}>
                  {lang === 'pt' ? 'Ler artigo' : 'Read article'} →
                </div>
              </a>
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
                {lang === 'pt' ? <>Agendar uma <span className="text-cyan">conversa</span></> : <>Book a <span className="text-cyan">call</span></>}
              </h2>
              <p className="font-sans text-steel-muted text-[15px] md:text-[16px] leading-[1.7] mb-8 md:mb-10">{tx(t.contact.desc)}</p>
              <div className="flex flex-col gap-3 md:gap-4">
                {[
                  { href:'https://wa.me/5547997352380', label:'WhatsApp', value:'+55 (47) 99735-2380',
                    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="#00D4FF" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg> },
                  { href:'mailto:contato@scantelburydevs.com.br', label:'E-mail', value:'contato@scantelburydevs.com.br',
                    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                  { href:'https://www.linkedin.com/company/scantelburydevs/', label:'LinkedIn', value:'ScantelburyDevs',
                    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="#00D4FF" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                ].map(ch => (
                  <a key={ch.label} href={ch.href} aria-label={`${ch.label}: ${ch.value}`}
                    {...(ch.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    onClick={() => trackContact(ch.label)}
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
                    <label htmlFor="name" className="font-mono text-[11px] text-steel tracking-[0.14em] uppercase block mb-2">{tx(t.contact.nameLbl)} <span aria-hidden="true">*</span></label>
                    <Input id="name" name="name" required autoComplete="name" placeholder={lang === 'pt' ? 'Seu nome' : 'Your name'} />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-mono text-[11px] text-steel tracking-[0.14em] uppercase block mb-2">E-mail <span aria-hidden="true">*</span></label>
                    <Input id="email" name="email" type="email" required autoComplete="email" placeholder={lang === 'pt' ? 'email@empresa.com' : 'email@company.com'} />
                  </div>
                </div>
                <div>
                  <label htmlFor="type" className="font-mono text-[11px] text-steel tracking-[0.14em] uppercase block mb-2">{tx(t.contact.typeLbl)}</label>
                  <Select id="type" name="type">
                    {t.contact.types[lang].map((o, i) => <option key={o} value={i === 0 ? '' : o}>{o}</option>)}
                  </Select>
                </div>
                <div>
                  <label htmlFor="message" className="font-mono text-[11px] text-steel tracking-[0.14em] uppercase block mb-2">{tx(t.contact.msgLbl)}</label>
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
                {lang === 'pt' ? 'NFS-e Nacional por API e integração fiscal para empresas de software. Operando produtos em produção desde 2022. 100% remoto, atendemos todo o Brasil.' : 'NFS-e Nacional via API and fiscal integration for software companies. Operating products in production since 2022. Fully remote, serving all of Brazil.'}
              </p>
            </div>
            {[
              { title:{pt:'Serviços',en:'Services'}, links:[{pt:'API de NFS-e Nacional',en:'NFS-e Nacional API',href:'#nfse'},{pt:'Sistema sob medida',en:'Custom software',href:'/sistema-sob-medida'},{pt:'Migração de legado',en:'Legacy migration',href:'/migracao-sistemas-legados'},{pt:'Como cobramos',en:'Engagement',href:'#pricing'}] },
              { title:{pt:'Empresa',en:'Company'}, links:[{pt:'Empresa',en:'Company',href:'#about'},{pt:'Produtos',en:'Products',href:'#produtos'},{pt:'Trabalhos',en:'Our work',href:'/cases'},{pt:'Processo',en:'Process',href:'#process'},{pt:'Insights',en:'Insights',href:'/blog'}] },
              { title:{pt:'Contato',en:'Contact'}, links:[{pt:'WhatsApp',en:'WhatsApp',href:'https://wa.me/5547997352380'},{pt:'E-mail',en:'E-mail',href:'mailto:contato@scantelburydevs.com.br'},{pt:'LinkedIn',en:'LinkedIn',href:'https://www.linkedin.com/company/scantelburydevs/'}] },
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
            <p className="font-mono text-[10px] md:text-[11px] text-steel tracking-[0.08em] text-center md:text-left">© {new Date().getFullYear()} Scantelbury Serviços em TI Ltda · CNPJ 44.967.160/0001-80</p>
            <p className="font-display font-[700] text-[13px] text-steel">{lang === 'pt' ? <>Construímos. Lançamos. <span className="text-cyan">Operamos.</span></> : <>We build. We ship. <span className="text-cyan">We operate.</span></>}</p>
          </div>
        </div>
      </footer>

      {/* ── AI CHAT WIDGET ── */}
      <AIChatWidget lang={lang} />

    </div>
  )
}
