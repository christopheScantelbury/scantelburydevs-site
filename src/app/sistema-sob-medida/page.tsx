'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input, Textarea, Select, Card } from '@/components/ui'
import { trackLead } from '@/lib/analytics'

const WHATSAPP_URL = 'https://wa.me/5547997352380?text=Ol%C3%A1%2C+quero+um+sistema+sob+medida+para+minha+empresa'

export default function SistemaSobMedidaLP() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      type: String(data.get('type') || 'Sistema sob medida'),
      message: String(data.get('message') || ''),
      source: 'lp-sistema-sob-medida',
    }
    setSubmitting(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      trackLead({ source: 'form', projectType: payload.type, lang: 'pt' })
      setDone(true)
      setTimeout(() => { window.location.href = WHATSAPP_URL }, 1200)
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <main className="bg-navy min-h-screen text-offwhite">
      {/* Minimal nav — full conversion mode (sem menu completo) */}
      <nav className="border-b border-white/[0.06] py-5">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <svg width="28" height="28" viewBox="0 0 72 72" fill="none" aria-hidden="true">
              <path d="M36 12L58 24V48L36 60L14 48V24L36 12Z" fill="#0A0F1E" stroke="#00D4FF" strokeWidth="2"/>
              <rect x="22" y="24" width="20" height="4" rx="2" fill="#00D4FF"/>
              <rect x="30" y="33" width="20" height="4" rx="2" fill="#00D4FF"/>
              <rect x="22" y="42" width="20" height="4" rx="2" fill="#00D4FF"/>
            </svg>
            <span className="font-sans font-bold text-base text-offwhite">
              Scantelbury<span className="text-cyan">Devs</span>
            </span>
          </Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
             className="font-mono text-[13px] text-cyan tracking-[0.05em] hover:text-offwhite transition-colors">
            WhatsApp →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-4 uppercase">Sistema sob medida</p>
        <h1 className="font-sans text-4xl md:text-6xl font-extrabold text-offwhite mb-6 leading-[1.05]">
          O sistema da sua empresa<br />
          <span className="text-cyan">feito do jeito que o seu negócio funciona.</span>
        </h1>
        <p className="text-steel text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
          Chega de forçar processo na ferramenta errada. Construímos sistemas web e mobile sob medida — do MVP em 4 semanas ao ERP customizado em produção.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#diagnostico">
            <Button variant="primary">Quero diagnóstico grátis</Button>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost">Falar no WhatsApp</Button>
          </a>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="border-y border-white/[0.06] py-8 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="font-sans text-3xl font-extrabold text-cyan">4 sem</p>
            <p className="text-steel text-xs mt-1 uppercase tracking-wider">MVP em produção</p>
          </div>
          <div>
            <p className="font-sans text-3xl font-extrabold text-cyan">+10</p>
            <p className="text-steel text-xs mt-1 uppercase tracking-wider">Anos em engenharia</p>
          </div>
          <div>
            <p className="font-sans text-3xl font-extrabold text-cyan">100%</p>
            <p className="text-steel text-xs mt-1 uppercase tracking-wider">Atendimento remoto</p>
          </div>
          <div>
            <p className="font-sans text-3xl font-extrabold text-cyan">24h</p>
            <p className="text-steel text-xs mt-1 uppercase tracking-wider">Resposta a propostas</p>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-12 text-center">
          Você se identifica com alguma dessas dores?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <p className="text-cyan font-mono text-xs uppercase tracking-wider mb-3">Operação manual</p>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-2">Planilhas demais</h3>
            <p className="text-steel text-sm leading-relaxed">
              Seu time gasta horas todo dia consolidando dados que deveriam estar automatizados num sistema próprio.
            </p>
          </Card>
          <Card>
            <p className="text-cyan font-mono text-xs uppercase tracking-wider mb-3">Software de prateleira</p>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-2">Funcionalidade que faltou</h3>
            <p className="text-steel text-sm leading-relaxed">
              Você compra licença mensal mas continua precisando de uma feature que o fornecedor não vai entregar.
            </p>
          </Card>
          <Card>
            <p className="text-cyan font-mono text-xs uppercase tracking-wider mb-3">Sistema legado</p>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-2">Software antigo travando</h3>
            <p className="text-steel text-sm leading-relaxed">
              Aquele sistema de 10 anos atrás que ninguém quer mexer mas que continua sendo o coração da operação.
            </p>
          </Card>
        </div>
      </section>

      {/* SOLUTION / WHAT WE DO */}
      <section className="bg-white/[0.015] border-y border-white/[0.06] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase text-center">A solução</p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 text-center">
            Sistema feito para o seu processo. Não o contrário.
          </h2>
          <p className="text-steel text-base max-w-2xl mx-auto leading-relaxed mb-12 text-center">
            Levantamos seu fluxo real, propomos arquitetura e entregamos em sprints curtos com você acompanhando o tempo todo.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-white/[0.08] rounded-lg p-6">
              <p className="font-mono text-xs text-cyan tracking-wider mb-2">01 · DISCOVERY</p>
              <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Diagnóstico de 30 minutos — grátis</h3>
              <p className="text-steel text-sm leading-relaxed">
                Entendemos sua dor, mapeamos processos e dizemos com honestidade se vale a pena construir sob medida ou usar pronto.
              </p>
            </div>
            <div className="border border-white/[0.08] rounded-lg p-6">
              <p className="font-mono text-xs text-cyan tracking-wider mb-2">02 · ESCOPO + ORÇAMENTO</p>
              <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Proposta clara em 5 dias</h3>
              <p className="text-steel text-sm leading-relaxed">
                Documento com módulos, prazo, valor fechado ou modelo de sprint. Sem caixa-preta.
              </p>
            </div>
            <div className="border border-white/[0.08] rounded-lg p-6">
              <p className="font-mono text-xs text-cyan tracking-wider mb-2">03 · BUILD</p>
              <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Sprints de 2 semanas</h3>
              <p className="text-steel text-sm leading-relaxed">
                Você acompanha em tempo real. Cada sprint entrega algo funcional e testável.
              </p>
            </div>
            <div className="border border-white/[0.08] rounded-lg p-6">
              <p className="font-mono text-xs text-cyan tracking-wider mb-2">04 · OPERAÇÃO</p>
              <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Suporte e evolução contínua</h3>
              <p className="text-steel text-sm leading-relaxed">
                Não entregamos código e desaparecemos. Ficamos do lado, monitorando e evoluindo o sistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Stack técnica</p>
        <h2 className="font-sans text-3xl font-extrabold text-offwhite mb-6">
          Tecnologia madura, em produção todos os dias
        </h2>
        <p className="text-steel text-base max-w-2xl mx-auto leading-relaxed mb-8">
          Next.js · React · Node.js · Go · PostgreSQL · Supabase · AWS · Vercel · Railway · Docker
        </p>
      </section>

      {/* FORM CTA */}
      <section id="diagnostico" className="bg-white/[0.015] border-t border-white/[0.06] py-20">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase text-center">Diagnóstico grátis</p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 text-center">
            30 minutos. Sem compromisso.<br />
            <span className="text-cyan">Resposta em até 24h.</span>
          </h2>
          <p className="text-steel text-base text-center mb-10 leading-relaxed">
            Conta seu projeto pra gente. Se fizer sentido construir junto, marcamos. Se não, dizemos com honestidade.
          </p>

          {done ? (
            <div className="text-center border border-cyan/40 rounded-lg p-8 bg-cyan/5">
              <p className="text-cyan font-bold text-lg mb-2">✓ Recebemos seu pedido</p>
              <p className="text-steel text-sm">Redirecionando para o WhatsApp em segundos...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Seu nome"
                required
                aria-label="Seu nome"
              />
              <Input
                name="email"
                type="email"
                placeholder="E-mail corporativo"
                required
                aria-label="E-mail corporativo"
              />
              <Select name="type" defaultValue="Sistema novo" required aria-label="Tipo de projeto">
                <option value="Sistema novo">Sistema novo do zero</option>
                <option value="Evolução de sistema">Evoluir sistema existente</option>
                <option value="App mobile">App mobile (iOS/Android)</option>
                <option value="API/Integração">API ou integração</option>
                <option value="Não sei ainda">Não sei ainda — quero conversar</option>
              </Select>
              <Textarea
                name="message"
                rows={4}
                placeholder="Conta rápido qual é o desafio. Quanto mais contexto, melhor a primeira conversa."
                aria-label="Descrição do projeto"
              />
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Quero meu diagnóstico grátis →'}
              </Button>
              <p className="text-steel text-xs text-center mt-3">
                Ao enviar, abrimos o WhatsApp pra continuar a conversa. Você não recebe spam.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-steel text-xs">
            ScantelburyDevs · Blumenau, SC · atendimento remoto em todo o Brasil ·{' '}
            <a href="https://www.scantelburydevs.com.br" className="text-cyan hover:text-offwhite">scantelburydevs.com.br</a>
          </p>
        </div>
      </footer>
    </main>
  )
}
