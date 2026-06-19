'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input, Textarea, Select, Card } from '@/components/ui'
import { trackLead } from '@/lib/analytics'

const WHATSAPP_URL = 'https://wa.me/5547997352380?text=Ol%C3%A1%2C+preciso+migrar+um+sistema+legado'

export default function MigracaoLP() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      type: String(data.get('type') || 'Migração de sistema'),
      message: String(data.get('message') || ''),
      source: 'lp-migracao-legado',
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
        <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-4 uppercase">Migração de sistemas legados</p>
        <h1 className="font-sans text-4xl md:text-6xl font-extrabold text-offwhite mb-6 leading-[1.05]">
          Migre seu sistema legado<br />
          <span className="text-cyan">sem parar a operação.</span>
        </h1>
        <p className="text-steel text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
          Modernizamos sistemas antigos com zero downtime. Você mantém o que funciona, troca o que dói — com plano de migração documentado e integridade de dados garantida.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#diagnostico">
            <Button variant="primary">Quero análise gratuita</Button>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost">Falar no WhatsApp</Button>
          </a>
        </div>
      </section>

      {/* WHEN TO MIGRATE */}
      <section className="border-y border-white/[0.06] py-16 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-12 text-center">
            Hora de migrar quando…
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-white/[0.08] rounded-lg p-6">
              <p className="text-cyan font-mono text-xs uppercase tracking-wider mb-3">🐢 Performance</p>
              <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Sistema fica mais lento a cada mês</h3>
              <p className="text-steel text-sm leading-relaxed">
                Consultas que demoram 30 segundos, telas que travam, banco crescendo sem controle. Já está custando produtividade real.
              </p>
            </div>
            <div className="border border-white/[0.08] rounded-lg p-6">
              <p className="text-cyan font-mono text-xs uppercase tracking-wider mb-3">🔒 Segurança</p>
              <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Stack antigo sem suporte</h3>
              <p className="text-steel text-sm leading-relaxed">
                Delphi 7, PHP 5.6, .NET Framework antigo, banco Firebird/Oracle 9i. Vulnerabilidades acumuladas sem patches.
              </p>
            </div>
            <div className="border border-white/[0.08] rounded-lg p-6">
              <p className="text-cyan font-mono text-xs uppercase tracking-wider mb-3">👻 Dev que sumiu</p>
              <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Ninguém mais entende o código</h3>
              <p className="text-steel text-sm leading-relaxed">
                O dev original saiu, ninguém da equipe atual conhece, e qualquer mudança vira projeto arqueológico de 3 meses.
              </p>
            </div>
            <div className="border border-white/[0.08] rounded-lg p-6">
              <p className="text-cyan font-mono text-xs uppercase tracking-wider mb-3">📈 Crescimento travado</p>
              <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Sistema impede escalar</h3>
              <p className="text-steel text-sm leading-relaxed">
                Não suporta mais usuários, não conversa com sistemas modernos, não tem API. Está limitando o crescimento do negócio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE DO */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase text-center">Como migramos</p>
        <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-12 text-center">
          Migração progressiva, com plano B sempre pronto
        </h2>

        <div className="space-y-6">
          <div className="border border-white/[0.08] rounded-lg p-6">
            <div className="flex items-start gap-4">
              <span className="font-mono text-cyan text-2xl font-bold shrink-0">01</span>
              <div>
                <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Auditoria do sistema atual</h3>
                <p className="text-steel text-sm leading-relaxed">
                  Documentamos código, banco, integrações e regras de negócio escondidas. Você ganha um mapa antes de mexer em nada.
                </p>
              </div>
            </div>
          </div>
          <div className="border border-white/[0.08] rounded-lg p-6">
            <div className="flex items-start gap-4">
              <span className="font-mono text-cyan text-2xl font-bold shrink-0">02</span>
              <div>
                <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Estratégia de migração</h3>
                <p className="text-steel text-sm leading-relaxed">
                  Big bang, strangler fig ou paralelo? Escolhemos a abordagem certa pro seu risco e velocidade necessários.
                </p>
              </div>
            </div>
          </div>
          <div className="border border-white/[0.08] rounded-lg p-6">
            <div className="flex items-start gap-4">
              <span className="font-mono text-cyan text-2xl font-bold shrink-0">03</span>
              <div>
                <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Migração por módulo, com rollback</h3>
                <p className="text-steel text-sm leading-relaxed">
                  Cada módulo vai pra produção sozinho, com plano de rollback testado. Se algo der errado, voltamos em minutos.
                </p>
              </div>
            </div>
          </div>
          <div className="border border-white/[0.08] rounded-lg p-6">
            <div className="flex items-start gap-4">
              <span className="font-mono text-cyan text-2xl font-bold shrink-0">04</span>
              <div>
                <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Validação contínua de dados</h3>
                <p className="text-steel text-sm leading-relaxed">
                  Conciliações automáticas entre sistema velho e novo. Zero perda de dado é não-negociável.
                </p>
              </div>
            </div>
          </div>
          <div className="border border-white/[0.08] rounded-lg p-6">
            <div className="flex items-start gap-4">
              <span className="font-mono text-cyan text-2xl font-bold shrink-0">05</span>
              <div>
                <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Treinamento e cutover</h3>
                <p className="text-steel text-sm leading-relaxed">
                  Time treinado antes do switch. Documentação completa. Desligamos o sistema velho com tranquilidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="bg-white/[0.015] border-y border-white/[0.06] py-16 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Migramos de…</p>
          <h2 className="font-sans text-3xl font-extrabold text-offwhite mb-6">
            Stack legado → Stack moderno
          </h2>
          <p className="text-steel text-base max-w-2xl mx-auto leading-relaxed">
            <strong className="text-offwhite">De:</strong> Delphi · VB6 · PHP &lt; 7 · .NET Framework · Oracle 9i/10g · Firebird · Access · jQuery legado<br /><br />
            <strong className="text-offwhite">Para:</strong> Next.js · React · Node.js · Go · TypeScript · PostgreSQL · Supabase · AWS · Vercel · Docker
          </p>
        </div>
      </section>

      {/* FORM */}
      <section id="diagnostico" className="py-20">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase text-center">Análise gratuita</p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 text-center">
            Diagnóstico técnico do seu sistema.<br />
            <span className="text-cyan">Sem custo. Em 7 dias.</span>
          </h2>
          <p className="text-steel text-base text-center mb-10 leading-relaxed">
            Conta o que você tem hoje. Devolvemos um relatório com riscos, prazo realista de migração e proposta.
          </p>

          {done ? (
            <div className="text-center border border-cyan/40 rounded-lg p-8 bg-cyan/5">
              <p className="text-cyan font-bold text-lg mb-2">✓ Recebemos seu pedido</p>
              <p className="text-steel text-sm">Redirecionando para o WhatsApp em segundos...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" placeholder="Seu nome" required aria-label="Nome" />
              <Input name="email" type="email" placeholder="E-mail corporativo" required aria-label="E-mail" />
              <Select name="type" defaultValue="Migração completa" required aria-label="Tipo">
                <option value="Migração completa">Migração completa do sistema</option>
                <option value="Migração parcial">Migrar módulos específicos</option>
                <option value="Modernização de banco">Modernização de banco de dados</option>
                <option value="Auditoria primeiro">Quero só uma auditoria primeiro</option>
              </Select>
              <Textarea
                name="message"
                rows={4}
                placeholder="Tecnologia atual, tamanho do sistema, principais dores. Quanto mais contexto, melhor."
                aria-label="Detalhes"
              />
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Pedir análise gratuita →'}
              </Button>
              <p className="text-steel text-xs text-center mt-3">
                Ao enviar, abrimos o WhatsApp pra continuar a conversa. Você não recebe spam.
              </p>
            </form>
          )}
        </div>
      </section>

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
