# ScantelburyDevs — Website

Site institucional da ScantelburyDevs.  
Stack: **Next.js 14 + TypeScript + Tailwind CSS**

## Estrutura

```
src/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   └── page.tsx          # Página principal (bilíngue PT/EN)
├── components/ui/
│   ├── Logo.tsx          # LogoMark + Logo
│   ├── Button.tsx        # Button (primary | outline | ghost)
│   ├── Card.tsx          # Card + CardHeader + CardContent
│   ├── Badge.tsx         # Badge (cyan | blue | steel)
│   ├── Input.tsx         # Input + Textarea + Select
│   └── index.ts          # Barrel export
├── lib/
│   ├── utils.ts          # cn() helper
│   └── tokens.ts         # Design tokens para JS/TS
└── styles/
    └── globals.css       # Tailwind + CSS vars + utilitários
```

## Design Tokens

| Token | Valor |
|-------|-------|
| `navy` | `#0A0F1E` |
| `navy-mid` | `#111827` |
| `cyan` | `#00D4FF` |
| `cyan-dark` | `#0088CC` |
| `steel` | `#8B9DB7` |
| Font display | Syne 800 |
| Font mono | DM Mono |

## Desenvolvimento

```bash
npm install
npm run dev
```

## SEO & Analytics

O site inclui:

- **Metadata completa** (title template, description, keywords, OG, Twitter) em `src/app/layout.tsx`
- **JSON-LD** Schema.org (`Organization`, `WebSite`, `ItemList` de produtos)
- **`/sitemap.xml`** dinâmico (`src/app/sitemap.ts`)
- **`/robots.txt`** dinâmico (`src/app/robots.ts`)
- **`/manifest.webmanifest`** (`src/app/manifest.ts`)
- **OG/Twitter image** 1200×630 gerada dinamicamente (`src/app/opengraph-image.tsx`)
- **Vercel Web Analytics** (sempre ativo)
- **Google Analytics 4** (opcional, via env var)
- **Google Search Console verification** (opcional, via env var)

### Variáveis de ambiente (Vercel)

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | não | ID do Google Analytics 4 (`G-XXXXXXXXXX`). Sem isso, GA4 não é injetado. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | não | Token de verificação do Google Search Console (apenas o valor do `content`, sem o `<meta>`). |

### Pipeline de notificação automática (a cada deploy)

Existe uma GitHub Action em `.github/workflows/notify-search-engines.yml`
que dispara automaticamente quando o deploy do Vercel chega ao status
**success** em **Production** (via evento `deployment_status` do GitHub).

A cada deploy ela:

1. Aguarda 30s para o CDN propagar
2. Confere que `/sitemap.xml` está respondendo 200
3. Envia as URLs para a **IndexNow API**, que notifica de uma só vez:
   - Bing
   - Yandex
   - Naver
   - Seznam
4. (Opcional, comentado) Notifica a **Google Indexing API** — requer
   service account com a Indexing API ativada e adicionada como
   Proprietário da propriedade no Search Console. Veja instruções
   passo-a-passo dentro do próprio arquivo do workflow.

> **Nota sobre Google:** o endpoint clássico `google.com/ping?sitemap=`
> foi descontinuado em 2023. Hoje o canal automático para o Google é o
> próprio `lastmod` do sitemap, que é atualizado a cada build. Para
> indexação ativa de URL específica, use a Indexing API ou solicite
> manualmente em Search Console → Inspeção de URL.

A chave do IndexNow está em `public/<KEY>.txt` e referenciada no
workflow como `INDEXNOW_KEY`. Se for substituída, atualizar nos dois
lugares e fazer um deploy antes do próximo run da action.

### Submeter ao Google

1. Acessar https://search.google.com/search-console
2. Adicionar propriedade pelo prefixo da URL: `https://scantelburydevs.com.br/`
3. Escolher o método **HTML tag** e copiar o valor do atributo `content`
4. Definir `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` na Vercel com esse valor → redeploy
5. Voltar ao Search Console e clicar em **Verificar**
6. Dentro do Search Console: **Sitemaps → Adicionar sitemap → `sitemap.xml`**

## Deploy no Vercel + GitHub

```bash
# 1. Criar repositório no GitHub
git init
git add .
git commit -m "feat: initial ScantelburyDevs website"
git remote add origin https://github.com/SEU_USUARIO/scantelburydevs.git
git push -u origin main

# 2. Deploy no Vercel (requer Vercel CLI)
npm i -g vercel
vercel --prod
```

Ou acesse [vercel.com](https://vercel.com), importe o repositório GitHub e o deploy é automático.

## Uso do Design System no sistema interno

```tsx
import { Button, Card, Badge, Logo } from '@/components/ui'
import { tokens } from '@/lib/tokens'

// Exemplo
<Card hover>
  <CardContent>
    <Badge variant="cyan">Migração</Badge>
    <Button variant="primary">Iniciar</Button>
  </CardContent>
</Card>
```
