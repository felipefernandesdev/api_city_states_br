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

## Milestone 2: Qualidade (v1.1.0)
**Foco:** Testes, lint, e qualidade de código

- [ ] Configurar ESLint + Prettier
- [ ] Adicionar testes unitários (controller)
- [ ] Adicionar testes de integração (endpoints)
- [ ] Configurar typecheck no package.json
- [ ] Adicionar validação de parâmetros de rota
- [ ] Configurar CI/CD (GitHub Actions)

**Entrega:** v1.1.0 — "Código testado e qualificado"

## Milestone 3: Performance (v1.2.0)
**Foco:** Otimização e cache

- [ ] Cache do JSON em memória (evitar reler arquivo a cada request)
- [ ] Headers de cache no response (ETag, Cache-Control)
- [ ] Monitoramento de performance
- [ ] Rate limiting (proteção contra abuso)

**Entrega:** v1.2.0 — "API otimizada e protegida"

## Milestone 4: Features (v2.0.0)
**Foco:** Novos endpoints e funcionalidades

- [ ] Paginação de resultados
- [ ] Busca por múltiplos parâmetros
- [ ] Endpoint: Contagem de cidades por estado
- [ ] Endpoint: Listar todos os estados com contagem
- [ ] Versionamento de API (/v1/, /v2/)
- [ ] OpenAPI/Swagger docs

**Entrega:** v2.0.0 — "API completa e documentada"

## Status

| Milestone | Status | Progresso |
|-----------|--------|-----------|
| v1.0.0 MVP | ✅ Concluído | 100% |
| v1.1.0 Qualidade | 🔲 Pendente | 0% |
| v1.2.0 Performance | 🔲 Pendente | 0% |
| v2.0.0 Features | 🔲 Pendente | 0% |
