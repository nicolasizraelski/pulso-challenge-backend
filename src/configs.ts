import dotenv from "dotenv";

dotenv.config();

console.log("Environment variables loaded:", {
  PORT: process.env.PORT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ? "Present" : "Missing",
});

const configs = {
  port: process.env.PORT || 3000,
  openaiApiKey: process.env.OPENAI_API_KEY,
};

export default configs;
