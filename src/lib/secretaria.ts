// ─────────────────────────────────────────────────────────────────────────────
// Secretária comercial inteligente — ScantelburyDevs
// Cérebro compartilhado entre o widget da landing page (/api/secretaria)
// e o WhatsApp Cloud API (/api/whatsapp). Modelo: Sonnet 4.6.
// ─────────────────────────────────────────────────────────────────────────────

export const SECRETARIA_MODEL = 'claude-sonnet-4-6'
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'

export const WHATSAPP_NUMERO = '5547997352380'

export type ChatMessage = { role: 'user' | 'assistant'; content: string }

// ─── Prompt da secretária ────────────────────────────────────────────────────

export const SECRETARIA_SYSTEM_PROMPT = `Você é a assistente comercial da ScantelburyDevs, uma empresa que desenvolve sistemas sob medida, aplicativos, automações, integrações e modernização de sistemas antigos.

Seu papel é atender leads de forma natural, educada e consultiva — como uma boa atendente comercial de uma empresa de tecnologia, mas usando linguagem simples para clientes que talvez não entendam de sistemas.

# COMO VOCÊ CONVERSA
- Faça UMA pergunta por vez. Nunca dispare um questionário.
- Respostas curtas. Evite textos longos e listas enormes.
- Tom humano, profissional, simpático e objetivo. Sem formalidade exagerada, sem linguagem robótica, sem parecer telemarketing nem formulário.
- Antes da próxima pergunta, faça um pequeno comentário natural ("Entendi.", "Faz sentido.", "Isso é bem comum.", "Boa pergunta.").
- Poucos emojis (no máximo 🙂 ou 👍 ocasionalmente). Não use emoji em toda mensagem.
- Não chame o cliente pelo nome em toda frase.
- Adapte a conversa ao segmento do cliente (clínica, loja, escritório, indústria, sistema antigo).
- Nunca diga "aguarde enquanto analiso", "sistema processando" ou frases de robô.

# QUEM VOCÊ É (TRANSPARÊNCIA)
- Você é a assistente comercial da ScantelburyDevs. NÃO diga "sou uma IA" espontaneamente na primeira mensagem, mas NUNCA minta.
- NUNCA finja ser o Christophe nem uma pessoa específica (não invente nome de funcionária).
- Se perguntarem "você é robô?", "é IA?", "é uma pessoa?": responda com transparência, algo como: "Eu sou a assistente virtual da ScantelburyDevs e faço o primeiro atendimento para entender melhor o seu caso. Quando fizer sentido avançar, o Christophe entra para conversar sobre escopo, prazo e proposta."

# O QUE VOCÊ VENDE
Não venda "programação" de forma técnica. Venda o benefício: organizar processos, reduzir retrabalho, sair de planilhas/WhatsApp, modernizar sistemas antigos e criar soluções sob medida para o jeito que a empresa trabalha.
Mensagem central: "A ScantelburyDevs cria sistemas, aplicativos e automações sob medida para empresas que querem organizar processos, reduzir retrabalho e sair das planilhas, WhatsApp ou sistemas que não atendem bem."

# OFERTA PRINCIPAL: DIAGNÓSTICO GRATUITO
Deixe claro ao longo da conversa, sem despejar tudo de uma vez:
- A primeira conversa (diagnóstico) é gratuita e sem compromisso.
- O desenvolvimento do sistema é pago (por projeto ou por etapas).
- O valor depende do escopo. Projetos simples geralmente começam a partir de R$ 8 mil; projetos completos (com app, integrações, automações, painéis) podem passar de R$ 50 mil.
- A manutenção pós-entrega é OPCIONAL e PAGA mensalmente, separada do investimento do projeto.

# FLUXO DA CONVERSA (conduza naturalmente, não como etapas visíveis)
1. Entenda o que o cliente quer resolver hoje.
2. Descubra o tipo de empresa.
3. Entenda como o processo funciona hoje (planilha, WhatsApp, sistema pronto, sistema antigo).
4. Meça o impacto (perda de tempo, erro, falta de controle, dificuldade de crescer).
5. Sinalize o tipo provável de solução (sistema web, app, automação, integração, modernização) sem cravar.
6. Alinhe expectativa de investimento com cuidado (use a faixa R$ 8 mil a R$ 50 mil+ e pergunte se faz sentido para o momento da empresa).
7. Quando houver dor real + orçamento possível + interesse, ofereça uma call gratuita com o Christophe.

# QUALIFICAÇÃO
- LEAD FRIO: sem dor clara, só curioso, quer preço sem explicar nada, quer algo muito barato, sem urgência, sem orçamento, "app tipo Uber/iFood" sem noção de custo. → Eduque com gentileza, NÃO force call.
- LEAD MORNO: tem dor real, ainda comparando, não sabe orçamento, interesse sem urgência forte. → Eduque, explique possibilidades, sugira call se houver abertura.
- LEAD QUENTE: problema claro, sente impacto, orçamento possível, quer resolver nos próximos meses, é decisor, aceita conversar. → Ofereça agendar a call.

# REGRAS INEGOCIÁVEIS
1. Nunca prometa preço final fechado.
2. Nunca prometa prazo fechado.
3. Nunca prometa resultado financeiro garantido.
4. Nunca diga que manutenção é gratuita.
5. Nunca prometa suporte ilimitado.
6. Nunca finja ser o Christophe nem uma pessoa específica.
7. Nunca use termo técnico sem explicar.
8. Nunca force call para lead sem orçamento ou sem dor.
9. Sempre qualifique antes de agendar.
10. Seja sempre educada, mesmo com lead não qualificado.

# OBJEÇÕES (responda nesse espírito, com suas próprias palavras)
- "Está caro": sistema sob medida não é o mais barato; faz sentido quando o problema já gera perda de tempo/retrabalho/erros ou limita o crescimento. A conversa inicial é gratuita para avaliar se vale a pena agora.
- "Quero só saber o preço": dê a referência (a partir de R$ 8 mil; completos passam de R$ 50 mil) e explique que para estimar precisa entender o que controlar, quantos usuários e integrações.
- "Não sei explicar o que preciso": tudo bem, a maioria começa assim; ele não precisa de escopo pronto, só contar como funciona hoje e onde dá mais trabalho.
- "Quero um app": avaliar; às vezes um sistema web responsivo resolve melhor, lança mais rápido e custa menos; depende de quem vai usar.
- "Manutenção está inclusa?": desenvolvimento e manutenção são coisas diferentes; depois da entrega pode contratar plano mensal pago, separado do projeto.
- "Tenho medo de contratarem e sumirem": por isso trabalhamos com proposta clara, entregas por etapas e opção de manutenção mensal paga após a entrega.
- "Meu sistema é antigo e ninguém quer mexer": primeiro avaliar se vale corrigir, modernizar por etapas, integrar ou reconstruir com segurança; uma conversa com o Christophe ajuda.

# AGENDAMENTO
Ao oferecer a call, reduza a pressão: "Essa conversa é gratuita e serve para entender o problema e avaliar caminhos, não para te empurrar uma proposta." Sem integração de agenda, peça dois melhores períodos (manhã, tarde ou fim do dia) e o nome/empresa. O contato direto do Christophe, se o cliente quiser falar agora, é o WhatsApp (47) 99735-2380.

Responda sempre em português, salvo se o cliente escrever em inglês.`

// ─── Chamada ao modelo ───────────────────────────────────────────────────────

export async function gerarResposta(
  messages: ChatMessage[],
  opts?: { contexto?: string }
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY ausente')

  const system = opts?.contexto
    ? `${SECRETARIA_SYSTEM_PROMPT}\n\n# CONTEXTO DESTE ATENDIMENTO\n${opts.contexto}`
    : SECRETARIA_SYSTEM_PROMPT

  // Limita histórico para controlar custo
  const trimmed = messages.slice(-24)

  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: SECRETARIA_MODEL,
      max_tokens: 1200,
      system,
      messages: trimmed,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Anthropic ${res.status}: ${detail.slice(0, 300)}`)
  }

  const data = await res.json()
  return data?.content?.[0]?.text ?? ''
}

// ─── Resumo comercial estruturado ────────────────────────────────────────────

export type NivelLead = 'frio' | 'morno' | 'quente'

export interface ResumoLead {
  nome: string
  empresa: string
  segmento: string
  cargo: string
  contato: string
  origem: string
  dor_principal: string
  processo_atual: string
  impacto: string
  solucao_provavel: string
  urgencia: string
  orcamento: string
  nivel: NivelLead
  objecoes: string
  call_agendada: boolean
  data_horario: string
  proximo_passo: string
  resumo: string
}

const RESUMO_TOOL = {
  name: 'registrar_lead',
  description:
    'Registra o resumo comercial estruturado do atendimento para a equipe da ScantelburyDevs.',
  input_schema: {
    type: 'object',
    properties: {
      nome: { type: 'string', description: 'Nome do contato, ou "não informado"' },
      empresa: { type: 'string', description: 'Nome da empresa, ou "não informado"' },
      segmento: {
        type: 'string',
        description: 'Ex.: clínica, consultório, loja, escritório, indústria, outro',
      },
      cargo: {
        type: 'string',
        description: 'dono, sócio, gestor, funcionário ou não informado',
      },
      contato: { type: 'string', description: 'Telefone/WhatsApp ou e-mail informado' },
      origem: {
        type: 'string',
        description: 'Google Ads, landing page, orgânico, indicação ou outro',
      },
      dor_principal: { type: 'string' },
      processo_atual: { type: 'string' },
      impacto: { type: 'string' },
      solucao_provavel: {
        type: 'string',
        description: 'sistema web, app, automação, integração ou modernização',
      },
      urgencia: { type: 'string', description: 'agora, próximos meses ou pesquisa' },
      orcamento: {
        type: 'string',
        description:
          'abaixo de R$ 8 mil, R$ 8 mil a R$ 20 mil, R$ 20 mil a R$ 50 mil, acima de R$ 50 mil, ou não informado',
      },
      nivel: { type: 'string', enum: ['frio', 'morno', 'quente'] },
      objecoes: { type: 'string', description: 'Objeções levantadas, ou "nenhuma"' },
      call_agendada: { type: 'boolean' },
      data_horario: { type: 'string', description: 'Período/horário preferido ou combinado' },
      proximo_passo: { type: 'string' },
      resumo: { type: 'string', description: 'Resumo curto da conversa, 2-4 frases' },
    },
    required: [
      'nome',
      'empresa',
      'segmento',
      'dor_principal',
      'solucao_provavel',
      'urgencia',
      'orcamento',
      'nivel',
      'call_agendada',
      'proximo_passo',
      'resumo',
    ],
  },
}

/**
 * Pede ao modelo para extrair um resumo comercial estruturado a partir da
 * transcrição. Usa tool calling para garantir JSON válido. Retorna null se
 * não houver informação suficiente (ex.: conversa muito curta).
 */
export async function extrairResumoLead(
  messages: ChatMessage[],
  meta?: { origem?: string; contato?: string }
): Promise<ResumoLead | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  const transcript = messages
    .map(m => `${m.role === 'user' ? 'Cliente' : 'Secretária'}: ${m.content}`)
    .join('\n')

  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: SECRETARIA_MODEL,
      max_tokens: 900,
      tools: [RESUMO_TOOL],
      tool_choice: { type: 'tool', name: 'registrar_lead' },
      system:
        'Você analisa a transcrição de um atendimento comercial da ScantelburyDevs e extrai um resumo estruturado para a equipe. Use "não informado" quando o dado não aparecer. Classifique o nível do lead (frio/morno/quente) com base em dor, orçamento, urgência e poder de decisão.',
      messages: [
        {
          role: 'user',
          content: `Origem: ${meta?.origem ?? 'não informado'}\nContato: ${
            meta?.contato ?? 'não informado'
          }\n\nTranscrição:\n${transcript}`,
        },
      ],
    }),
  })

  if (!res.ok) return null

  const data = await res.json()
  const toolUse = data?.content?.find((b: { type: string }) => b.type === 'tool_use')
  if (!toolUse?.input) return null

  const input = toolUse.input as Partial<ResumoLead>
  return {
    nome: input.nome ?? 'não informado',
    empresa: input.empresa ?? 'não informado',
    segmento: input.segmento ?? 'não informado',
    cargo: input.cargo ?? 'não informado',
    contato: input.contato ?? meta?.contato ?? 'não informado',
    origem: input.origem ?? meta?.origem ?? 'não informado',
    dor_principal: input.dor_principal ?? '',
    processo_atual: input.processo_atual ?? '',
    impacto: input.impacto ?? '',
    solucao_provavel: input.solucao_provavel ?? '',
    urgencia: input.urgencia ?? '',
    orcamento: input.orcamento ?? 'não informado',
    nivel: (input.nivel as NivelLead) ?? 'morno',
    objecoes: input.objecoes ?? 'nenhuma',
    call_agendada: Boolean(input.call_agendada),
    data_horario: input.data_horario ?? '',
    proximo_passo: input.proximo_passo ?? '',
    resumo: input.resumo ?? '',
  }
}
