# REQUIREMENTS.md

> **api_city_states_br** — Requisitos Funcionais e Não Funcionais

## Requisitos Funcionais

### RF01 — Listar Estados
- O endpoint `GET /estados` deve retornar todos os estados do Brasil
- Cada estado deve conter: `sigla` e `nome`
- Formato: array de objetos JSON

### RF02 — Buscar Estado por UF
- O endpoint `GET /estados/:uf` deve retornar um estado específico
- A busca deve ser case-insensitive
- Deve retornar 404 se o estado não for encontrado
- Formato: objeto JSON com `sigla`, `nome` e `cidades`

### RF03 — Buscar Estado por Nome
- O endpoint `GET /estado/nome/:nome` deve retornar estados que contenham o nome informado
- A busca deve ser case-insensitive e suportar busca parcial
- Deve retornar 404 se nenhum estado for encontrado

### RF04 — Listar Cidades por Estado
- O endpoint `GET /estados/:uf/cidades` deve retornar todas as cidades de um estado
- Deve retornar 404 se o estado não for encontrado
- Formato: array de strings (nomes das cidades)

### RF05 — Buscar Cidades por Nome
- O endpoint `GET /cidades/:nome` deve retornar cidades que contenham o nome informado
- A busca deve ser case-insensitive e suportar busca parcial
- Deve retornar 404 se nenhuma cidade for encontrada
- A busca deve ser em TODOS os estados

### RF06 — Health Check
- O endpoint `GET /` deve retornar mensagem de boas-vindas com versão e endpoints disponíveis

## Requisitos Não Funcionais

### RNF01 — Performance
- Tempo de resposta < 50ms para qualquer endpoint
- Dados devem ser carregados eficientemente do JSON

### RNF02 — Segurança
- Helmet para headers de segurança
- CORS configurado para aceitar requisições externas
- Nenhum dado sensível exposto

### RNF03 — Deploy
- Deploy automático no Vercel via Git
- Suporte a Docker para containerização
- Health check funcional

### RNF04 — Documentação
- README com todos os endpoints documentados
- Exemplos de requisição e resposta
- Instruções de setup local

### RNF05 — Manutenibilidade
- TypeScript estrito (sem `any`)
- Código organizado em camadas (app, infra, main)
- Commits convencionais

## Dados

### Fonte
- IBGE (Instituto Brasileiro de Geografia e Estatística)
- 27 estados (26 + DF)
- ~5.570 municípios

### Formato
```json
{
  "estados": [
    {
      "sigla": "AC",
      "nome": "Acre",
      "cidades": ["Acrelândia", "Assis Brasil", ...]
    }
  ]
}
```

## Fora de Escopo (v1.0)

- Autenticação / API keys
- Banco de dados relacional
- Busca por CEP
- Geolocalização (latitude/longitude)
- Paginação de resultados
- Versionamento de API (v1, v2)
