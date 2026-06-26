# MEMORY.md

> **api_city_states_br** — Memória de Contexto da IA

## Sessão Atual

**Data:** 2026-06-26

**Status:** Playground implementado,文档 atualizada

## Contexto do Projeto

### O que é
API REST para consulta de estados e cidades brasileiras. API pública, sem autenticação, dados em JSON com cache em memória.

### Stack
- Node.js 18 + Express.js + TypeScript (strict)
- Vitest + Supertest (testes)
- ESLint + Prettier
- Deploy no Vercel (serverless)
- Docker para containerização

### Endpoints
```
/               → Info da API
/playground     → Playground HTML interativo
/health         → Health check
/estados        → Lista estados (paginado)
/estados/:uf    → Estado por UF
/estados/:uf/cidades → Cidades do estado (paginado)
/cidades/:nome  → Busca cidade por nome
/estados/contagem → Contagem de cidades por estado
/cidades/busca/avancada → Busca avançada com filtros
/cep/:cep       → Consulta CEP (ViaCEP)
/cep/busca/:uf/:cidade/:logradouro → Busca CEP por endereço
```

### Estrutura
```
src/
├── main/
│   ├── index.ts              # Entry point
│   └── routers/index.ts      # Rotas + playground
├── app/controllers/
│   └── cidades-estados-controller.ts
└── infra/
    ├── http/
    │   ├── index.ts          # App Express
    │   ├── error-handler.ts  # Middleware de erros
    │   ├── validators.ts     # Validação de input
    │   └── playground.ts     # HTML do playground
    └── data/
        ├── data-source.ts    # Cache em memória
        └── estados-cidades.json
```

## Decisões Importantes

| Decisão | Justificativa |
|---------|---------------|
| Express.js (não NestJS) | Simplicidade para API de leitura |
| JSON local + cache em memória | Dados estáticos, zero config, performance |
| Vercel serverless | Escalabilidade automática, custo zero |
| TypeScript strict | Type safety, regra inegociável |
| Playground HTML (não Swagger) | Compatível com serverless |
| Rate limiting (100 req/15min) | Proteção contra abuso |
| Validação de input | Segurança e UX |

## Features Implementadas

| Feature | Status |
|---------|--------|
| Endpoints básicos (estados, cidades) | ✅ |
| Cache em memória | ✅ |
| Rate limiting | ✅ |
| Cache-Control headers | ✅ |
| Testes (26) | ✅ |
| ESLint + Prettier | ✅ |
| TypeCheck | ✅ |
| CI/CD GitHub Actions | ✅ |
| Error handling | ✅ |
| Validação de input | ✅ |
| Dockerfile multi-stage | ✅ |
| Playground HTML | ✅ |
| Paginação | ✅ |
| Busca avançada | ✅ |
| Contagem de cidades | ✅ |

## Dados

- **Fonte:** IBGE (DTB 2024)
- **27 estados** (26 + DF)
- **5.595 municípios**
- DF: 36 Regiões Administrativas (não municípios)

## Histórico de Commits

| Commit | Descrição |
|--------|-----------|
| `72e5ac5` | Initialize API with basic routes and Docker |
| `9af26b7` | Add tsconfig-paths dependency |
| `ac96fd8` | Add health check route |
| `26bb072` | Update README with API docs |
| `a9a92fe` | Adicionar artefatos DDD do projeto |
| `fef70fd` | Melhorias completas na API |
| `076b9a2` | Melhorar qualidade dos dados geográficos |
| `de08d63` | Atualizar README com documentação completa |
| `c2a4a34` | Remover swagger e criar playground HTML |
| `5924966` | Desabilitar CSP do Helmet para playground |

## Issues Resolvidos

| Issue | Solução |
|-------|---------|
| Swagger não funciona em serverless | Playground HTML customizado |
| Botão Testar não retornava nada | Desabilitar CSP do Helmet |
| Dados do DF incorretos | Usar regioesAdministrativas |

## Referências

- **GitHub:** https://github.com/felipefernandesdev/api_city_states_br
- **Deploy:** https://api-city-states-br.vercel.app
- **Playground:** https://api-city-states-br.vercel.app/playground
- **Dados:** IBGE - Instituto Brasileiro de Geografia e Estatística
