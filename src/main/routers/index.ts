import { Router } from "express";
import locationsController from "../../app/controllers/cidades-estados-controller";
const routes = Router();

// 🌆 ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// 🌍 API Cidades & Estados - Rota Inicial
// ✨ Desenvolvido com amor e Node.js
// 🗺️≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

routes.get("/", (request, response) => {
  response.json({
    mensagem: "🚀 API Cidades & Estados está online! 🌍✨",
    detalhes: {
      versão: "1.0.0",
      ambiente: process.env.NODE_ENV || "development 🛠️",
      endpoints: "✨ /estados | /cidades ✨"
    },
    observação: "Feito com ❤️ por você! 💻"
  });
});
routes.get("/estados", locationsController.getEstados);
routes.get("/estados/:uf", locationsController.getEstadoPorUF);
routes.get("/estado/nome/:nome", locationsController.getEstadoPorNome);
routes.get("/estados/:uf/cidades", locationsController.getCidadesPorEstado);
routes.get("/cidades/:nome", locationsController.getCidadesPorNome);

export { routes };
