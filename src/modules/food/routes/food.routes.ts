import { RequestHandler, Router } from "express";
import { FoodController } from "../controllers/food.controller";
import multer from "multer";

const router = Router();
const foodController = new FoodController();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/analyze-food", upload.single("image"), foodController.analyzeFood.bind(foodController) as RequestHandler);

router.post("/get-nutrition-info", foodController.getNutritionInfo.bind(foodController) as RequestHandler);

export default router;
