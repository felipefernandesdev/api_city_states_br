# DECISIONS.md

> **api_city_states_br** — Architecture Decision Records (ADRs)

---

## ADR-001: Express.js como Framework

**Status:** Aceito

**Data:** 2026-06-26

**Contexto:**
O projeto é uma API REST simples para consulta de dados geográficos. Não há necessidade de DI, guards, ou modularidade avançada.

**Decisão:**
Usar Express.js como framework HTTP, por ser leve, maduro e suficiente para o caso de uso.

**Alternativas Consideradas:**
1. NestJS → Rejeitado: complexidade desnecessária para API de leitura
2. Fastify → Rejeitado: comunidade menor, menos plugins prontos
3. Koa → Rejeitado: menos adotado que Express

**Consequências:**
- ✅ Setup simples e rápido
- ✅ Ecossistema maduro com middlewares prontos (cors, helmet, morgan)
- ✅ Fácil deploy em serverless (Vercel)
- ❌ Sem DI nativa (aceitável para este tamanho)

---

## ADR-002: Dados em JSON Local com Cache em Memória

**Status:** Aceito

**Data:** 2026-06-26

**Contexto:**
Os dados de estados e cidades são estáticos e não mudam frequentemente. Não há necessidade de banco de dados.

**Decisão:**
Armazenar dados em arquivo JSON local (`estados-cidades.json`) com cache em memória via `data-source.ts`.

**Consequências:**
- ✅ Zero configuração de banco de dados
- ✅ Dados sempre disponíveis (sem dependência externa)
- ✅ Deploy simples (serverless sem DB)
- ✅ Performance: dados carregados uma única vez
- ❌ Atualização de dados requer deploy

---

## ADR-003: Deploy no Vercel (Serverless)

**Status:** Aceito

**Data:** 2026-06-26

**Contexto:**
API é pública, com tráfego imprevisível e custo baixo. Serverless se encaixa perfeitamente.

**Decisão:**
Deploy no Vercel como serverless function, com configuração em `vercel.json`.

**Consequências:**
- ✅ Escalabilidade automática
- ✅ Custo zero para tráfego baixo
- ✅ Deploy automático via Git
- ❌ Cold start em requests after idle
- ❌ Limite de 10s para serverless functions

---

## ADR-004: TypeScript Strict Mode

**Status:** Aceito

**Data:** 2026-06-26

**Contexto:**
Garantir type safety desde o início, seguindo as regras do Felipe Fernandes Engineering Method.

**Decisão:**
Usar TypeScript com `strict: true` no tsconfig, sem `any`, `ts-ignore`, ou `@ts-nocheck`.

**Consequências:**
- ✅ Type safety completa
- ✅ Melhor DX (autocomplete, refactoring seguro)
- ✅ Menos bugs em runtime
- ❌ Mais verbose (aceitável)

---

## ADR-005: Rate Limiting

**Status:** Aceito

**Data:** 2026-06-26

**Contexto:**
API pública sem autenticação, vulnerável a abuso.

**Decisão:**
Usar `express-rate-limit` com limite de 100 requests por 15 minutos.

**Consequências:**
- ✅ Proteção contra abuso
- ✅ Configuração simples
- ❌ Pode bloquear usuários legítimos em caso de alto tráfego

---

## ADR-011: Consulta CEP via ViaCEP

**Status:** Aceito

**Data:** 2026-06-26

**Contexto:**
A API poderia oferecer consulta de CEP para complementar os dados geográficos.

**Decisão:**
Integrar com ViaCEP (API gratuita) para consulta de CEPs.

**Alternativas Consideradas:**
1. BrasilAPI → Rejeitada: ViaCEP mais simples e maduro
2. Banco próprio → Rejeitada: manutenção desnecessária

**Consequências:**
- ✅ API gratuita, sem autenticação
- ✅ 1.586.164 CEPs na base
- ✅ Cache em memória (24h)
- ❌ Dependência de serviço externo
- ❌ Rate limit do ViaCEP (uso massivo pode bloquear)

---

## ADR-009: Desabilitar CSP do Helmet

**Status:** Aceito

**Data:** 2026-06-26

**Contexto:**
O Helmet configurava Content Security Policy (CSP) que bloqueava scripts inline e event handlers, impedindo o playground de funcionar.

**Decisão:**
Desabilitar CSP do Helmet (`contentSecurityPolicy: false`).

**Consequências:**
- ✅ Playground funciona com scripts inline
- ⚠️ Segurança reduzida (sem CSP)
- 💡 Alternativa futura: CSP configurado para permitir apenas o playground

---

## ADR-010: Playground HTML Customizado

**Status:** Aceito

**Data:** 2026-06-26

**Contexto:**
Swagger UI (`swagger-ui-express`) não funciona em ambiente serverless (Vercel) por precisar servir arquivos estáticos.

**Decisão:**
Criar playground HTML interativo customizado em `/playground`.

**Alternativas Consideradas:**
1. Swagger UI via CDN → Rejeitado: dependência externa, difícil de customizar
2. Swagger UI express → Rejeitado: não funciona em serverless
3. Redoc → Rejeitado: mesma limitação do Swagger

**Consequências:**
- ✅ Funciona em serverless
- ✅ Totalmente customizável
- ✅ Sem dependências externas
- ❌ Não segue padrão OpenAPI
- ❌ Mais trabalho de manutenção

---

## ADR-007: Validação de Input

**Status:** Aceito

**Data:** 2026-06-26

**Contexto:**
Parâmetros de rota como `:uf` e `:nome` aceitam qualquer valor, incluindo strings gigantes e caracteres especiais.

**Decisão:**
Middlewares de validação (`validators.ts`) para UF (regex `^[A-Z]{2}$`) e nome (máximo 100 caracteres).

**Consequências:**
- ✅ Proteção contra inputs maliciosos
- ✅ Mensagens de erro claras
- ✅ Separação de responsabilidades
- ❌ Mais uma camada de middleware

---

## ADR-008: Error Handler Centralizado

**Status:** Aceito

**Data:** 2026-06-26

**Contexto:**
Erros não tratados resultam em respostas 500 genéricas sem informação útil.

**Decisão:**
Middleware `error-handler.ts` com classe `AppError` para erros customizados.

**Consequências:**
- ✅ Respostas de erro padronizadas
- ✅ Logs centralizados
- ✅ Separação de responsabilidades
