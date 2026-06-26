import { Router } from "express";
import path from "path";
import fs from "fs";
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

// Endpoint para o OpenAPI spec JSON
routes.get("/openapi.json", (_req, res) => {
  const specPath = path.join(__dirname, "../../docs/openapi.json");
  try {
    const spec = JSON.parse(fs.readFileSync(specPath, "utf-8"));
    res.json(spec);
  } catch {
    res.status(500).json({ error: "Spec não encontrado" });
  }
});

// Swagger UI via CDN (funciona em serverless)
routes.get("/docs", (_req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>API Cidades & Estados - Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css">
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      url: '/openapi.json',
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      layout: "BaseLayout",
      deepLinking: true
    });
  </script>
</body>
</html>`);
});

// Rotas v1
routes.use("/v1", v1Routes);

// Redirecionar endpoints legados para v1
routes.get("/estados", (req, res) => {
  res.redirect(301, `/v1/estados${req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""}`);
});
routes.get("/estados/:uf", (req, res) => {
  res.redirect(301, `/v1/estados/${req.params.uf}`);
});
routes.get("/estado/nome/:nome", (req, res) => {
  res.redirect(301, `/v1/estado/nome/${req.params.nome}`);
});
routes.get("/estados/:uf/cidades", (req, res) => {
  res.redirect(301, `/v1/estados/${req.params.uf}/cidades`);
});
routes.get("/cidades/:nome", (req, res) => {
  res.redirect(301, `/v1/cidades/${req.params.nome}`);
});

export { routes };
