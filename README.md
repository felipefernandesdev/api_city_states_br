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
| GET | `/health` | Health check |
| GET | `/estados` | Lista todos os estados |
| GET | `/estados/:uf` | Estado por UF (sigla) |
| GET | `/estado/nome/:nome` | Estado por nome (busca parcial) |
| GET | `/estados/:uf/cidades` | Cidades de um estado |
| GET | `/cidades/:nome` | Busca cidade por nome |

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
[
  { "sigla": "AC", "nome": "Acre" },
  { "sigla": "AL", "nome": "Alagoas" }
]
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
["Acrelândia", "Assis Brasil", "Brasiléia", "..."]
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
    │   └── validators.ts           # Validação de input
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
