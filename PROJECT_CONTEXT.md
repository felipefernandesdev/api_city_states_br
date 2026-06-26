# PROJECT_CONTEXT.md

> **api_city_states_br** — API REST para consulta de estados e cidades brasileiras.

## Visão Geral

A **API Cidades & Estados** é uma API REST simples e eficiente para consultar dados geográficos do Brasil. Fornece informações sobre os 27 estados (incluindo DF) e todas as suas cidades, totalizando mais de 5.500 municípios.

## Problema que Resolve

Aplicações que trabalham com dados brasileiros frequentemente precisam de listas de estados e cidades para formulários, validação de endereços, preenchimento automático de campos, etc. Esta API oferece esses dados de forma rápida e gratuita, sem necessidade de cadastro.

## Solução

API REST que lê dados de um arquivo JSON local (`estados-cidades.json`) e expõe endpoints para consulta por UF, nome, e busca parcial. Deploy no Vercel com serverless functions.

## Público-Alvo

- Desenvolvedores que precisam de dados de estados/cidades em seus projetos
- Sistemas de cadastro que validam endereços brasileiros
- Aplicações de e-commerce com campos de endereço
- Formulários que precisam de preenchimento automático

## Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Runtime | Node.js 18 |
| Framework | Express.js |
| Linguagem | TypeScript (strict) |
| Dados | JSON local (5.761 linhas) |
| Deploy | Vercel (serverless) |
| Container | Docker |

## Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Mensagem de boas-vindas |
| GET | `/estados` | Lista todos os estados |
| GET | `/estados/:uf` | Estado por UF |
| GET | `/estado/nome/:nome` | Estado por nome |
| GET | `/estados/:uf/cidades` | Cidades de um estado |
| GET | `/cidades/:nome` | Busca cidade por nome |

## Estrutura do Código

```
src/
├── main/
│   ├── index.ts              # Entry point
│   └── routers/index.ts      # Definição de rotas
├── app/
│   └── controllers/
│       └── cidades-estados-controller.ts  # Controller principal
└── infra/
    ├── http/index.ts         # Configuração Express
    └── data/
        └── estados-cidades.json  # Dados dos estados e cidades
```

## Métricas de Sucesso

| Métrica | Target |
|---------|--------|
| Tempo de resposta | < 50ms |
| Uptime | > 99% |
| Cobertura de endpoints | 100% |
| Dados atualizados | IBGE vigente |
