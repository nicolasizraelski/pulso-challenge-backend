import { Application } from "express";
import express from "express";
import cors from "cors";

const ConfigureServerMiddlewares = (app: Application) => {
  const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    optionsSuccessStatus: 200,
    preflightContinue: false,
  };

  app.use(cors(corsOptions));

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static("public"));
};

export default ConfigureServerMiddlewares;
