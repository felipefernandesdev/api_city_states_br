# MEMORY.md

> **api_city_states_br** — Memória de Contexto da IA

## Sessão Atual

**Data:** 2026-06-26

**Status:** Criação de artefatos DDD

## Contexto do Projeto

### O que é
API REST para consulta de estados e cidades brasileiras. API pública, sem autenticação, dados em JSON.

### Stack
- Node.js 18 + Express.js + TypeScript (strict)
- Deploy no Vercel (serverless)
- Docker para containerização

### Estrutura
```
src/
├── main/index.ts              # Entry point
├── main/routers/index.ts      # Rotas
├── app/controllers/           # Controller principal
└── infra/http/index.ts        # App Express
    infra/data/                # JSON dos dados
```

## Decisões Importantes

| Decisão | Justificativa |
|---------|---------------|
| Express.js (não NestJS) | Simplicidade para API de leitura |
| JSON local (não DB) | Dados estáticos, zero config |
| Vercel serverless | Escalabilidade automática |
| TypeScript strict | Type safety, regra inegociável |

## Histórico de Commits

| Commit | Descrição |
|--------|-----------|
| `72e5ac5` | Initialize API with basic routes and Docker |
| `9af26b7` | Add tsconfig-paths dependency |
| `ac96fd8` | Add health check route |
| `26bb072` | Update README with API docs |

## Pendências

### Artefatos criados nesta sessão
- [x] PROJECT_CONTEXT.md
- [x] DECISIONS.md
- [x] MEMORY.md
- [x] REQUIREMENTS.md
- [x] ROADMAP.md
- [x] FEATURES.md
- [x] specs/api/spec.md

### Próximos passos
1. Adicionar testes unitários
2. Configurar ESLint + Prettier corretamente
3. Adicionar validação de input (parâmetros de rota)
4. Considerar cache para o JSON (performance)
5. Adicionar CI/CD (GitHub Actions)

## Referências

- **GitHub:** https://github.com/felipefernandesdev/api_city_states_br
- **Deploy:** https://api-cidades-estados.com
- **Dados:** IBGE - Instituto Brasileiro de Geografia e Estatística
