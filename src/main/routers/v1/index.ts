import { Router } from "express";
import locationsController from "../../../app/controllers/cidades-estados-controller";
import { validateUF, validateNome } from "../../../infra/http/validators";

const v1Routes = Router();

// Rotas fixas devem vir antes das rotas com parâmetros

/**
 * @openapi
 * /v1/health:
 *   get:
 *     summary: Health check
 *     tags: [Sistema]
 *     responses:
 *       200:
 *         description: API funcionando
 */
v1Routes.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

/**
 * @openapi
 * /v1/estados/contagem:
 *   get:
 *     summary: Conta cidades por estado
 *     tags: [Estados]
 *     responses:
 *       200:
 *         description: Lista de estados com contagem
 */
v1Routes.get("/estados/contagem", locationsController.getContagemCidades);

/**
 * @openapi
 * /v1/cidades/busca/avancada:
 *   get:
 *     summary: Busca avançada de cidades
 *     tags: [Cidades]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: Lista de cidades filtradas
 */
v1Routes.get("/cidades/busca/avancada", locationsController.buscaAvancada);

// Rotas com parâmetros

/**
 * @openapi
 * /v1/estados:
 *   get:
 *     summary: Lista todos os estados
 *     tags: [Estados]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 27
 *     responses:
 *       200:
 *         description: Lista de estados com paginação
 */
v1Routes.get("/estados", locationsController.getEstados);

/**
 * @openapi
 * /v1/estados/{uf}:
 *   get:
 *     summary: Busca estado por UF
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: uf
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado encontrado
 *       404:
 *         description: Estado não encontrado
 */
v1Routes.get("/estados/:uf", validateUF, locationsController.getEstadoPorUF);

/**
 * @openapi
 * /v1/estado/nome/{nome}:
 *   get:
 *     summary: Busca estado por nome
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado(s) encontrado(s)
 *       404:
 *         description: Estado não encontrado
 */
v1Routes.get("/estado/nome/:nome", validateNome, locationsController.getEstadoPorNome);

/**
 * @openapi
 * /v1/estados/{uf}/cidades:
 *   get:
 *     summary: Lista cidades de um estado
 *     tags: [Cidades]
 *     parameters:
 *       - in: path
 *         name: uf
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: Lista de cidades com paginação
 *       404:
 *         description: Estado não encontrado
 */
v1Routes.get("/estados/:uf/cidades", validateUF, locationsController.getCidadesPorEstado);

/**
 * @openapi
 * /v1/cidades/{nome}:
 *   get:
 *     summary: Busca cidades por nome
 *     tags: [Cidades]
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de cidades encontradas
 *       404:
 *         description: Nenhuma cidade encontrada
 */
v1Routes.get("/cidades/:nome", validateNome, locationsController.getCidadesPorNome);

export { v1Routes };
