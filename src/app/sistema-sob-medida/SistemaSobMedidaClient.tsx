'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input, Textarea, Select } from '@/components/ui'
import { trackLead } from '@/lib/analytics'
import { FAQ_ITEMS } from './faq'
import SecretariaChat from './SecretariaChat'

const WHATSAPP_URL = 'https://wa.me/5547997352380?text=Ol%C3%A1%2C+quero+um+diagn%C3%B3stico+gratuito+para+um+sistema+sob+medida'

export default function SistemaSobMedidaClient() {
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

      {/* HERO — 2 colunas: mensagem à esquerda, formulário visível à direita */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-16">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 items-center">
          {/* Mensagem */}
          <div className="lg:col-span-7">
            <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-4 uppercase">Sistema sob medida para empresas</p>
            <h1 className="font-sans text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-offwhite mb-5 leading-[1.06]">
              Um sistema feito <span className="text-cyan">sob medida</span> para o jeito que sua empresa trabalha.
            </h1>
            <p className="text-steel text-lg leading-relaxed mb-6 max-w-xl">
              Sistemas, aplicativos e automações que se encaixam no seu processo — mesmo que você não entenda nada de tecnologia. Você explica o problema, a gente resolve.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-steel">
              <span className="flex items-center gap-2"><span className="text-cyan font-bold">✓</span> 3 sistemas próprios no ar</span>
              <span className="flex items-center gap-2"><span className="text-cyan font-bold">✓</span> +10 anos de experiência</span>
              <span className="flex items-center gap-2"><span className="text-cyan font-bold">✓</span> Conversa grátis em 30 min</span>
            </div>
          </div>

          {/* Formulário compacto — visível acima da dobra */}
          <div className="lg:col-span-5">
            <div id="conversar-topo" className="border border-cyan/25 rounded-2xl p-6 bg-gradient-to-br from-cyan/[0.07] to-white/[0.02] shadow-2xl">
              {done ? (
                <div className="text-center py-8">
                  <p className="text-cyan font-bold text-lg mb-2">✓ Recebemos seu pedido</p>
                  <p className="text-steel text-sm">Abrindo o WhatsApp em alguns segundos...</p>
                </div>
              ) : (
                <>
                  <p className="font-mono text-[11px] tracking-[0.12em] text-cyan uppercase mb-1.5">Diagnóstico gratuito</p>
                  <h2 className="font-sans text-xl font-extrabold text-offwhite mb-1 leading-tight">Fale com a gente em 30 min</h2>
                  <p className="text-steel text-sm mb-5">Sem compromisso. Resposta em até 24 horas.</p>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <Input name="name" placeholder="Seu nome" required aria-label="Seu nome" />
                    <Input name="email" type="email" placeholder="Seu melhor e-mail" required aria-label="Seu e-mail" />
                    <Select name="type" defaultValue="Não sei ainda" required aria-label="O que você precisa">
                      <option value="Sistema novo">Quero um sistema novo</option>
                      <option value="Aplicativo de celular">Quero um aplicativo</option>
                      <option value="Automação de processos">Quero automatizar processos</option>
                      <option value="Conectar sistemas">Conectar sistemas que já tenho</option>
                      <option value="Trocar sistema antigo">Modernizar um sistema antigo</option>
                      <option value="Não sei ainda">Não sei ainda — quero o diagnóstico</option>
                    </Select>
                    <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                      {submitting ? 'Enviando...' : 'Quero meu diagnóstico grátis →'}
                    </Button>
                  </form>
                  <p className="text-steel text-[11px] text-center mt-3">
                    Abrimos o WhatsApp na sequência pra continuar. Sem spam.
                  </p>
                </>
              )}
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
               className="block text-center mt-3 font-mono text-[13px] text-cyan hover:text-offwhite transition-colors">
              Prefere WhatsApp? Falar agora →
            </a>
          </div>
        </div>
      </section>

      {/* NO TECH NEEDED */}
      <section className="border-y border-white/[0.06] py-12 bg-cyan/[0.03]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-offwhite mb-4 leading-tight">
            Você não precisa saber explicar em <span className="text-cyan">linguagem técnica.</span>
          </h2>
          <p className="text-steel text-base md:text-lg leading-relaxed">
            A maioria dos clientes não chega com um escopo pronto. Eles chegam com problemas: planilhas confusas, tarefas manuais, sistema antigo, equipe perdendo tempo ou processos que não conversam entre si. Nosso papel é entender sua rotina e transformar isso em um sistema funcional.
          </p>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="border-b border-white/[0.06] py-8 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="font-sans text-3xl font-extrabold text-cyan">Grátis</p>
            <p className="text-steel text-xs mt-1 uppercase tracking-wider">Diagnóstico inicial</p>
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
            Sua empresa cresceu, mas<br />
            <span className="text-cyan">os controles ficaram para trás?</span>
          </h2>
          <p className="text-steel text-base max-w-lg mx-auto">
            Se você se reconhece em pelo menos um destes, dá pra resolver.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { i: '📊', t: 'Sua equipe ainda depende de planilhas para controlar tudo.' },
            { i: '💬', t: 'O WhatsApp virou o centro da operação — e nada fica organizado.' },
            { i: '💸', t: 'Você paga por um sistema pronto, mas ele nunca atende 100%.' },
            { i: '⚠️', t: 'Seu sistema antigo trava, dá erro ou ninguém quer mexer.' },
            { i: '🧩', t: 'As informações ficam espalhadas em lugares diferentes.' },
            { i: '🔁', t: 'Tarefas repetitivas tomam tempo da equipe todos os dias.' },
            { i: '📱', t: 'Você precisa de um app, painel ou sistema próprio e não sabe por onde começar.' },
            { i: '⏱️', t: 'O retrabalho gera erros, atrasos e cliente reclamando.' },
          ].map(({ i, t }) => (
            <div key={t} className="flex items-start gap-4 border border-white/[0.08] rounded-xl p-5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
              <div className="text-2xl shrink-0">{i}</div>
              <p className="text-steel text-sm md:text-base leading-relaxed pt-0.5">{t}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#conversar"
             className="inline-block font-mono text-sm text-cyan hover:text-offwhite border-b border-cyan/40 hover:border-offwhite pb-0.5 transition-colors">
            Quero um diagnóstico gratuito da minha situação →
          </a>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="bg-white/[0.015] border-y border-white/[0.06] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Soluções sob medida</p>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 leading-tight">
              O que podemos criar<br />
              <span className="text-cyan">para sua empresa.</span>
            </h2>
            <p className="text-steel text-base max-w-2xl mx-auto leading-relaxed">
              Não importa o tamanho do seu negócio. A gente avalia seu caso e indica o melhor caminho — sem te empurrar mais um programa de prateleira.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                i: '🖥️',
                t: 'Sistema web sob medida',
                d: 'Para organizar processos internos, cadastros, atendimentos, financeiro, estoque, vendas ou operação.',
              },
              {
                i: '📱',
                t: 'Aplicativo para clientes ou equipe',
                d: 'Para facilitar atendimento, pedidos, agendamentos, comunicação ou acompanhamento de serviços.',
              },
              {
                i: '⚙️',
                t: 'Automação de processos',
                d: 'Para reduzir tarefas manuais, retrabalho e erros operacionais do dia a dia.',
              },
              {
                i: '🔗',
                t: 'Integração entre sistemas',
                d: 'Para conectar ferramentas que hoje não conversam entre si e centralizar as informações.',
              },
              {
                i: '🔄',
                t: 'Modernização de sistema antigo',
                d: 'Para melhorar sistemas lentos, ultrapassados ou difíceis de manter — por etapas e com segurança.',
              },
              {
                i: '🧭',
                t: 'Não sabe o que precisa?',
                d: 'Tudo bem. No diagnóstico gratuito a gente entende sua rotina e indica o caminho certo para o seu caso.',
              },
            ].map(({ i, t, d }) => (
              <div key={t} className="border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
                <div className="text-3xl mb-4">{i}</div>
                <h3 className="font-sans text-lg font-bold text-offwhite mb-2 leading-snug">{t}</h3>
                <p className="text-steel text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Atendemos</p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 leading-tight">
            Empresas e profissionais<br />
            <span className="text-cyan">que querem parar de se virar.</span>
          </h2>
          <p className="text-steel text-base max-w-2xl mx-auto leading-relaxed">
            Clínicas, consultórios, pequenas e médias empresas. Se você sente que precisa de algo feito pra você — e não mais um programa de prateleira — a gente consegue resolver.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { i: '👨‍⚕️', t: 'Clínicas e consultórios' },
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
      </section>

      {/* HOW WE WORK */}
      <section className="bg-white/[0.015] border-y border-white/[0.06] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Como funciona</p>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 leading-tight">
              Direto ao ponto.<br />
              <span className="text-cyan">Sem enrolação.</span>
            </h2>
            <p className="text-steel text-base max-w-2xl mx-auto leading-relaxed">
              Cada passo combinado com você. Sem palavra difícil, sem letra miúda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                n: '1',
                tag: 'Diagnóstico gratuito',
                t: 'A gente escuta o seu problema.',
                d: 'Você conta o problema, a rotina da empresa e o que gostaria de melhorar. Essa conversa é gratuita e sem compromisso.',
              },
              {
                n: '2',
                tag: 'Proposta clara',
                t: 'Você sabe o escopo, o prazo e o investimento.',
                d: 'Avaliamos o escopo, sugerimos o melhor caminho e apresentamos investimento, prazo e formato de trabalho — sem surpresa no fim.',
              },
              {
                n: '3',
                tag: 'Protótipo',
                t: 'Uma primeira visão antes de avançar.',
                d: 'Quando fizer sentido, criamos um protótipo ou primeira versão para validar a solução antes de seguir com o desenvolvimento completo.',
              },
              {
                n: '4',
                tag: 'Desenvolvimento por etapas',
                t: 'Você acompanha cada entrega.',
                d: 'Entregamos em ciclos, com acompanhamento e validação ao longo do projeto. Você vê o sistema tomando forma e usa de verdade.',
              },
              {
                n: '5',
                tag: 'Implantação e treinamento',
                t: 'Sua equipe começa a usar com apoio.',
                d: 'Ajudamos sua equipe a começar a usar o sistema no dia a dia, sem susto e sem ficar travado.',
              },
              {
                n: '6',
                tag: 'Manutenção mensal opcional',
                t: 'Suporte e evolução, se você quiser.',
                d: 'Após a entrega, você pode contratar um plano mensal pago para suporte, correções, melhorias e evolução contínua. É opcional e cobrado à parte do projeto.',
              },
            ].map(({ n, tag, t, d }) => (
              <div key={n} className="relative border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-sans text-3xl font-extrabold text-cyan">{n}</span>
                  <span className="font-mono text-xs text-steel uppercase tracking-wider">{tag}</span>
                </div>
                <h3 className="font-sans text-lg font-bold text-offwhite mb-2">{t}</h3>
                <p className="text-steel text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Investimento</p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 leading-tight">
            Quanto custa um <span className="text-cyan">sistema sob medida?</span>
          </h2>
          <p className="text-steel text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Depende do tamanho e da complexidade. Um sistema simples pode começar a partir de{' '}
            <strong className="text-offwhite">R$ 8 mil</strong>. Projetos mais completos, com aplicativo, integrações, automações e painéis administrativos, podem ultrapassar{' '}
            <strong className="text-offwhite">R$ 50 mil</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
            <p className="font-mono text-xs text-cyan uppercase tracking-wider mb-2">Investimento do projeto</p>
            <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Pago por projeto ou por etapas</h3>
            <p className="text-steel text-sm leading-relaxed">
              É o valor para desenvolver o sistema, aplicativo ou automação. Definido na proposta, depois do diagnóstico, conforme o escopo combinado.
            </p>
          </div>
          <div className="border border-white/[0.08] rounded-xl p-7 bg-gradient-to-br from-white/[0.03] to-transparent">
            <p className="font-mono text-xs text-cyan uppercase tracking-wider mb-2">Manutenção mensal · opcional</p>
            <h3 className="font-sans text-lg font-bold text-offwhite mb-2">Plano mensal pago, à parte</h3>
            <p className="text-steel text-sm leading-relaxed">
              Depois da entrega, caso queira suporte contínuo, correções, melhorias ou novas funcionalidades, oferecemos planos pagos de manutenção mensal. Esse valor é separado do investimento inicial do projeto.
            </p>
          </div>
        </div>

        <p className="text-steel text-sm text-center mt-8 max-w-2xl mx-auto leading-relaxed">
          O valor exato só é definido depois do diagnóstico. Não trabalhamos com preço fechado sem entender o seu caso — e isso protege você de pagar pelo que não precisa.
        </p>
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
                NotaFácil, Descrição AI e Agenda Inteligente — com clientes pagando há anos.
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
              <p className="font-sans text-5xl font-extrabold text-cyan mb-2">+10</p>
              <p className="font-sans text-base font-bold text-offwhite mb-1">Anos de experiência</p>
              <p className="text-steel text-sm leading-relaxed">
                Desenvolvimento profissional, com escopo claro e acompanhamento ao longo do projeto.
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
          {FAQ_ITEMS.map(({ q, a }, i) => (
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
          <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase text-center">Diagnóstico gratuito</p>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 text-center">
            Conta o seu problema.<br />
            <span className="text-cyan">A gente avalia de graça.</span>
          </h2>
          <p className="text-steel text-base text-center mb-10 leading-relaxed">
            No diagnóstico gratuito entendemos sua rotina e avaliamos se vale a pena criar um sistema, app ou automação sob medida. Se fizer sentido, apresentamos uma proposta. Se não, falamos com honestidade. Resposta em até 24 horas.
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
                <option value="Aplicativo de celular">Quero um aplicativo</option>
                <option value="Automação de processos">Quero automatizar processos</option>
                <option value="Conectar sistemas">Conectar sistemas que já tenho</option>
                <option value="Trocar sistema antigo">Modernizar um sistema antigo</option>
                <option value="Não sei ainda">Não sei ainda — quero o diagnóstico</option>
              </Select>
              <Textarea
                name="message"
                rows={4}
                placeholder="Conta rapidinho o que tá te incomodando, ou o que você gostaria de melhorar. Não precisa de formalidade nem termo técnico."
                aria-label="Mensagem"
              />
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Quero um diagnóstico gratuito →'}
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

      {/* Assistente comercial (Sonnet) — atende o tráfego de anúncios */}
      <SecretariaChat />
    </main>
  )
}
