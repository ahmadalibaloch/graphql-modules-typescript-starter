import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import "graphql-import-node";
import "reflect-metadata";

import * as morgan from "morgan";
import AppModule from "./modules/app.modules";

class App {

  public app: express.Application = express();
  public environment: string = process.env.NODE_ENV;

  constructor() {
    this.config();
    this.helloApi();
    this.healthCheck();
    this.graphqlServer();
  }

  private config(): void {
    const corsOption: object = {
      headers: "Origin, X-Requested-With, Content-Type, Accept",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      origin: "*",
    };
    this.app.use(cors(corsOption));
    // parse application/json
    this.app.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));

    if (this.environment === "development") {
      // Morgan for HTTP request logging
      this.app.use(morgan("dev"));
    }

  }

  /**
   * @api {get} /health Request server status
   * @apiName HealthCheck
   * @apiGroup Monitor
   *
   * @apiSuccess {Emoji} thumb for success.
   */
  private healthCheck(): void {
    // By the time API is up, we are both healthy and ready
    this.app.get(["/health", "/ready"], (request: Request, response: Response): void => {
      response.status(200).send("👍");
    });
  }

  private helloApi(): void {
    // By the time API is up, we are both healthy and ready
    this.app.get("/", (request: Request, response: Response): void => {
      response.status(200).send("Hello, API server 1.0.0");
    });
  }

  private graphqlServer(): void {
    this.app.use("/graphql", graphqlHTTP((request: Request, res: Response) => ({
      schema: AppModule.schema,
      graphiql: true,
      customExecuteFn: AppModule.createExecution(),
      context: { request },
    })));
  }

}

export default new App().app;
