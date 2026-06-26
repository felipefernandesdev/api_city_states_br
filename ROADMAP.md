# ROADMAP.md

> **api_city_states_br** — Roadmap de Desenvolvimento

## Milestone 1: MVP (v1.0.0) ✅
**Foco:** API funcional com endpoints básicos

- [x] Setup do projeto (Express + TypeScript)
- [x] Dados dos estados e cidades (JSON)
- [x] Endpoint: Listar estados
- [x] Endpoint: Buscar estado por UF
- [x] Endpoint: Buscar estado por nome
- [x] Endpoint: Listar cidades por estado
- [x] Endpoint: Buscar cidades por nome
- [x] Deploy no Vercel
- [x] Dockerfile
- [x] README documentado

**Entrega:** v1.0.0 — "API funcional e deployada"

## Milestone 2: Qualidade (v1.1.0) ✅
**Foco:** Testes, lint, e qualidade de código

- [x] Configurar ESLint + Prettier
- [x] Adicionar testes unitários (controller)
- [x] Adicionar testes de integração (endpoints)
- [x] Configurar typecheck no package.json
- [x] Adicionar validação de parâmetros de rota
- [x] Configurar CI/CD (GitHub Actions)

**Entrega:** v1.1.0 — "Código testado e qualificado"

## Milestone 3: Performance (v1.2.0) ✅
**Foco:** Otimização e cache

- [x] Cache do JSON em memória
- [x] Headers de cache no response (Cache-Control)
- [x] Rate limiting (proteção contra abuso)

**Entrega:** v1.2.0 — "API otimizada e protegida"

## Milestone 4: Features (v2.0.0) ✅
**Foco:** Novos endpoints e funcionalidades

- [x] Paginação de resultados
- [x] Busca por múltiplos parâmetros
- [x] Endpoint: Contagem de cidades por estado
- [x] Endpoint: Busca avançada com filtros
- [x] Playground HTML interativo

**Entrega:** v2.0.0 — "API completa e documentada"

## Status

| Milestone | Status | Progresso |
|-----------|--------|-----------|
| v1.0.0 MVP | ✅ Concluído | 100% |
| v1.1.0 Qualidade | ✅ Concluído | 100% |
| v1.2.0 Performance | ✅ Concluído | 100% |
| v2.0.0 Features | ✅ Concluído | 100% |

## Próximos Passos (v3.0.0)

- [ ] Atualização automática de dados do IBGE
- [ ] Versionamento de API (/v1/, /v2/)
- [ ] OpenAPI/Swagger (quando suportar serverless)
- [ ] ETag/If-None-Match (cache condicional)
- [ ] Métricas de performance
- [ ] Logging estruturado
