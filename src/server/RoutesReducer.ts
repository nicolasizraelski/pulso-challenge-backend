import { Application } from "express";
import foodRoutes from "../modules/food/routes/food.routes";

const prefix = "/";
const ReduceRouters = (app: Application) => {
  app.use(prefix, foodRoutes);
};

export default ReduceRouters;
