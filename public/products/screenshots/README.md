# Screenshots de produto — pendentes

Esta pasta deve receber **screenshots reais** dos dashboards/telas dos
produtos da ScantelburyDevs. Usados pelo componente `<ProductShowcase />`
na home (`/src/app/page.tsx`, seção `#produtos`).

Enquanto os arquivos não existirem, o componente renderiza um
**placeholder claramente marcado** com a palavra "Placeholder" e o nome
do produto — não passa por screenshot real.

## Arquivos esperados

| Arquivo | Produto | Sugestão de tela | Status |
|---------|---------|------------------|--------|
| `notafacil.png` | NotaFácil | Dashboard ou tela de emissão de NFS-e | ⚠️ Pendente |
| `descricaoai.png` | Descrição AI | Tela de geração com exemplo realista | ⚠️ Pendente |
| `agenda-inteligente.png` | Agenda Inteligente | Calendário ou tela de agendamento | ⚠️ Pendente |

## Especificação técnica

- **Resolução:** 1440×900px (16:10) ou superior — o mockup tem aspect-ratio 16/10
- **Formato:** `.png` (transparência) ou `.webp` (menor peso)
- **Peso:** idealmente abaixo de 300KB cada (após otimização)
- **Conteúdo:** dados mockados realistas — sem CPF/CNPJ reais, sem
  e-mails de clientes reais, sem informação sensível

## Quando adicionar

Depois de colocar o arquivo aqui:

1. Editar `src/app/page.tsx` na seção `#produtos`
2. Adicionar a prop `screenshot="/products/screenshots/<arquivo>.png"`
   no `<ProductShowcase />` correspondente
3. Remover o comentário `TODO` da linha
