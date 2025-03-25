import "dotenv/config";
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import express, { Express } from "express";
import { routes } from "../../main/routers/index";

class App {
  private app: Express;
  private port: string;

  constructor(port?: string) {
    this.port = port ?? `${process.env.PORT}`;
    this.app = express();
    this.configure();
    this.routes();
    this.middlewares();
    this.bootstrap(this.port);
  }
  configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(logger("combined"));
  }
  routes() {
    this.app.use(routes);
  }
  bootstrap(port: string) {
    this.app
      .listen(port)
      .on("listening", () =>
        console.info(
          `🚀 API Cidades e Estados is running! By Felipe Fernandes! at port: 👉 ${port}, process: ${process.pid}`
        )
      );
  }
}

export { App };
