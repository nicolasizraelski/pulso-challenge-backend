import { Request, Response } from "express";
import { OpenAIService } from "../../../services/openai.service";
import { FoodAnalysisRequest } from "../../../types";

const openAIService = new OpenAIService();

export class FoodController {
  async analyzeFood(req: Request, res: Response): Promise<void> {
    try {
      if (req.file) {
        console.log("Processing image file:", {
          mimetype: req.file.mimetype,
          size: req.file.size,
        });

        // Validar formato de imagen
        const allowedMimeTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
          res.status(400).json({
            error: `Formato de imagen no soportado. Formatos permitidos: ${allowedMimeTypes.join(", ")}`,
          });
          return;
        }

        const imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result = await openAIService.analyzeFoodFromImage(imageBase64);
        res.json(result);
        return;
      } else if (req.body.text) {
        console.log("Processing text input:", req.body.text);
        const result = await openAIService.analyzeFoodFromText(req.body.text);
        res.json(result);
        return;
      } else {
        res.status(400).json({
          error: "Se requiere una imagen o texto para analizar",
        });
        return;
      }
    } catch (error) {
      console.error("Error in analyzeFood:", error);
      if (error instanceof Error) {
        res.status(500).json({
          error: error.message,
        });
        return;
      }
      res.status(500).json({
        error: "Error interno del servidor",
      });
      return;
    }
  }

  async getNutritionInfo(req: Request, res: Response): Promise<void> {
    try {
      const request: FoodAnalysisRequest = req.body;
      if (!request.food || !request.quantity) {
        res.status(400).json({
          error: "Se requieren los campos 'food' y 'quantity'",
        });
        return;
      }

      const result = await openAIService.getNutritionInfo(request);
      res.json(result);
      return;
    } catch (error) {
      console.error("Error in getNutritionInfo:", error);
      if (error instanceof Error) {
        res.status(500).json({
          error: error.message,
        });
        return;
      }
      res.status(500).json({
        error: "Error interno del servidor",
      });
      return;
    }
  }
}
