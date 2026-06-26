import "dotenv/config";
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import express, { Express } from "express";
import { routes } from "../../main/routers/index";
import { errorHandler } from "./error-handler";

class App {
  public app: Express;
  private port: string;

  constructor(port?: string) {
    this.port = port ?? `${process.env.PORT}`;
    this.app = express();
    this.configure();
    this.middlewares();
    this.routes();
    this.errorHandling();
  }

  private configure(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: "Muitas requisições. Tente novamente em 15 minutos." },
    });
    this.app.use(limiter);

    this.app.use((_req, res, next) => {
      res.setHeader("Cache-Control", "public, max-age=3600");
      next();
    });

    this.app.use(logger("combined"));
  }

  private routes(): void {
    this.app.use(routes);
  }

  private errorHandling(): void {
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.info(
        `🚀 API Cidades e Estados is running! at port: ${this.port}, process: ${process.pid}`
      );
    });
  }
}

export { App };
