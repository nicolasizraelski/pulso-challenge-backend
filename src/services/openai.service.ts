import OpenAI from "openai";
import { FoodAnalysisRequest, FoodAnalysisResponse, FoodEstimationResponse } from "../types";
import configs from "../configs";
import { analyzeFoodFromImagePrompt, analyzeFoodFromTextPrompt, getNutritionInfoPrompt } from "../modules/food/prompts";

const openai = new OpenAI({
  apiKey: configs.openaiApiKey,
});

// Utilidad para limpiar bloque de código markdown, si viene envuelto en ```json o similares
function extractJsonFromText(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  return match ? match[1].trim() : text.trim();
}

export class OpenAIService {
  async analyzeFoodFromImage(imageBase64: string): Promise<FoodEstimationResponse> {
    try {
      console.log("Sending request to OpenAI Vision API...");
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: analyzeFoodFromImagePrompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64,
                  detail: "low",
                },
              },
            ],
          },
        ],
        max_tokens: 150,
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("No response from OpenAI");

      const cleanedContent = extractJsonFromText(content);
      console.log("OpenAI Vision API response:", cleanedContent);

      const parsedResponse = JSON.parse(cleanedContent);
      return {
        ...parsedResponse,
        confirmationMessage: `¿Confirmás que la comida es: ${parsedResponse.estimatedFood} (${parsedResponse.estimatedQuantity})?`,
      };
    } catch (error) {
      console.error("Error in analyzeFoodFromImage:", error);
      if (error instanceof Error) {
        throw new Error(`Error analyzing food from image: ${error.message}`);
      }
      throw error;
    }
  }

  async analyzeFoodFromText(text: string): Promise<FoodEstimationResponse> {
    try {
      console.log("Sending request to OpenAI GPT API (analyzeFoodFromText)...");
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: analyzeFoodFromTextPrompt(text),
          },
        ],
        max_tokens: 150,
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("No response from OpenAI");

      const cleanedContent = extractJsonFromText(content);
      console.log("OpenAI GPT-3.5 API response:", cleanedContent);

      const parsedResponse = JSON.parse(cleanedContent);
      return {
        ...parsedResponse,
        confirmationMessage: `¿Confirmás que la comida es: ${parsedResponse.estimatedFood} (${parsedResponse.estimatedQuantity})?`,
      };
    } catch (error) {
      console.error("Error in analyzeFoodFromText:", error);
      if (error instanceof Error) {
        throw new Error(`Error analyzing food from text: ${error.message}`);
      }
      throw error;
    }
  }

  async getNutritionInfo(request: FoodAnalysisRequest): Promise<FoodAnalysisResponse> {
    try {
      console.log("Sending nutrition info request to OpenAI GPT API...");
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: getNutritionInfoPrompt(request.food, request.quantity),
          },
        ],
        max_tokens: 200,
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("No response from OpenAI");

      const cleanedContent = extractJsonFromText(content);
      console.log("OpenAI GPT-3.5 API nutrition response:", cleanedContent);

      return JSON.parse(cleanedContent);
    } catch (error) {
      console.error("Error in getNutritionInfo:", error);
      if (error instanceof Error) {
        throw new Error(`Error getting nutrition information: ${error.message}`);
      }
      throw error;
    }
  }
}
