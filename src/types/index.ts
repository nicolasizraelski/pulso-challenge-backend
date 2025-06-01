export interface FoodAnalysisRequest {
  food: string;
  quantity: string;
}

export interface FoodAnalysisResponse {
  macros: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  tip: string;
}

export interface FoodEstimationResponse {
  estimatedFood: string;
  estimatedQuantity: string;
  confirmationMessage: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
}
