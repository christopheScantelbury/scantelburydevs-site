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
