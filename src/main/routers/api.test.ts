import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import { routes } from ".";
import { errorHandler } from "../../infra/http/error-handler";

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler);

describe("API Endpoints", () => {
  describe("GET /", () => {
    it("deve retornar informações da API", async () => {
      const res = await request(app).get("/");
      expect(res.status).toBe(200);
      expect(res.body.mensagem).toContain("API Cidades & Estados");
      expect(res.body.versao).toBe("1.1.0");
    });
  });

  describe("GET /health", () => {
    it("deve retornar status ok", async () => {
      const res = await request(app).get("/health");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
      expect(res.body.uptime).toBeDefined();
    });
  });

  describe("GET /estados", () => {
    it("deve listar estados com paginação", async () => {
      const res = await request(app).get("/estados");
      expect(res.status).toBe(200);
      expect(res.body.dados).toBeDefined();
      expect(Array.isArray(res.body.dados)).toBe(true);
      expect(res.body.paginacao.totalItens).toBe(27);
    });

    it("cada estado deve ter sigla e nome", async () => {
      const res = await request(app).get("/estados");
      res.body.dados.forEach((estado: { sigla: string; nome: string }) => {
        expect(estado.sigla).toBeDefined();
        expect(estado.nome).toBeDefined();
      });
    });
  });

  describe("GET /estados/:uf", () => {
    it("deve retornar estado por UF válida", async () => {
      const res = await request(app).get("/estados/SP");
      expect(res.status).toBe(200);
      expect(res.body.sigla).toBe("SP");
      expect(res.body.nome).toBe("São Paulo");
    });

    it("deve ser case-insensitive", async () => {
      const res = await request(app).get("/estados/sp");
      expect(res.status).toBe(200);
      expect(res.body.sigla).toBe("SP");
    });

    it("deve retornar 404 para UF inexistente", async () => {
      const res = await request(app).get("/estados/XX");
      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Estado não encontrado");
    });

    it("deve retornar 400 para UF inválida", async () => {
      const res = await request(app).get("/estados/A");
      expect(res.status).toBe(400);
    });
  });

  describe("GET /estado/nome/:nome", () => {
    it("deve retornar estado por nome", async () => {
      const res = await request(app).get("/estado/nome/São Paulo");
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe("São Paulo");
    });

    it("deve encontrar por busca parcial", async () => {
      const res = await request(app).get("/estado/nome/paulo");
      expect(res.status).toBe(200);
    });

    it("deve retornar 404 para nome inexistente", async () => {
      const res = await request(app).get("/estado/nome/Inexistente123");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /estados/:uf/cidades", () => {
    it("deve listar cidades com paginação", async () => {
      const res = await request(app).get("/estados/AC/cidades");
      expect(res.status).toBe(200);
      expect(res.body.dados).toBeDefined();
      expect(Array.isArray(res.body.dados)).toBe(true);
      expect(res.body.dados).toContain("Rio Branco");
    });

    it("deve retornar 404 para estado inexistente", async () => {
      const res = await request(app).get("/estados/XX/cidades");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /cidades/:nome", () => {
    it("deve buscar cidades por nome", async () => {
      const res = await request(app).get("/cidades/Rio");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it("resultado deve ter cidade e estado", async () => {
      const res = await request(app).get("/cidades/São Paulo");
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty("cidade");
      expect(res.body[0]).toHaveProperty("estado");
    });

    it("deve retornar 404 para cidade inexistente", async () => {
      const res = await request(app).get("/cidades/CidadeInexistente123");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /estados/contagem", () => {
    it("deve retornar contagem de cidades por estado", async () => {
      const res = await request(app).get("/estados/contagem");
      expect(res.status).toBe(200);
      expect(res.body.dados).toBeDefined();
      expect(res.body.total).toBeDefined();
    });

    it("deve ordenar por total de cidades (decrescente)", async () => {
      const res = await request(app).get("/estados/contagem");
      const dados = res.body.dados;
      for (let i = 1; i < dados.length; i++) {
        expect(dados[i].totalCidades).toBeLessThanOrEqual(dados[i - 1].totalCidades);
      }
    });
  });

  describe("GET /cidades/busca/avancada", () => {
    it("deve buscar cidades com filtro", async () => {
      const res = await request(app).get("/cidades/busca/avancada?nome=Rio");
      expect(res.status).toBe(200);
      expect(res.body.dados).toBeDefined();
    });

    it("deve filtrar por estado", async () => {
      const res = await request(app).get("/cidades/busca/avancada?estado=SP&nome=São Paulo");
      expect(res.status).toBe(200);
      res.body.dados.forEach((item: { estado: string }) => {
        expect(item.estado).toBe("SP");
      });
    });
  });

  describe("GET /playground", () => {
    it("deve retornar HTML", async () => {
      const res = await request(app).get("/playground");
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toContain("text/html");
    });
  });

  describe("GET /cep/:cep", () => {
    it("deve retornar 400 para CEP inválido", async () => {
      const res = await request(app).get("/cep/123");
      expect(res.status).toBe(400);
      expect(res.body.error).toContain("inválido");
    });

    it("deve retornar 400 para CEP com letras", async () => {
      const res = await request(app).get("/cep/0100100A");
      expect(res.status).toBe(400);
    });
  });
});
