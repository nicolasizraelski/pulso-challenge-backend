import configs from "../configs";

import { Application, Request, Response, NextFunction } from "express";

const express = require("express");

const TIMEOUT = 600000;
const InitializeServer = (): Application => {
  const app = express();
  app.set("port", configs.port);

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setTimeout(TIMEOUT);
    req.setTimeout(TIMEOUT);
    next();
  });

  const server = app.listen(app.get("port"), () => {
    console.log("Servidor iniciado, puerto " + app.get("port"));
  });

  server.timeout = TIMEOUT;

  return app;
};

export default InitializeServer;
