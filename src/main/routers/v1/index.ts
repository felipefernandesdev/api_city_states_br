import { Router } from "express";
import locationsController from "../../../app/controllers/cidades-estados-controller";
import { validateUF, validateNome } from "../../../infra/http/validators";

const v1Routes = Router();

// Rotas fixas devem vir antes das rotas com parâmetros

v1Routes.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

v1Routes.get("/estados/contagem", locationsController.getContagemCidades);

v1Routes.get("/cidades/busca/avancada", locationsController.buscaAvancada);

// Rotas com parâmetros

v1Routes.get("/estados", locationsController.getEstados);

v1Routes.get("/estados/:uf", validateUF, locationsController.getEstadoPorUF);

v1Routes.get("/estado/nome/:nome", validateNome, locationsController.getEstadoPorNome);

v1Routes.get("/estados/:uf/cidades", validateUF, locationsController.getCidadesPorEstado);

v1Routes.get("/cidades/:nome", validateNome, locationsController.getCidadesPorNome);

export { v1Routes };
