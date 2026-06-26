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

## ADR-002: Dados em JSON Local

**Status:** Aceito

**Data:** 2026-06-26

**Contexto:**
Os dados de estados e cidades são estáticos e não mudam frequentemente. Não há necessidade de banco de dados.

**Decisão:**
Armazenar dados em arquivo JSON local (`estados-cidades.json`) carregado em memória a cada request.

**Consequências:**
- ✅ Zero configuração de banco de dados
- ✅ Dados always available (sem dependência externa)
- ✅ Deploy simples (serverless sem DB)
- ❌ Dados carregados a cada request (poderia ser cacheado)
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

## ADR-005: Controller Singleton

**Status:** Aceito

**Data:** 2026-06-26

**Contexto:**
A API tem um único controller com 5 endpoints. Não há necessidade de DI ou factory patterns.

**Decisão:**
Exportar instância singleton do controller: `export default new CidadesEstadosController()`.

**Consequências:**
- ✅ Simplicidade
- ✅ Menos boilerplate
- ❌ Difícil de mockar em testes (pode ser resolvido depois)
