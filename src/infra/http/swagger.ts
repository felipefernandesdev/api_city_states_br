import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Cidades & Estados",
      version: "1.1.0",
      description: "API REST para consulta de estados e cidades brasileiras. Dados oficiais do IBGE (DTB 2024).",
      contact: {
        name: "Felipe Fernandes",
        email: "fesousadev@gmail.com",
      },
    },
    servers: [
      {
        url: "https://api-city-states-br.vercel.app",
        description: "Produção",
      },
      {
        url: "http://localhost:3333",
        description: "Desenvolvimento",
      },
    ],
    components: {
      schemas: {
        Estado: {
          type: "object",
          properties: {
            sigla: { type: "string", example: "SP" },
            nome: { type: "string", example: "São Paulo" },
          },
        },
        EstadoCompleto: {
          type: "object",
          properties: {
            sigla: { type: "string", example: "SP" },
            nome: { type: "string", example: "São Paulo" },
            cidades: { type: "array", items: { type: "string" } },
          },
        },
        CidadeResultado: {
          type: "object",
          properties: {
            cidade: { type: "string", example: "São Paulo" },
            estado: { type: "string", example: "SP" },
          },
        },
        ContagemCidades: {
          type: "object",
          properties: {
            sigla: { type: "string", example: "SP" },
            nome: { type: "string", example: "São Paulo" },
            totalCidades: { type: "number", example: 645 },
          },
        },
        Erro: {
          type: "object",
          properties: {
            error: { type: "string", example: "Estado não encontrado" },
          },
        },
      },
    },
  },
  apis: ["./src/main/routers/v1/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

// Gerar JSON estático para o Swagger UI via CDN
const specPath = path.join(__dirname, "../../docs/openapi.json");
const docsDir = path.join(__dirname, "../../docs");

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

fs.writeFileSync(specPath, JSON.stringify(swaggerSpec, null, 2));
