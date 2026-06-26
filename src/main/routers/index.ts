import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../infra/http/swagger";
import { v1Routes } from "./v1";

const routes = Router();

routes.get("/", (_req, res) => {
  res.json({
    mensagem: "API Cidades & Estados está online!",
    versao: "1.1.0",
    documentacao: "/docs",
    endpoints: {
      v1: "/v1",
      health: "/v1/health",
    },
  });
});

routes.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "API Cidades & Estados - Docs",
}));

routes.use("/v1", v1Routes);

// Redirecionar endpoints legados para v1
routes.get("/estados", (_req, res) => {
  res.redirect(301, `/v1/estados${_req.url.includes("?") ? _req.url.substring(_req.url.indexOf("?")) : ""}`);
});
routes.get("/estados/:uf", (_req, res) => {
  res.redirect(301, `/v1/estados/${_req.params.uf}`);
});
routes.get("/estado/nome/:nome", (_req, res) => {
  res.redirect(301, `/v1/estado/nome/${_req.params.nome}`);
});
routes.get("/estados/:uf/cidades", (_req, res) => {
  res.redirect(301, `/v1/estados/${_req.params.uf}/cidades`);
});
routes.get("/cidades/:nome", (_req, res) => {
  res.redirect(301, `/v1/cidades/${_req.params.nome}`);
});

export { routes };
