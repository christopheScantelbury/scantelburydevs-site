---
title: "Como escolher a tecnologia certa para seu projeto"
description: "React ou Next.js? Go ou Node? Postgres ou MongoDB? Veja os critérios que usamos para escolher a stack de cada projeto — sem hype e sem achismo."
date: "2026-05-10"
tags: ["tecnologia", "arquitetura", "boas práticas"]
readTime: 6
---

Uma das perguntas mais comuns de quem está iniciando um projeto de software: *"Qual tecnologia devo usar?"*

A resposta honesta é: depende. Mas existe uma forma sistemática de chegar na resposta certa.

## O critério que mais importa: custo de operação

Frameworks viram tendência e somem em 3 anos. A pergunta que sempre fazemos primeiro não é *"qual é o mais moderno?"*, mas **"qual a equipe consegue manter daqui a 3 anos?"**

Tecnologia exótica resolve problemas exóticos. A maioria dos projetos não tem problemas exóticos.

## Frontend: quando cada escolha faz sentido

**Next.js** — nossa escolha padrão para sites e aplicações web. SSR, SSG e API routes em uma única plataforma. Excelente para SEO, ótimo DX, deploy trivial na Vercel.

**React puro (Vite)** — para SPAs que não precisam de SEO e são atrás de autenticação. Dashboard de gestão, painel interno, aplicação B2B.

**HTML + JS vanilla** — para landing pages simples onde performance é crítica e não há lógica de estado.

## Backend: o critério é throughput vs. complexidade

**Go** — nossa escolha quando throughput importa. APIs que processam centenas de requisições por segundo com uso de memória previsível. Usado nos nossos produtos fiscais e de emissão de notas.

**Node.js / TypeScript** — quando a equipe é full-stack e o produto precisa de velocidade de desenvolvimento. Prototipação rápida, MVPs, integrações.

**Python** — quando o projeto envolve dados, ML ou automação. Não usamos para APIs de produção de alta carga.

## Banco de dados: não existe bala de prata

**PostgreSQL** — 95% dos projetos. Relacional, confiável, suporta JSON quando necessário. Com o Supabase, tem autenticação e storage inclusos.

**Redis** — complementar ao Postgres. Cache, rate limiting, sessões, filas simples.

**MongoDB** — apenas quando o schema realmente muda com frequência imprevisível. Evitamos como banco principal.

## A regra de ouro

> Use a tecnologia mais entediante que resolve o problema.

Entediante significa documentação extensa, comunidade grande, bugs conhecidos e resolvidos, e engenheiros disponíveis no mercado. Projetos não morrem por falta de inovação tecnológica — morrem por falta de manutenção.

---

Precisa definir a stack do seu próximo projeto? [Fale com a gente.](/#contact)
