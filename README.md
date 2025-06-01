# Pulso - API de Análisis de Alimentos

API REST que utiliza inteligencia artificial para analizar alimentos y proporcionar información nutricional.

## 🚀 Tecnologías

- **Node.js** - Runtime de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express** - Framework web para Node.js
- **OpenAI API** - Para análisis de imágenes y texto
- **Multer** - Middleware para manejo de archivos
- **CORS** - Middleware para manejo de CORS
- **dotenv** - Manejo de variables de entorno

## 📋 Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn
- Cuenta de OpenAI con API key

## 🔧 Instalación

1. Clonar el repositorio:

```bash
git clone [url-del-repositorio]
cd pulso
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
OPENAI_API_KEY=tu-api-key-de-openai
```

## 🚀 Ejecución

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run build
npm start
```

## 📝 Endpoints

### POST /api/v1/analyze-food

Analiza una imagen o descripción de comida.

**Con imagen:**

- Content-Type: multipart/form-data
- Body:
  - `image`: Archivo de imagen (PNG, JPEG, GIF, WebP)

**Con texto:**

- Content-Type: application/json
- Body:
  ```json
  {
    "text": "descripción de la comida"
  }
  ```

**Respuesta:**

```json
{
  "estimatedFood": "nombre de la comida",
  "estimatedQuantity": "cantidad estimada",
  "confirmationMessage": "mensaje de confirmación"
}
```

### POST /api/v1/get-nutrition-info

Obtiene información nutricional de un alimento.

- Content-Type: application/json
- Body:
  ```json
  {
    "food": "nombre del alimento",
    "quantity": "cantidad"
  }
  ```

**Respuesta:**

```json
{
  "macros": {
    "calories": 200,
    "protein": 30,
    "carbs": 0,
    "fat": 5
  },
  "tip": "consejo saludable"
}
```

## 🔒 Variables de Entorno

| Variable       | Descripción         | Requerido          |
| -------------- | ------------------- | ------------------ |
| PORT           | Puerto del servidor | No (default: 3000) |
| OPENAI_API_KEY | API key de OpenAI   | Sí                 |

## 📦 Estructura del Proyecto

```
src/
├── modules/
│   └── food/
│       ├── controllers/
│       ├── routes/
│       └── prompts/
├── services/
├── types/
└── server/
```