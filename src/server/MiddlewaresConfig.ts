import { Application } from "express";
import express from "express";
import cors from "cors";

const ConfigureServerMiddlewares = (app: Application) => {
  const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static("public"));
};

export default ConfigureServerMiddlewares;
