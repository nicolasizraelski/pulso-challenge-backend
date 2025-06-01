export const analyzeFoodFromImagePrompt = `Analiza detalladamente esta imagen de comida. Identificá con precisión qué tipo de alimento hay (por ejemplo: "ensalada de rúcula con queso parmesano y tomate cherry") y una estimación aproximada de su cantidad (en gramos o unidades).
Respondé SOLO con un objeto JSON con dos campos:
- 'estimatedFood': descripción detallada del plato o combinación de alimentos.
- 'estimatedQuantity': cantidad aproximada (por ejemplo: "200g", "1 porción", "1 taza").

Ejemplo esperado: {"estimatedFood": "ensalada de rúcula, queso parmesano y tomate cherry", "estimatedQuantity": "1 porción (aprox. 250g)"}.

No incluyas ningún texto adicional ni explicaciones.`;

export const analyzeFoodFromTextPrompt = (
  text: string
) => `Analiza cuidadosamente la siguiente descripción de comida. Tu objetivo es identificar con la mayor precisión posible el tipo de comida y la cantidad aproximada.

Respondé EXCLUSIVAMENTE con un objeto JSON que contenga:
- 'estimatedFood': descripción clara y específica del plato o alimentos, incluyendo ingredientes si están presentes (por ejemplo: "bondiola con papas al horno").
- 'estimatedQuantity': cantidad estimada en gramos o unidades ("300g", "1 porción", "2 unidades", etc.).

Ejemplo de respuesta válida: {"estimatedFood": "bondiola con papas al horno", "estimatedQuantity": "1 porción (aprox. 300g)"}

No incluyas texto adicional ni explicaciones.

Descripción: ${text}`;

export const getNutritionInfoPrompt = (
  food: string,
  quantity: string
) => `Estás actuando como nutricionista. Analiza la información nutricional para ${quantity} de ${food}.

Devolvé SOLAMENTE un objeto JSON con los siguientes campos:
- 'macros': un objeto con los campos calories, protein, carbs y fat (valores numéricos, sin unidades).
- 'tip': un consejo útil o saludable relacionado con ese alimento.

Ejemplo de respuesta:
{"macros": {"calories": 280, "protein": 25, "carbs": 20, "fat": 12}, "tip": "Ideal para recuperar energía después de entrenar."}

No incluyas texto adicional ni explicaciones.`;
