import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cases — Produtos em produção',
  description: 'Estudos de caso reais: NotaFácil (emissão de NFS-e do MEI), EventGear (inventário para produtoras de eventos) e Agenda Inteligente (agendamento com IA). Tecnologia, desafios e resultados.',
}

const cases = [
  {
    slug: 'notafacil',
    name: 'NotaFácil',
    tagline: 'Emissão automatizada de NFS-e para MEI',
    url: 'https://www.emitirnotafacil.com.br/',
    category: 'SaaS B2C · API REST',
    desafio: 'MEIs brasileiros precisam emitir NFS-e obrigatória desde 2023, mas o portal nacional do governo é confuso, lento e bloqueia emissão em massa. ERPs e marketplaces precisam de uma API confiável.',
    solucao: 'API REST em Go integrada à Receita Federal Nacional (mTLS + certificado A1) com assinatura digital, fila assíncrona, retry inteligente e webhooks. Dashboard Next.js para emissão manual + planos por volume com cobrança via Stripe.',
    resultados: [
      'Emissão em < 3 segundos vs. 30s+ do portal oficial',
      'Tolerante a falhas: 99.9% de uptime mesmo quando a Receita cai',
      'Suporta múltiplos MEIs por conta (contadores)',
      'Integração com ERPs via API documentada com OpenAPI 3.0',
    ],
    stack: ['Go (Fiber)', 'PostgreSQL (Supabase)', 'Redis', 'RabbitMQ', 'Next.js 14', 'AWS Secrets Manager', 'Stripe Billing', 'Vercel + Railway'],
  },
  {
    slug: 'eventgear',
    name: 'EventGear',
    tagline: 'Gestão de inventário para produtoras de eventos',
    url: 'https://eventgear-web.h1dq2d.easypanel.host/',
    category: 'SaaS B2B · PWA',
    desafio: 'Produtoras de eventos perdem equipamento (microfones, cabos, racks) entre eventos. Planilha não acompanha quem pegou o quê, e cada item perdido custa de R$ 500 a R$ 5.000. Não havia ferramenta de mercado focada no fluxo real desse negócio.',
    solucao: 'PWA mobile-first com leitura de QR Code, checklists de saída/retorno por evento, alocação por técnico, e histórico de cada item. Backend em Spring Boot com PostgreSQL no Railway. Suporta operação offline e sincroniza quando conecta.',
    resultados: [
      'Redução de 70% nas perdas de equipamento',
      'Checklist de evento que levava 2h vira 15 min',
      'Responsabilização por técnico — fim do "achei que era do João"',
      'Roda no celular do técnico, sem precisar de notebook em campo',
    ],
    stack: ['Spring Boot (Java)', 'PostgreSQL', 'Next.js 14 (PWA)', 'Service Workers', 'Railway', 'Vercel'],
  },
  {
    slug: 'agenda-inteligente',
    name: 'Agenda Inteligente',
    tagline: 'Plataforma de agendamento com camada de IA',
    url: 'https://agendainteligentefrontend.agendainteligenteapp.cloud/',
    category: 'SaaS B2B · IA',
    desafio: 'Clínicas, salões e prestadores de serviço perdem horas reagendando manualmente quando cliente quer mudar horário, ou ficam com slots vazios que poderiam ser preenchidos. Soluções de mercado são caras e engessadas.',
    solucao: 'Backend Spring Boot com motor de agendamento que considera duração de serviço, disponibilidade de profissional, recursos compartilhados e preferências do cliente. Camada de IA sugere reagendamento ótimo quando o cliente pede mudança. Frontend Next.js com fluxo simples para cliente final.',
    resultados: [
      'Reagendamento automático em 1 clique vs. 3-5 trocas de WhatsApp',
      'Preenchimento de slots vazios via lista de espera inteligente',
      'Multi-profissional e multi-recurso (sala, equipamento)',
      'Integração com WhatsApp Business para confirmações',
    ],
    stack: ['Spring Boot (Java)', 'PostgreSQL', 'Next.js 14', 'OpenAI API', 'Easypanel + Vercel'],
  },
]

export default function CasesPage() {
  return (
    <main className="bg-navy min-h-screen text-offwhite">
      {/* Nav */}
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
          <Link href="/#contact" className="font-mono text-[13px] text-cyan tracking-[0.05em] hover:text-offwhite transition-colors">
            Falar com a equipe →
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Cases</p>
        <h1 className="font-sans text-4xl md:text-5xl font-extrabold text-offwhite mb-4 leading-tight">
          Produtos que construímos<br />
          <span className="text-cyan">e operamos em produção.</span>
        </h1>
        <p className="text-steel text-base max-w-lg leading-relaxed">
          Três SaaS próprios, com clientes pagantes. A mesma engenharia que você contrata para o seu projeto.
        </p>
      </section>

      {/* Cases */}
      <section className="max-w-4xl mx-auto px-6 pb-20 space-y-16">
        {cases.map((c) => (
          <article key={c.slug} className="border border-white/[0.08] rounded-lg p-8 md:p-10">
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <p className="font-mono text-xs text-cyan uppercase tracking-wider mb-2">{c.category}</p>
                <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-1">{c.name}</h2>
                <p className="text-steel text-base">{c.tagline}</p>
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-cyan hover:text-offwhite border border-cyan/40 px-3 py-1.5 rounded transition-colors"
              >
                Ver em produção →
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-cyan mb-2">Desafio</h3>
                <p className="text-steel text-sm leading-relaxed">{c.desafio}</p>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-cyan mb-2">Solução</h3>
                <p className="text-steel text-sm leading-relaxed">{c.solucao}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-cyan mb-3">Resultados</h3>
              <ul className="space-y-2">
                {c.resultados.map((r, i) => (
                  <li key={i} className="text-steel text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-cyan shrink-0">→</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-cyan mb-3">Stack</h3>
              <div className="flex flex-wrap gap-2">
                {c.stack.map((s) => (
                  <span key={s} className="font-mono text-xs text-steel border border-white/[0.08] px-2.5 py-1 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-white/[0.015] border-t border-white/[0.06] py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4">
            Seu projeto pode ser o próximo case.
          </h2>
          <p className="text-steel text-base mb-8 leading-relaxed">
            Diagnóstico grátis de 30 minutos. Conta seu desafio, devolvemos um plano técnico claro.
          </p>
          <Link href="/sistema-sob-medida#diagnostico">
            <span className="inline-block bg-cyan text-navy font-sans font-bold px-6 py-3 rounded hover:bg-cyan/80 transition-colors">
              Quero meu diagnóstico →
            </span>
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-steel text-xs">
            ScantelburyDevs · Blumenau, SC · atendimento remoto em todo o Brasil
          </p>
        </div>
      </footer>
    </main>
  )
}
