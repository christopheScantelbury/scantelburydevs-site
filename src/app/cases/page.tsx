import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Trabalhos que fizemos',
  description: 'Sistemas próprios que a ScantelburyDevs construiu e mantém no ar: NotaFácil (NFS-e Nacional por plataforma e API), Agenda Inteligente (agendamento online) e Reino do Garcia (app de bairro que conecta moradores e comércio local).',
  alternates: { canonical: '/cases' },
}

type CaseItem = {
  slug: string
  name: string
  tagline: string
  /** Endereço público. Sem ele, o card não mostra o botão "Ver no ar". */
  url?: string
  paraQuem: string
  problema: string
  solucao: string
  resultados: string[]
  categoria: string
  badge?: string
  screenshots?: string[]
}

const cases: CaseItem[] = [
  {
    slug: 'notafacil',
    name: 'NotaFácil',
    tagline: 'Emissão de NFS-e Nacional para MEI, ME/EPP e empresas de software',
    url: 'https://www.emitirnotafacil.com.br',
    paraQuem: 'Pra quem emite nota de serviço — e pra quem tem um sistema que precisa emitir',
    problema:
      'A nota fiscal de serviço virou nacional e passou a ser obrigatória: primeiro pro MEI, depois pra microempresas e empresas de pequeno porte. O emissor do governo funciona, mas exige preencher tudo de novo a cada nota. E quem tem um sistema próprio (ERP, SaaS, marketplace) precisa falar direto com a Receita Federal — XML assinado, certificado digital, regras que mudam.',
    solucao:
      'A gente construiu uma plataforma que conversa direto com a Receita Federal. Quem emite pela tela salva os dados do cliente e emite em segundos, pelo computador ou celular. Quem tem um sistema integra pela API: manda um JSON, a gente assina, envia e devolve o resultado por webhook.',
    resultados: [
      'Emissão em menos de 3 segundos, em média',
      'Conexão direta com a Receita Federal, sem intermediário',
      'Várias empresas na mesma conta — útil pra contador e pra quem tem mais de um CNPJ',
      'API REST com sandbox público: outros sistemas emitem nota automaticamente',
    ],
    categoria: 'NFS-e Nacional · plataforma e API',
  },
  {
    slug: 'agenda-inteligente',
    name: 'Agenda Inteligente',
    tagline: 'Agendamento online que se adapta sozinho',
    paraQuem: 'Pra clínica, salão de beleza, prestador de serviço',
    problema:
      'Cliente liga pra remarcar, você procura horário livre no caderno. Cliente desmarca, o horário fica vazio e ninguém preenche. Tudo no WhatsApp — uma conversa pra agendar, três pra remarcar, e na correria alguém esquece. Horário perdido é dinheiro perdido.',
    solucao:
      'Cliente acessa um link, escolhe horário e fica agendado direto. Se ele quer remarcar, o próprio sistema sugere o melhor horário pra ele e pra você. Quando alguém desmarca, quem estava na fila de espera é avisado automaticamente. E confirma tudo por WhatsApp.',
    resultados: [
      'Remarcação que levava 5 mensagens vira 1 clique',
      'Horário cancelado em cima da hora é oferecido pra quem tá esperando',
      'Funciona com vários profissionais e vários espaços (sala, cadeira) ao mesmo tempo',
      'Cliente recebe confirmação automática no WhatsApp',
    ],
    categoria: 'Sistema de agendamento',
  },
  {
    slug: 'reino-do-garcia',
    name: 'Reino do Garcia',
    tagline: 'O bairro inteiro na palma da mão',
    url: 'https://reinogarcia.com.br/',
    paraQuem: 'Pra morador de bairro e comércio de vizinhança',
    problema:
      'A vida do bairro hoje mora em dez grupos de WhatsApp bagunçados: notícia se perde, promoção da padaria some no meio das conversas, e o comércio da esquina não tem como avisar quem mora ali do lado. Morador não acha, comerciante não alcança.',
    solucao:
      'Um aplicativo só do bairro. O morador abre e vê num lugar só: notícias, avisos, eventos e as promoções dos comércios vizinhos. O comerciante cria oferta, ganha uma vitrine e distribui "Selos do Reino" — um programa de fidelidade com clima de jogo (o bairro vira um "reino", o cliente sobe de título juntando selos). Tudo pensado pro celular.',
    resultados: [
      'Notícia, promoção e evento do bairro num feed só — sem caçar em grupo de WhatsApp',
      'Comércio local ganha vitrine própria e alcança quem mora perto',
      'Programa de fidelidade gamificado ("Selos do Reino") que traz o cliente de volta',
      'Cada comerciante recebe um cartaz com QR pra colar no balcão e fidelizar na hora',
    ],
    categoria: 'Aplicativo de bairro (mobile)',
    badge: 'Em lançamento · piloto 2026',
    screenshots: [
      '/products/reino/reino-mural.jpg',
      '/products/reino/reino-reino.jpg',
      '/products/reino/reino-comercio.jpg',
      '/products/reino/reino-alvara.jpg',
    ],
  },
]

/** Título de bloco numerado — mesmo padrão dos cards de serviço da home. */
function BlockTitle({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <h3 className="font-display font-bold text-base text-offwhite mb-3 flex items-baseline gap-2.5">
      <span className="font-mono text-[11px] font-normal text-cyan tracking-[0.15em]" aria-hidden="true">{n}</span>
      {children}
    </h3>
  )
}

export default function CasesPage() {
  return (
    <main className="bg-navy min-h-screen text-offwhite">
      <SiteHeader current="cases" cta={{ href: '/sistema-sob-medida#conversar', label: 'Falar com a gente' }} />

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <p className="label-tag">Trabalhos nossos</p>
        <h1 className="section-title">
          Sistemas que a gente construiu<br />
          <span className="text-cyan">e mantém no ar.</span>
        </h1>
        <p className="text-steel-light text-base max-w-xl leading-relaxed">
          A mesma engenharia que entrega pro seu projeto — do sistema web ao aplicativo de celular. Aqui você vê de perto: qual era o problema, o que a gente fez, e o que mudou.
        </p>
      </section>

      {/* Cases */}
      <section className="max-w-4xl mx-auto px-6 pb-20 space-y-10">
        {cases.map((c) => (
          <article key={c.slug} id={c.slug} className="border border-white/[0.08] rounded-2xl p-7 md:p-10 bg-navy-card hover:border-cyan/30 transition-colors scroll-mt-24">
            <div className="flex items-start justify-between gap-4 mb-7 flex-wrap">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <p className="font-mono text-[11px] text-cyan uppercase tracking-[0.12em]">{c.categoria}</p>
                  {c.badge && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4A82A] border border-[#D4A82A]/40 bg-[#D4A82A]/10 px-2 py-0.5 rounded">
                      {c.badge}
                    </span>
                  )}
                </div>
                <h2 className="font-display font-bold text-[28px] md:text-[32px] tracking-tight text-offwhite mb-2 leading-tight">{c.name}</h2>
                <p className="text-steel-light text-base">{c.tagline}</p>
                <p className="text-steel text-sm mt-1">{c.paraQuem}</p>
              </div>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] font-mono text-xs text-cyan hover:text-offwhite border border-cyan/40 hover:border-offwhite px-4 rounded-lg transition-colors whitespace-nowrap"
                >
                  Ver no ar ↗
                </a>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <BlockTitle n="01">O problema</BlockTitle>
                <p className="text-steel-light text-sm leading-relaxed">{c.problema}</p>
              </div>
              <div>
                <BlockTitle n="02">O que a gente fez</BlockTitle>
                <p className="text-steel-light text-sm leading-relaxed">{c.solucao}</p>
              </div>
            </div>

            <div>
              <BlockTitle n="03">O que mudou</BlockTitle>
              <ul className="space-y-2">
                {c.resultados.map((r, i) => (
                  <li key={i} className="text-steel-light text-sm leading-relaxed flex items-start gap-3">
                    <span className="text-cyan shrink-0 font-bold" aria-hidden="true">→</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Galeria de telas (apps mobile) */}
            {c.screenshots && c.screenshots.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/[0.06]">
                <p className="font-mono text-[11px] text-[#D4A82A] uppercase tracking-[0.12em] mb-4">Telas do app</p>
                <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x" tabIndex={0} role="group" aria-label={`Telas do app ${c.name}`}>
                  {c.screenshots.map((src, i) => (
                    <div
                      key={i}
                      className="shrink-0 w-[130px] md:w-[160px] snap-start rounded-[1.25rem] overflow-hidden bg-black border-4 border-[#14181f] shadow-xl"
                    >
                      <div className="relative aspect-[9/19.5]">
                        <Image
                          src={src}
                          alt={`Tela do app ${c.name} (${i + 1})`}
                          fill
                          className="object-cover object-top"
                          sizes="160px"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-navy-card border-t border-white/[0.06] py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="section-title">
            Seu sistema pode ser <span className="text-cyan">o próximo.</span>
          </h2>
          <p className="text-steel-light text-base mb-8 leading-relaxed">
            Uma conversa de 30 minutos sem compromisso. Conta o que tá te incomodando, a gente devolve um plano simples e claro.
          </p>
          <Link href="/sistema-sob-medida#conversar"
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-lg bg-cyan text-navy font-mono text-[13px] font-medium tracking-[0.06em] no-underline transition-all duration-200 hover:opacity-90 hover:-translate-y-px">
            Quero conversar sem compromisso →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
