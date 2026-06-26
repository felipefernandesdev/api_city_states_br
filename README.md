# API Cidades & Estados

API REST para consulta de estados e cidades brasileiras. Dados oficiais do IBGE (DTB 2024).

## Stack

- Node.js 18 + Express.js
- TypeScript (strict mode)
- Vitest + Supertest (testes)
- ESLint + Prettier
- Docker
- Deploy: Vercel (serverless)

## Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Informações da API |
| GET | `/playground` | Playground HTML interativo |
| GET | `/health` | Health check |
| GET | `/estados` | Lista estados (paginado) |
| GET | `/estados/:uf` | Estado por UF |
| GET | `/estado/nome/:nome` | Estado por nome |
| GET | `/estados/:uf/cidades` | Cidades de um estado (paginado) |
| GET | `/cidades/:nome` | Busca cidade por nome |
| GET | `/estados/contagem` | Contagem de cidades por estado |
| GET | `/cidades/busca/avancada` | Busca avançada com filtros |

## Setup Local

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env

# Iniciar em modo desenvolvimento
npm run dev
```

A API estará disponível em `http://localhost:3333`.

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor com hot reload |
| `npm run build` | Compilar TypeScript |
| `npm start` | Iniciar em produção |
| `npm run test` | Rodar testes |
| `npm run test:watch` | Testes em watch mode |
| `npm run lint` | Verificar lint |
| `npm run lint:fix` | Corrigir lint |
| `npm run typecheck` | Verificar tipos |

## Exemplos de Uso

### Listar estados

```bash
curl http://localhost:3333/estados
```

```json
{
  "dados": [
    { "sigla": "AC", "nome": "Acre" },
    { "sigla": "AL", "nome": "Alagoas" }
  ],
  "paginacao": {
    "paginaAtual": 1,
    "totalPaginas": 1,
    "totalItens": 27,
    "limite": 27
  }
}
```

### Buscar estado por UF

```bash
curl http://localhost:3333/estados/SP
```

```json
{
  "sigla": "SP",
  "nome": "São Paulo",
  "cidades": ["Adamantina", "Adolfo", "Aguaí", "..."]
}
```

### Listar cidades de um estado

```bash
curl http://localhost:3333/estados/AC/cidades
```

```json
{
  "dados": ["Acrelândia", "Assis Brasil", "Brasiléia"],
  "paginacao": {
    "paginaAtual": 1,
    "totalPaginas": 1,
    "totalItens": 22,
    "limite": 50
  }
}
```

### Buscar cidade por nome

```bash
curl http://localhost:3333/cidades/Rio
```

```json
[
  { "cidade": "Rio Branco", "estado": "AC" },
  { "cidade": "Rio de Janeiro", "estado": "RJ" }
]
```

### Contagem de cidades por estado

```bash
curl http://localhost:3333/estados/contagem
```

```json
{
  "dados": [
    { "sigla": "MG", "nome": "Minas Gerais", "totalCidades": 853 },
    { "sigla": "SP", "nome": "São Paulo", "totalCidades": 645 }
  ],
  "total": 5595
}
```

### Busca avançada

```bash
# Cidades com "Rio" em SP
curl "http://localhost:3333/cidades/busca/avancada?nome=Rio&estado=SP"

# Paginar resultados
curl "http://localhost:3333/estados?pagina=2&limite=10"
```

### Playground

Acesse `http://localhost:3333/playground` para testar os endpoints interativamente.

**Produção:** https://api-city-states-br.vercel.app/playground

### Teste via api.http

O arquivo `api.http` contém todas as rotas prontas para teste no VS Code ou IntelliJ (com extensão REST Client).

## Dados

Fonte: IBGE - Instituto Brasileiro de Geografia e Estatística

- **27 estados** (26 + Distrito Federal)
- **5.595 municípios**
- Divisão Territorial Brasileira (DTB) 2024

### Nota sobre o Distrito Federal

O DF não possui municípios no sentido tradicional. Possui 36 Regiões Administrativas, que são retornadas nos endpoints de cidades.

## Docker

```bash
# Build
docker build -t api-city-states-br .

# Run
docker run -p 3333:3333 api-city-states-br
```

## Deploy

O projeto está configurado para deploy no Vercel via serverless functions.

```bash
# Push para deploy automático
git push origin main
```

## Estrutura do Projeto

```
src/
├── main/
│   ├── index.ts                    # Entry point
│   └── routers/
│       ├── index.ts                # Definição de rotas
│       └── api.test.ts             # Testes de integração
├── app/
│   └── controllers/
│       └── cidades-estados-controller.ts
└── infra/
    ├── http/
    │   ├── index.ts                # App Express
    │   ├── error-handler.ts        # Middleware de erros
    │   ├── validators.ts           # Validação de input
    │   └── playground.ts           # HTML do playground
    └── data/
        ├── data-source.ts          # Cache em memória
        ├── data-source.test.ts     # Testes unitários
        └── estados-cidades.json    # Dados geográficos
```

## Licença

ISC

## Autor

Felipe Fernandes

- Email: fesousadev@gmail.com
- GitHub: [felipefernandesdev](https://github.com/felipefernandesdev)
