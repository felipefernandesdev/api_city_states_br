import { Router } from "express";
import locationsController from "../../app/controllers/cidades-estados-controller";
const routes = Router();

routes.get("/estados", locationsController.getEstados);
routes.get("/estados/:uf", locationsController.getEstadoPorUF);
routes.get("/estado/nome/:nome", locationsController.getEstadoPorNome);
routes.get("/estados/:uf/cidades", locationsController.getCidadesPorEstado);
routes.get("/cidades/:nome", locationsController.getCidadesPorNome);

export { routes };
