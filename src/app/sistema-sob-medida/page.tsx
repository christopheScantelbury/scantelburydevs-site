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
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-offwhite mb-4 leading-tight">
            Algum desses dói<br />
            <span className="text-cyan">no seu dia a dia?</span>
          </h2>
          <p className="text-steel text-base max-w-lg mx-auto">
            Se você marcou pelo menos um, dá pra resolver.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-3 leading-snug">
              Seu time vive preso a planilhas
            </h3>
            <p className="text-steel text-sm leading-relaxed">
              Funcionários gastam <strong className="text-offwhite">3, 4 horas por dia</strong> copiando dado de um lugar pro outro. Erros acontecem. Cliente reclama. E você sabe que isso devia estar automatizado.
            </p>
          </div>

          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-3 leading-snug">
              Paga por sistema que não te serve
            </h3>
            <p className="text-steel text-sm leading-relaxed">
              Assina <strong className="text-offwhite">R$ 500, R$ 2 mil por mês</strong> de um sistema pronto que quase atende. A funcionalidade que importa mesmo? O fornecedor nunca vai entregar.
            </p>
          </div>

          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-3 leading-snug">
              Sistema antigo travando tudo
            </h3>
            <p className="text-steel text-sm leading-relaxed">
              Aquele software de <strong className="text-offwhite">10, 15 anos</strong> que ninguém quer mexer. Lento, sem suporte, mas é o coração do negócio. Você tem medo só de pensar em trocar.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="#diagnostico"
             className="inline-block font-mono text-sm text-cyan hover:text-offwhite border-b border-cyan/40 hover:border-offwhite pb-0.5 transition-colors">
            Quero conversar sobre a minha dor →
          </a>
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
            <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-sans text-3xl font-extrabold text-cyan">1</span>
                <span className="font-mono text-xs text-steel uppercase tracking-wider">Conversa inicial</span>
              </div>
              <h3 className="font-sans text-xl font-bold text-offwhite mb-2">A gente escuta. De graça.</h3>
              <p className="text-steel text-sm leading-relaxed">
                30 minutos. Você conta o que tá te incomodando, a gente faz pergunta certa. No fim, falamos com honestidade se vale a pena construir do zero ou existe sistema pronto que resolve.
              </p>
            </div>
            <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-sans text-3xl font-extrabold text-cyan">2</span>
                <span className="font-mono text-xs text-steel uppercase tracking-wider">Proposta clara</span>
              </div>
              <h3 className="font-sans text-xl font-bold text-offwhite mb-2">Em 5 dias você sabe o quanto custa</h3>
              <p className="text-steel text-sm leading-relaxed">
                Documento simples: o que vai ser feito, em quanto tempo e quanto custa. Sem letra miúda, sem surpresa no fim. Você compara com o que tá pagando hoje.
              </p>
            </div>
            <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-sans text-3xl font-extrabold text-cyan">3</span>
                <span className="font-mono text-xs text-steel uppercase tracking-wider">Construção</span>
              </div>
              <h3 className="font-sans text-xl font-bold text-offwhite mb-2">Entregas a cada 2 semanas</h3>
              <p className="text-steel text-sm leading-relaxed">
                Não desaparecemos por 6 meses. A cada 2 semanas você vê algo funcionando e testa de verdade. Mudou de ideia no meio? A gente ajusta sem drama.
              </p>
            </div>
            <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-sans text-3xl font-extrabold text-cyan">4</span>
                <span className="font-mono text-xs text-steel uppercase tracking-wider">Acompanhamento</span>
              </div>
              <h3 className="font-sans text-xl font-bold text-offwhite mb-2">Continuamos do seu lado</h3>
              <p className="text-steel text-sm leading-relaxed">
                Sistema entregue não é fim do projeto. A gente continua monitorando, corrigindo, melhorando — pra que ele cresça junto com seu negócio.
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
