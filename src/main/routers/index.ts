import { Router } from "express";
import locationsController from "../../app/controllers/cidades-estados-controller";
import { validateUF, validateNome } from "../../infra/http/validators";
import { swaggerHtml } from "../../infra/http/playground";

const routes = Router();

routes.get("/", (_req, res) => {
  res.json({
    mensagem: "API Cidades & Estados está online!",
    versao: "1.1.0",
    playground: "/playground",
    endpoints: {
      estados: "/estados",
      estadoPorUf: "/estados/:uf",
      estadoPorNome: "/estado/nome/:nome",
      cidadesPorEstado: "/estados/:uf/cidades",
      cidadesPorNome: "/cidades/:nome",
      contagem: "/estados/contagem",
      buscaAvancada: "/cidades/busca/avancada",
    },
  });
});

routes.get("/playground", (_req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(swaggerHtml);
});

routes.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

routes.get("/estados/contagem", locationsController.getContagemCidades);
routes.get("/cidades/busca/avancada", locationsController.buscaAvancada);
routes.get("/estados", locationsController.getEstados);
routes.get("/estados/:uf", validateUF, locationsController.getEstadoPorUF);
routes.get("/estado/nome/:nome", validateNome, locationsController.getEstadoPorNome);
routes.get("/estados/:uf/cidades", validateUF, locationsController.getCidadesPorEstado);
routes.get("/cidades/:nome", validateNome, locationsController.getCidadesPorNome);

export { routes };
