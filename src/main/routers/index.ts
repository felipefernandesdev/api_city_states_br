import { Router } from "express";
import locationsController from "../../app/controllers/cidades-estados-controller";
import { validateUF, validateNome } from "../../infra/http/validators";

const routes = Router();

routes.get("/", (_req, res) => {
  res.json({
    mensagem: "API Cidades & Estados está online!",
    detalhes: {
      versão: "1.1.0",
      ambiente: process.env.NODE_ENV || "development",
      endpoints: ["/estados", "/estados/:uf", "/estado/nome/:nome", "/estados/:uf/cidades", "/cidades/:nome"],
    },
  });
});

routes.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

routes.get("/estados", locationsController.getEstados);
routes.get("/estados/:uf", validateUF, locationsController.getEstadoPorUF);
routes.get("/estado/nome/:nome", validateNome, locationsController.getEstadoPorNome);
routes.get("/estados/:uf/cidades", validateUF, locationsController.getCidadesPorEstado);
routes.get("/cidades/:nome", validateNome, locationsController.getCidadesPorNome);

export { routes };
