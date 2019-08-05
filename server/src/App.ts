import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import express from "express";
import logger from "morgan";

import { config } from "./config/config";

import { context } from "./api/context";
import { resolvers } from "./api/resolvers";
import { typeDefs } from "./api/typeDefs";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.api();
  }

  private config(): void {
    this.app.use(logger(config.logger.format));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private api(): void {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context,
    });
    server.applyMiddleware({
      app: this.app,
      path: config.graphql.path,
    });
  }
}

export default new App().app;
