'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input, Textarea, Select } from '@/components/ui'
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
      {/* Minimal nav */}
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
        <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-4 uppercase">Para empresas e profissionais</p>
        <h1 className="font-sans text-4xl md:text-6xl font-extrabold text-offwhite mb-6 leading-[1.05]">
          Um sistema feito<br />
          <span className="text-cyan">do jeito que você trabalha.</span>
        </h1>
        <p className="text-steel text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
          Sem forçar a sua empresa a se adaptar a programas prontos que quase servem. A gente cria o sistema certo pra você — seja um aplicativo no celular, no computador, ou os dois juntos.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#conversar">
            <Button variant="primary">Quero uma conversa sem compromisso</Button>
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
            <p className="text-steel text-xs mt-1 uppercase tracking-wider">Primeira versão funcionando</p>
          </div>
          <div>
            <p className="font-sans text-3xl font-extrabold text-cyan">+10</p>
            <p className="text-steel text-xs mt-1 uppercase tracking-wider">Anos construindo sistemas</p>
          </div>
          <div>
            <p className="font-sans text-3xl font-extrabold text-cyan">100%</p>
            <p className="text-steel text-xs mt-1 uppercase tracking-wider">Atendimento à distância</p>
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
              Funcionários gastam <strong className="text-offwhite">3, 4 horas por dia</strong> copiando informação de um lugar pro outro. Erros acontecem. Cliente reclama. E você sabe que isso podia estar funcionando sozinho.
            </p>
          </div>

          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-3 leading-snug">
              Paga por programa que não te serve
            </h3>
            <p className="text-steel text-sm leading-relaxed">
              Você assina <strong className="text-offwhite">R$ 500, R$ 2 mil por mês</strong> de um programa pronto que quase atende. Aquilo que você precisa mesmo? O fornecedor nunca vai fazer.
            </p>
          </div>

          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-3 leading-snug">
              Programa antigo travando tudo
            </h3>
            <p className="text-steel text-sm leading-relaxed">
              Aquele programa de <strong className="text-offwhite">10, 15 anos</strong> que ninguém quer mexer. Lento, dá erro toda hora, mas é o coração do negócio. Você tem medo só de pensar em trocar.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="#conversar"
             className="inline-block font-mono text-sm text-cyan hover:text-offwhite border-b border-cyan/40 hover:border-offwhite pb-0.5 transition-colors">
            Quero conversar sobre a minha situação →
          </a>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="bg-white/[0.015] border-y border-white/[0.06] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Atendemos</p>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 leading-tight">
              Empresas e profissionais<br />
              <span className="text-cyan">que querem parar de se virar.</span>
            </h2>
            <p className="text-steel text-base max-w-2xl mx-auto leading-relaxed">
              Não importa o tamanho do seu negócio. Se você sente que precisa de algo feito pra você — e não mais um programa de prateleira — a gente consegue resolver.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { i: '👨‍⚕️', t: 'Médicos e clínicas' },
              { i: '⚖️', t: 'Advogados e escritórios' },
              { i: '🧮', t: 'Contadores' },
              { i: '🏗️', t: 'Engenheiros e construtoras' },
              { i: '🛒', t: 'Lojas e e-commerce' },
              { i: '🏭', t: 'Indústrias e fábricas' },
              { i: '🚛', t: 'Transportadoras' },
              { i: '🎯', t: 'Outros profissionais' },
            ].map(({ i, t }) => (
              <div key={t} className="border border-white/[0.08] rounded-lg p-5 text-center bg-gradient-to-br from-white/[0.02] to-transparent">
                <div className="text-3xl mb-2">{i}</div>
                <p className="text-offwhite text-sm font-medium">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Como funciona</p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 leading-tight">
            Direto ao ponto.<br />
            <span className="text-cyan">Sem enrolação.</span>
          </h2>
          <p className="text-steel text-base max-w-2xl mx-auto leading-relaxed">
            Cada passo combinado com você. Sem palavra difícil, sem letra miúda, sem &quot;deixa comigo que depois eu te explico&quot;.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-sans text-3xl font-extrabold text-cyan">1</span>
              <span className="font-mono text-xs text-steel uppercase tracking-wider">A gente escuta</span>
            </div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-2">Uma conversa de 30 minutos. De graça.</h3>
            <p className="text-steel text-sm leading-relaxed">
              Você conta o que tá te incomodando. A gente pergunta. No fim, falamos com sinceridade se vale a pena construir do zero, ou se já existe alguma coisa pronta que resolve.
            </p>
          </div>
          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-sans text-3xl font-extrabold text-cyan">2</span>
              <span className="font-mono text-xs text-steel uppercase tracking-wider">Proposta clara</span>
            </div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-2">Em 5 dias você sabe quanto custa.</h3>
            <p className="text-steel text-sm leading-relaxed">
              Documento simples: o que vai ser feito, em quanto tempo e quanto custa. Sem letra miúda, sem surpresa no fim. Você compara com o que tá pagando hoje.
            </p>
          </div>
          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-sans text-3xl font-extrabold text-cyan">3</span>
              <span className="font-mono text-xs text-steel uppercase tracking-wider">Construímos juntos</span>
            </div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-2">Você vê algo pronto a cada 2 semanas.</h3>
            <p className="text-steel text-sm leading-relaxed">
              Não desaparecemos por 6 meses. A cada 2 semanas você vê uma parte funcionando e usa de verdade. Mudou de ideia no meio? A gente ajusta sem drama nem custo extra escondido.
            </p>
          </div>
          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-sans text-3xl font-extrabold text-cyan">4</span>
              <span className="font-mono text-xs text-steel uppercase tracking-wider">Continuamos do seu lado</span>
            </div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-2">Sistema entregue não é o fim.</h3>
            <p className="text-steel text-sm leading-relaxed">
              A gente continua acompanhando, corrigindo o que precisar e melhorando ao longo do tempo. O sistema cresce junto com seu negócio — e você sempre tem alguém pra resolver.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST / SOCIAL PROOF */}
      <section className="bg-white/[0.015] border-y border-white/[0.06] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Por que confiar</p>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 leading-tight">
              A gente usa o que <span className="text-cyan">vende.</span>
            </h2>
            <p className="text-steel text-base max-w-2xl mx-auto leading-relaxed">
              Antes de construir pro seu negócio, construímos pro nosso. Temos 3 programas próprios rodando hoje, com clientes reais pagando todo mês — e eles continuam pagando porque funcionam.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
              <p className="font-sans text-5xl font-extrabold text-cyan mb-2">3</p>
              <p className="font-sans text-base font-bold text-offwhite mb-1">Programas próprios</p>
              <p className="text-steel text-sm leading-relaxed">
                NotaFácil, EventGear e Agenda Inteligente — com clientes pagando há anos.
              </p>
            </div>
            <div className="text-center border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
              <p className="font-sans text-5xl font-extrabold text-cyan mb-2">+5</p>
              <p className="font-sans text-base font-bold text-offwhite mb-1">Anos no ar</p>
              <p className="text-steel text-sm leading-relaxed">
                Funcionando 24 horas por dia, sem cair, sem reclamação travando o cliente.
              </p>
            </div>
            <div className="text-center border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
              <p className="font-sans text-5xl font-extrabold text-cyan mb-2">0</p>
              <p className="font-sans text-base font-bold text-offwhite mb-1">Sumir no meio</p>
              <p className="text-steel text-sm leading-relaxed">
                Nunca largamos cliente na mão. Sistema seu, suporte nosso — desde sempre.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/cases" className="inline-block font-mono text-sm text-cyan hover:text-offwhite border-b border-cyan/40 hover:border-offwhite pb-0.5 transition-colors">
              Ver nossos 3 programas no ar →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Dúvidas frequentes</p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite leading-tight">
            Perguntas que <span className="text-cyan">todo mundo faz.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Quanto custa um sistema sob medida?',
              a: 'Depende do tamanho do projeto. Pra você ter uma ideia: um sistema simples pra começar parte de R$ 8 mil. Um sistema completo de gestão pode passar de R$ 50 mil. Na primeira conversa a gente entende seu caso e te dá um valor real em poucos dias — sem compromisso.',
            },
            {
              q: 'Eu sou pequeno, vale a pena ter algo feito só pra mim?',
              a: 'Vale, sim. Hoje em dia construir é muito mais barato do que era 10 anos atrás. Se você gasta horas todo dia em tarefa repetitiva, ou paga programa caro que não te serve direito, é provável que o sistema próprio se pague em poucos meses.',
            },
            {
              q: 'Quanto tempo leva pra ficar pronto?',
              a: 'A primeira versão funcionando fica pronta em 4 semanas. A gente entrega aos poucos pra você usar de verdade desde o início. O sistema completo varia conforme o projeto — pode ser 2 meses, 6 meses, 1 ano. A gente combina isso na proposta.',
            },
            {
              q: 'E se eu não souber nada de tecnologia?',
              a: 'Melhor ainda. A maioria dos nossos clientes não sabe. A nossa parte é traduzir o que você precisa em algo que funciona — não enrolar com palavra difícil. Se em algum momento você não entender o que falamos, é falha nossa.',
            },
            {
              q: 'Vocês atendem só Blumenau?',
              a: 'Não. Atendemos do Oiapoque ao Chuí, à distância. Reunião por vídeo, WhatsApp, e-mail. Você não precisa estar perto. Funciona pra qualquer lugar do Brasil.',
            },
            {
              q: 'Vocês somem depois que entregam?',
              a: 'Justamente o contrário. A gente fica do seu lado depois de pronto — corrigindo, melhorando e acompanhando o sistema funcionar. Sistema sem manutenção morre em pouco tempo. A gente não trabalha assim.',
            },
          ].map(({ q, a }, i) => (
            <details key={i} className="group border border-white/[0.08] rounded-xl p-6 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
              <summary className="cursor-pointer list-none font-sans text-base md:text-lg font-bold text-offwhite flex justify-between items-center gap-4">
                <span>{q}</span>
                <span className="text-cyan text-xl shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-steel text-sm leading-relaxed mt-4">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FORM CTA */}
      <section id="conversar" className="bg-white/[0.015] border-t border-white/[0.06] py-20">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase text-center">Vamos conversar</p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 text-center">
            30 minutos. Sem compromisso.<br />
            <span className="text-cyan">Resposta em até 24 horas.</span>
          </h2>
          <p className="text-steel text-base text-center mb-10 leading-relaxed">
            Conta pra gente o que tá pegando aí. Se fizer sentido a gente construir junto, marcamos. Se não, falamos com honestidade.
          </p>

          {done ? (
            <div className="text-center border border-cyan/40 rounded-lg p-8 bg-cyan/5">
              <p className="text-cyan font-bold text-lg mb-2">✓ Recebemos seu pedido</p>
              <p className="text-steel text-sm">Abrindo o WhatsApp em alguns segundos...</p>
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
                placeholder="Seu e-mail"
                required
                aria-label="Seu e-mail"
              />
              <Select name="type" defaultValue="Não sei ainda" required aria-label="O que você precisa">
                <option value="Sistema novo">Quero um sistema novo</option>
                <option value="Melhorar sistema">Melhorar um sistema que já tenho</option>
                <option value="Aplicativo de celular">Um aplicativo de celular</option>
                <option value="Trocar sistema antigo">Trocar um sistema antigo</option>
                <option value="Conectar sistemas">Conectar sistemas que já tenho</option>
                <option value="Não sei ainda">Não sei ainda — quero conversar</option>
              </Select>
              <Textarea
                name="message"
                rows={4}
                placeholder="Conta rapidinho o que tá te incomodando, ou o que você gostaria de ter. Não precisa formalidade."
                aria-label="Mensagem"
              />
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Quero conversar sem compromisso →'}
              </Button>
              <p className="text-steel text-xs text-center mt-3">
                A gente abre o WhatsApp na sequência pra continuar a conversa. Você não recebe spam.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-steel text-xs">
            ScantelburyDevs · Blumenau, SC · atendimento em todo o Brasil ·{' '}
            <a href="https://www.scantelburydevs.com.br" className="text-cyan hover:text-offwhite">scantelburydevs.com.br</a>
          </p>
        </div>
      </footer>
    </main>
  )
}
