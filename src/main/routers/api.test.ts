import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import { routes } from ".";
import { errorHandler } from "../../infra/http/error-handler";

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler);

describe("API v1 Endpoints", () => {
  describe("GET /", () => {
    it("deve retornar informações da API", async () => {
      const res = await request(app).get("/");
      expect(res.status).toBe(200);
      expect(res.body.mensagem).toContain("API Cidades & Estados");
      expect(res.body.versao).toBe("1.1.0");
    });
  });

  describe("GET /v1/health", () => {
    it("deve retornar status ok", async () => {
      const res = await request(app).get("/v1/health");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
      expect(res.body.uptime).toBeDefined();
    });
  });

  describe("GET /v1/estados", () => {
    it("deve listar estados com paginação", async () => {
      const res = await request(app).get("/v1/estados");
      expect(res.status).toBe(200);
      expect(res.body.dados).toBeDefined();
      expect(res.body.paginacao).toBeDefined();
      expect(Array.isArray(res.body.dados)).toBe(true);
      expect(res.body.paginacao.totalItens).toBe(27);
    });

    it("deve paginar resultados", async () => {
      const res = await request(app).get("/v1/estados?pagina=1&limite=10");
      expect(res.status).toBe(200);
      expect(res.body.dados.length).toBe(10);
      expect(res.body.paginacao.totalPaginas).toBe(3);
    });

    it("cada estado deve ter sigla e nome", async () => {
      const res = await request(app).get("/v1/estados");
      res.body.dados.forEach((estado: { sigla: string; nome: string }) => {
        expect(estado.sigla).toBeDefined();
        expect(estado.nome).toBeDefined();
      });
    });
  });

  describe("GET /v1/estados/:uf", () => {
    it("deve retornar estado por UF válida", async () => {
      const res = await request(app).get("/v1/estados/SP");
      expect(res.status).toBe(200);
      expect(res.body.sigla).toBe("SP");
      expect(res.body.nome).toBe("São Paulo");
    });

    it("deve ser case-insensitive", async () => {
      const res = await request(app).get("/v1/estados/sp");
      expect(res.status).toBe(200);
      expect(res.body.sigla).toBe("SP");
    });

    it("deve retornar 404 para UF inexistente", async () => {
      const res = await request(app).get("/v1/estados/XX");
      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Estado não encontrado");
    });

    it("deve retornar 400 para UF inválida", async () => {
      const res = await request(app).get("/v1/estados/A");
      expect(res.status).toBe(400);
    });
  });

  describe("GET /v1/estado/nome/:nome", () => {
    it("deve retornar estado por nome", async () => {
      const res = await request(app).get("/v1/estado/nome/São Paulo");
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe("São Paulo");
    });

    it("deve encontrar por busca parcial", async () => {
      const res = await request(app).get("/v1/estado/nome/paulo");
      expect(res.status).toBe(200);
    });

    it("deve retornar 404 para nome inexistente", async () => {
      const res = await request(app).get("/v1/estado/nome/Inexistente123");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /v1/estados/:uf/cidades", () => {
    it("deve listar cidades com paginação", async () => {
      const res = await request(app).get("/v1/estados/AC/cidades");
      expect(res.status).toBe(200);
      expect(res.body.dados).toBeDefined();
      expect(Array.isArray(res.body.dados)).toBe(true);
      expect(res.body.dados).toContain("Rio Branco");
    });

    it("deve retornar 404 para estado inexistente", async () => {
      const res = await request(app).get("/v1/estados/XX/cidades");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /v1/cidades/:nome", () => {
    it("deve buscar cidades por nome", async () => {
      const res = await request(app).get("/v1/cidades/Rio");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it("resultado deve ter cidade e estado", async () => {
      const res = await request(app).get("/v1/cidades/São Paulo");
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty("cidade");
      expect(res.body[0]).toHaveProperty("estado");
    });

    it("deve retornar 404 para cidade inexistente", async () => {
      const res = await request(app).get("/v1/cidades/CidadeInexistente123");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /v1/estados/contagem", () => {
    it("deve retornar contagem de cidades por estado", async () => {
      const res = await request(app).get("/v1/estados/contagem");
      expect(res.status).toBe(200);
      expect(res.body.dados).toBeDefined();
      expect(res.body.total).toBeDefined();
      expect(Array.isArray(res.body.dados)).toBe(true);
    });

    it("estados devem ter totalCidades", async () => {
      const res = await request(app).get("/v1/estados/contagem");
      res.body.dados.forEach((estado: { sigla: string; totalCidades: number }) => {
        expect(estado.sigla).toBeDefined();
        expect(estado.totalCidades).toBeGreaterThan(0);
      });
    });

    it("deve ordenar por total de cidades (decrescente)", async () => {
      const res = await request(app).get("/v1/estados/contagem");
      const dados = res.body.dados;
      for (let i = 1; i < dados.length; i++) {
        expect(dados[i].totalCidades).toBeLessThanOrEqual(dados[i - 1].totalCidades);
      }
    });
  });

  describe("GET /v1/cidades/busca/avancada", () => {
    it("deve buscar cidades com filtro", async () => {
      const res = await request(app).get("/v1/cidades/busca/avancada?nome=Rio");
      expect(res.status).toBe(200);
      expect(res.body.dados).toBeDefined();
      expect(Array.isArray(res.body.dados)).toBe(true);
    });

    it("deve filtrar por estado", async () => {
      const res = await request(app).get("/v1/cidades/busca/avancada?estado=SP&nome=São Paulo");
      expect(res.status).toBe(200);
      res.body.dados.forEach((item: { estado: string }) => {
        expect(item.estado).toBe("SP");
      });
    });

    it("deve paginar resultados", async () => {
      const res = await request(app).get("/v1/cidades/busca/avancada?nome=Rio&limite=5");
      expect(res.status).toBe(200);
      expect(res.body.dados.length).toBeLessThanOrEqual(5);
    });
  });
});
