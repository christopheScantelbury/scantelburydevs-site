import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Trabalhos que fizemos',
  description: 'Sistemas próprios que a ScantelburyDevs construiu e mantém no ar: NotaFácil (emissão de nota fiscal pra MEI), Descrição AI (geração de descrição de produto com IA), Agenda Inteligente (agendamento online) e Reino do Garcia (app de bairro que conecta moradores e comércio local).',
}

type CaseItem = {
  slug: string
  name: string
  tagline: string
  url: string
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
    tagline: 'Emite nota fiscal pra MEI em segundos',
    url: 'http://emitirnotafacil.com.br',
    paraQuem: 'Pra Microempreendedor Individual e contador',
    problema:
      'Desde 2023 o MEI brasileiro é obrigado a emitir nota fiscal de serviço. O sistema oficial do governo é confuso, lento e dá erro toda hora. Quem trabalha sozinho perde horas pra emitir 5 notas, e quem tem vários MEIs (contador) não consegue emitir em massa.',
    solucao:
      'A gente construiu um sistema que conversa direto com o governo, sem precisar abrir o portal complicado. O MEI emite uma nota em menos de 3 segundos pelo computador ou celular. Quem tem vários cadastros (contador) emite em lote, com poucos cliques.',
    resultados: [
      'Emissão em menos de 3 segundos — no portal oficial leva mais de 30 segundos',
      'Continua funcionando mesmo quando o sistema do governo cai',
      'Um contador pode emitir nota de vários clientes na mesma conta',
      'Outros sistemas (de loja virtual ou gestão) conseguem emitir nota automaticamente',
    ],
    categoria: 'Programa pra emitir nota fiscal',
  },
  {
    slug: 'descricao-ai',
    name: 'Descrição AI',
    tagline: 'Descrições de produto prontas em segundos com IA',
    url: 'https://descricaoai.com.br/',
    paraQuem: 'Pra dono de loja online, e-commerce, marketplace',
    problema:
      'Quem vende online tem centenas de produtos pra cadastrar e cada um precisa de descrição que vende. Escrever uma por uma toma dias. Copiar pronto do fornecedor não converte. Contratar redator dá orçamento alto e demora.',
    solucao:
      'Você cola o nome do produto e umas características básicas. Em segundos, a inteligência artificial gera uma descrição completa, atrativa, no tom da sua loja e otimizada pra aparecer no Google. Você revisa e usa.',
    resultados: [
      'Descrição que levava 30 minutos pra escrever agora fica pronta em 30 segundos',
      'Textos otimizados pro Google (SEO) sem você precisar entender do assunto',
      'Mantém o tom de voz consistente em toda a loja, mesmo com vários produtos',
      'Pra cadastrar dezenas de produtos numa tarde — sem perder qualidade',
    ],
    categoria: 'Sistema de descrição de produto com IA',
  },
  {
    slug: 'agenda-inteligente',
    name: 'Agenda Inteligente',
    tagline: 'Agendamento online que se adapta sozinho',
    url: 'https://agendainteligente-aleefhenriiques-projects.vercel.app/',
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
    url: 'https://aplicativo-reino-garcia.vercel.app/',
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
          <Link href="/sistema-sob-medida#conversar" className="font-mono text-[13px] text-cyan tracking-[0.05em] hover:text-offwhite transition-colors">
            Falar com a gente →
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Trabalhos nossos</p>
        <h1 className="font-sans text-4xl md:text-5xl font-extrabold text-offwhite mb-4 leading-tight">
          Sistemas que a gente construiu<br />
          <span className="text-cyan">e mantém no ar.</span>
        </h1>
        <p className="text-steel text-base max-w-xl leading-relaxed">
          A mesma engenharia que entrega pro seu projeto — do sistema web ao aplicativo de celular. Aqui você vê de perto: qual era o problema, o que a gente fez, e o que mudou.
        </p>
      </section>

      {/* Cases */}
      <section className="max-w-4xl mx-auto px-6 pb-20 space-y-12">
        {cases.map((c) => (
          <article key={c.slug} className="border border-white/[0.08] rounded-xl p-7 md:p-10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan/30 transition-colors">
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <p className="font-mono text-xs text-cyan uppercase tracking-wider">{c.categoria}</p>
                  {c.badge && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4A82A] border border-[#D4A82A]/40 bg-[#D4A82A]/10 px-2 py-0.5 rounded">
                      {c.badge}
                    </span>
                  )}
                </div>
                <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-2">{c.name}</h2>
                <p className="text-steel text-base">{c.tagline}</p>
                <p className="text-steel/70 text-sm italic mt-1">{c.paraQuem}</p>
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-cyan hover:text-offwhite border border-cyan/40 hover:border-offwhite px-3 py-1.5 rounded transition-colors whitespace-nowrap"
              >
                Ver no ar →
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-sans text-base font-bold text-offwhite mb-3 flex items-center gap-2">
                  <span className="text-2xl">😩</span> O problema
                </h3>
                <p className="text-steel text-sm leading-relaxed">{c.problema}</p>
              </div>
              <div>
                <h3 className="font-sans text-base font-bold text-offwhite mb-3 flex items-center gap-2">
                  <span className="text-2xl">💡</span> O que a gente fez
                </h3>
                <p className="text-steel text-sm leading-relaxed">{c.solucao}</p>
              </div>
            </div>

            <div>
              <h3 className="font-sans text-base font-bold text-offwhite mb-3 flex items-center gap-2">
                <span className="text-2xl">📈</span> O que mudou
              </h3>
              <ul className="space-y-2">
                {c.resultados.map((r, i) => (
                  <li key={i} className="text-steel text-sm leading-relaxed flex items-start gap-3">
                    <span className="text-cyan shrink-0 font-bold">→</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Galeria de telas (apps mobile) */}
            {c.screenshots && c.screenshots.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/[0.06]">
                <p className="font-mono text-xs text-[#D4A82A] uppercase tracking-wider mb-4">Telas do app</p>
                <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
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
      <section className="bg-white/[0.015] border-t border-white/[0.06] py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-4 leading-tight">
            Sua empresa pode ser <span className="text-cyan">a próxima.</span>
          </h2>
          <p className="text-steel text-base mb-8 leading-relaxed">
            Uma conversa de 30 minutos sem compromisso. Conta o que tá te incomodando, a gente devolve um plano simples e claro.
          </p>
          <Link href="/sistema-sob-medida#conversar">
            <span className="inline-block bg-cyan text-navy font-sans font-bold px-7 py-3 rounded hover:bg-cyan/80 transition-colors">
              Quero conversar sem compromisso →
            </span>
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-steel text-xs">
            ScantelburyDevs · Blumenau, SC · atendimento em todo o Brasil
          </p>
        </div>
      </footer>
    </main>
  )
}
