'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input, Textarea, Select } from '@/components/ui'
import { trackLead } from '@/lib/analytics'

const WHATSAPP_URL = 'https://wa.me/5547997352380?text=Ol%C3%A1%2C+preciso+trocar+um+sistema+antigo'

export default function MigracaoLP() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      type: String(data.get('type') || 'Trocar sistema antigo'),
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
        <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-4 uppercase">Trocar programa antigo</p>
        <h1 className="font-sans text-4xl md:text-6xl font-extrabold text-offwhite mb-6 leading-[1.05]">
          Troque seu sistema antigo<br />
          <span className="text-cyan">sem parar a empresa.</span>
        </h1>
        <p className="text-steel text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
          A gente substitui aquele programa pesado e cheio de erro por um novo, moderno e que funciona — sem perder dado, sem parar o atendimento, sem deixar seu time perdido.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#conversar">
            <Button variant="primary">Quero uma análise gratuita</Button>
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
            <p className="font-sans text-3xl font-extrabold text-cyan">0</p>
            <p className="text-steel text-xs mt-1 uppercase tracking-wider">Parada da empresa</p>
          </div>
          <div>
            <p className="font-sans text-3xl font-extrabold text-cyan">100%</p>
            <p className="text-steel text-xs mt-1 uppercase tracking-wider">Dados preservados</p>
          </div>
          <div>
            <p className="font-sans text-3xl font-extrabold text-cyan">7 dias</p>
            <p className="text-steel text-xs mt-1 uppercase tracking-wider">Análise gratuita pronta</p>
          </div>
          <div>
            <p className="font-sans text-3xl font-extrabold text-cyan">+10</p>
            <p className="text-steel text-xs mt-1 uppercase tracking-wider">Anos lidando com sistemas antigos</p>
          </div>
        </div>
      </section>

      {/* WHEN TO MIGRATE */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-offwhite mb-4 leading-tight">
            É hora de trocar quando<br />
            <span className="text-cyan">você sente que…</span>
          </h2>
          <p className="text-steel text-base max-w-lg mx-auto">
            Se você se identifica com pelo menos um, dá pra resolver.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
            <div className="text-4xl mb-4">🐢</div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-3 leading-snug">
              O sistema fica mais lento a cada mês
            </h3>
            <p className="text-steel text-sm leading-relaxed">
              Telas demoram para abrir, consultas travam, cliente fica esperando no telefone. Seu time já tem rotina de <strong className="text-offwhite">reiniciar o computador todo dia</strong>.
            </p>
          </div>

          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-3 leading-snug">
              A tecnologia é tão antiga que ninguém mais dá suporte
            </h3>
            <p className="text-steel text-sm leading-relaxed">
              Programas de <strong className="text-offwhite">15, 20 anos atrás</strong>. Fabricante parou de atualizar, brechas de segurança vão se acumulando, e cada erro vira drama porque ninguém sabe consertar.
            </p>
          </div>

          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
            <div className="text-4xl mb-4">👻</div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-3 leading-snug">
              Quem fez o sistema sumiu
            </h3>
            <p className="text-steel text-sm leading-relaxed">
              O profissional que entendia já não trabalha mais. <strong className="text-offwhite">Qualquer mudança vira projeto de 3 meses</strong> porque ninguém sabe como aquilo foi feito por dentro.
            </p>
          </div>

          <div className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="font-sans text-xl font-bold text-offwhite mb-3 leading-snug">
              O sistema impede a empresa de crescer
            </h3>
            <p className="text-steel text-sm leading-relaxed">
              Não aguenta mais usuário, não conversa com sistemas modernos, não funciona no celular. <strong className="text-offwhite">Você quer expandir e o sistema é o freio</strong>.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="#conversar"
             className="inline-block font-mono text-sm text-cyan hover:text-offwhite border-b border-cyan/40 hover:border-offwhite pb-0.5 transition-colors">
            Quero conversar sobre o meu caso →
          </a>
        </div>
      </section>

      {/* HOW WE DO */}
      <section className="bg-white/[0.015] border-y border-white/[0.06] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Como fazemos</p>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 leading-tight">
              Trocamos aos poucos.<br />
              <span className="text-cyan">Com plano B sempre pronto.</span>
            </h2>
            <p className="text-steel text-base max-w-2xl mx-auto leading-relaxed">
              Não fazemos a troca de uma vez só. Vamos por partes, testando cada uma, com possibilidade de voltar atrás a qualquer momento. Você nunca fica no escuro.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                n: '1',
                t: 'A gente entende o que você tem hoje',
                d: 'Mapeamos o sistema antigo por dentro. Anotamos cada tela, cada regra escondida, cada relatório que você usa de verdade. Você ganha um mapa antes da gente mexer em qualquer coisa.',
              },
              {
                n: '2',
                t: 'Combinamos a estratégia certa pra você',
                d: 'Existem vários jeitos de trocar um sistema: troca total, troca por partes, ou rodando os dois juntos por um tempo. Cada situação pede uma abordagem — explicamos as opções de um jeito que dá pra escolher.',
              },
              {
                n: '3',
                t: 'Trocamos parte por parte, com volta garantida',
                d: 'Cada pedaço do sistema vai pro ar separado, depois de testado. Se algo der ruim — o que é raro — voltamos pra versão antiga em minutos. Você nunca fica na mão.',
              },
              {
                n: '4',
                t: 'Garantia de que nenhum dado se perde',
                d: 'Comparamos automaticamente o que tinha no sistema antigo com o que tem no novo. Cliente, venda, nota fiscal, histórico — tudo bate. Perder dado é inegociável.',
              },
              {
                n: '5',
                t: 'Treinamos seu time antes de desligar o velho',
                d: 'Quando chegar a hora de desligar o sistema antigo de vez, seu time já vai estar usando o novo há semanas. Sem trauma, sem treinamento corrido, sem cliente esperando.',
              },
            ].map(({ n, t, d }) => (
              <div key={n} className="border border-white/[0.08] rounded-xl p-6 bg-gradient-to-br from-white/[0.03] to-transparent">
                <div className="flex items-start gap-5">
                  <span className="font-sans text-4xl font-extrabold text-cyan shrink-0 leading-none">{n}</span>
                  <div>
                    <h3 className="font-sans text-lg font-bold text-offwhite mb-2">{t}</h3>
                    <p className="text-steel text-sm leading-relaxed">{d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHICH SYSTEMS */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Quais sistemas trocamos</p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 leading-tight">
            Reconhece <span className="text-cyan">algum desses?</span>
          </h2>
          <p className="text-steel text-base max-w-2xl mx-auto leading-relaxed">
            Se o sistema que você tem hoje parece com algum desses, é o tipo de coisa que a gente troca.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
            <div className="text-3xl mb-3">💾</div>
            <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Sistema instalado em cada computador</h3>
            <p className="text-steel text-sm leading-relaxed">
              Aquele que precisa instalar disquete, CD ou pen drive. Funciona só nas máquinas onde foi instalado. Pra mudar de computador é dor de cabeça. Pra acessar de casa, esquece.
            </p>
          </div>
          <div className="border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
            <div className="text-3xl mb-3">📞</div>
            <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Sistema que só roda no servidor da sua sala</h3>
            <p className="text-steel text-sm leading-relaxed">
              Aquele computador grande na sala do TI. Se ele cai, ninguém trabalha. Faltou luz? Empresa parou. Funcionário em casa? Não acessa. Não dá mais.
            </p>
          </div>
          <div className="border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Tela cinza e azul de Windows 95</h3>
            <p className="text-steel text-sm leading-relaxed">
              Aquele visual de programa de 20 anos atrás. Funcionário novo demora pra aprender, gera erro porque não entende, e dá vergonha de mostrar pro cliente.
            </p>
          </div>
          <div className="border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
            <div className="text-3xl mb-3">🧾</div>
            <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Planilhas gigantes que viraram &quot;o sistema&quot;</h3>
            <p className="text-steel text-sm leading-relaxed">
              A empresa cresceu em cima de planilhas. Hoje tem 30 arquivos diferentes, ninguém entende quem mexe no quê, e basta um clique errado pra perder tudo.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white/[0.015] border-y border-white/[0.06] py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Dúvidas frequentes</p>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite leading-tight">
              Perguntas que <span className="text-cyan">todo mundo faz.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'A minha empresa vai parar enquanto vocês trocam?',
                a: 'Não. Esse é o ponto mais importante de como a gente trabalha. A gente faz a troca aos poucos, mantendo o sistema antigo no ar enquanto o novo vai sendo construído. Você só desliga o velho quando o novo já está funcionando há semanas — e seu time já está usando.',
              },
              {
                q: 'Vou perder dados antigos?',
                a: 'Não. Garantimos que todo cliente, venda, histórico e relatório do sistema antigo vai pro novo. Fazemos comparações automáticas pra ter certeza de que nenhum número some. Se algum dado for ruim ou inconsistente, te avisamos antes de mexer.',
              },
              {
                q: 'Quanto tempo leva pra trocar um sistema inteiro?',
                a: 'Depende do tamanho. Sistemas pequenos: 2 a 4 meses. Médios: 6 a 9 meses. Grandes ou complexos: 12 meses ou mais. Mas você não espera o fim pra ver resultado — entregamos partes funcionando desde o primeiro mês.',
              },
              {
                q: 'Quanto custa?',
                a: 'Trocar um sistema parte de R$ 20 mil pra projetos simples e pode passar de R$ 100 mil pra empresas maiores. A análise inicial é grátis — em 7 dias devolvemos um relatório com riscos, prazo realista e valor. Você decide se topa ou não.',
              },
              {
                q: 'E se eu não souber em que tecnologia meu sistema foi feito?',
                a: 'Não tem problema. A gente descobre. Na análise gratuita olhamos o sistema, conversamos com quem usa e quem mantém (se ainda tiver alguém). Você não precisa explicar nada técnico — a gente trabalha com isso há mais de 10 anos.',
              },
              {
                q: 'Meu sistema é muito específico do meu setor. Vocês conseguem mesmo?',
                a: 'Sim. A gente já trocou sistema de produtora de eventos, clínica, escritório de advocacia, contabilidade, transportadora, indústria. O segredo não é conhecer seu setor — é escutar você que conhece — e traduzir isso em algo que funcione melhor.',
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
        </div>
      </section>

      {/* FORM */}
      <section id="conversar" className="py-20">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase text-center">Análise gratuita</p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 text-center">
            Análise do seu sistema atual.<br />
            <span className="text-cyan">De graça. Em 7 dias.</span>
          </h2>
          <p className="text-steel text-base text-center mb-10 leading-relaxed">
            Conta o que você tem hoje. A gente devolve um relatório com os riscos do sistema, prazo realista pra troca e uma proposta — sem compromisso.
          </p>

          {done ? (
            <div className="text-center border border-cyan/40 rounded-lg p-8 bg-cyan/5">
              <p className="text-cyan font-bold text-lg mb-2">✓ Recebemos seu pedido</p>
              <p className="text-steel text-sm">Abrindo o WhatsApp em alguns segundos...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" placeholder="Seu nome" required aria-label="Nome" />
              <Input name="email" type="email" placeholder="Seu e-mail" required aria-label="E-mail" />
              <Select name="type" defaultValue="Trocar sistema inteiro" required aria-label="O que você precisa">
                <option value="Trocar sistema inteiro">Trocar o sistema inteiro</option>
                <option value="Trocar partes">Trocar só algumas partes</option>
                <option value="Modernizar visual">Modernizar o visual e jeito de usar</option>
                <option value="Análise primeiro">Quero só uma análise por enquanto</option>
              </Select>
              <Textarea
                name="message"
                rows={4}
                placeholder="Conta rapidinho o que você tem hoje e o que mais te incomoda. Não precisa formalidade."
                aria-label="Mensagem"
              />
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Quero análise gratuita →'}
              </Button>
              <p className="text-steel text-xs text-center mt-3">
                A gente abre o WhatsApp na sequência pra continuar a conversa. Você não recebe spam.
              </p>
            </form>
          )}
        </div>
      </section>

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
