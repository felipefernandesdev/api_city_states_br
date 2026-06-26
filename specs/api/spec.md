# Feature: API Cidades & Estados

- **Card:** —
- **Tier:** Rápido
- **Nível de validação:** P (Protótipo)
- **Status:** implementada

## Contexto e objetivo

API REST pública para consulta de estados e cidades brasileiras. Resolve a necessidade de dados geográficos para aplicações que trabalham com endereços brasileiros. API simples, sem autenticação, dados estáticos em JSON.

## Atores

- Desenvolvedores que consomem a API
- Aplicações que precisam de listas de estados/cidades

## Regras de negócio

1. A API retorna dados de todos os 27 estados brasileiros (26 + DF)
2. Cada estado possui sua lista de cidades
3. Buscas são case-insensitive e suportam busca parcial
4. Endpoints que não encontram dados retornam 404
5. A API é pública, sem necessidade de autenticação

## Contrato de API

### GET /
Retorna mensagem de boas-vindas.

**Resposta 200:**
```json
{
  "mensagem": "🚀 API Cidades & Estados está online! 🌍✨",
  "detalhes": {
    "versão": "1.0.0",
    "ambiente": "development",
    "endpoints": "✨ /estados | /cidades ✨"
  }
}
```

### GET /estados
Lista todos os estados.

**Resposta 200:**
```json
[
  { "sigla": "AC", "nome": "Acre" },
  { "sigla": "AL", "nome": "Alagoas" }
]
```

### GET /estados/:uf
Busca estado pela UF (sigla).

**Parâmetros:**
- `uf` (path, required) — Sigla do estado (ex: "SP", "ac")

**Resposta 200:**
```json
{
  "sigla": "AC",
  "nome": "Acre",
  "cidades": ["Acrelândia", "Assis Brasil", ...]
}
```

**Resposta 404:**
```json
{ "error": "Estado não encontrado" }
```

### GET /estado/nome/:nome
Busca estado pelo nome (busca parcial).

**Parâmetros:**
- `nome` (path, required) — Nome ou parte do nome do estado

**Resposta 200:** Array de estados encontrados
**Resposta 404:** `{ "error": "Estado não encontrado" }`

### GET /estados/:uf/cidades
Lista cidades de um estado.

**Parâmetros:**
- `uf` (path, required) — Sigla do estado

**Resposta 200:**
```json
["Acrelândia", "Assis Brasil", "Brasiléia"]
```

**Resposta 404:**
```json
{ "error": "Estado não encontrado" }
```

### GET /cidades/:nome
Busca cidades pelo nome (busca parcial, em todos os estados).

**Parâmetros:**
- `nome` (path, required) — Nome ou parte do nome da cidade

**Resposta 200:** Array de nomes de cidades encontradas
**Resposta 404:** `{ "error": "Nenhuma cidade encontrada" }`

## Critérios de aceite (BDD)

- [ ] Listar estados retorna todos os 27 estados
- [ ] Buscar por UF existente retorna estado com cidades
- [ ] Buscar por UF inexistente retorna 404
- [ ] Buscar por nome parcial encontra estados correspondentes
- [ ] Listar cidades de um estado retorna todas as cidades
- [ ] Buscar cidade por nome encontra em múltiplos estados
- [ ] Busca é case-insensitive ("sp" encontra "São Paulo")

## Fora de escopo

- Autenticação / API keys
- Banco de dados relacional
- Paginação de resultados
- Versionamento de API
- Busca por CEP ou geolocalização

## Dependências

- Dados do IBGE (estados e cidades)
- Deploy no Vercel

## Decisões / observações

- Dados armazenados em JSON local (não DB) por serem estáticos
- Express.js escolhido por simplicidade (não NestJS)
- Deploy serverless no Vercel por escalabilidade automática
