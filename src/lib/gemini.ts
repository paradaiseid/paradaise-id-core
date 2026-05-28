// src/lib/gemini.ts
// Helper para Gemini API usando Application Default Credentials (ADC)
// ADC busca credenciales automáticamente en:
// 1. GOOGLE_APPLICATION_CREDENTIALS (archivo JSON)
// 2. ~/.config/gcloud/application_default_credentials.json (local dev)
// 3. Environment de Vercel (variables de entorno)

import { GoogleGenerativeAI } from "@google/generative-ai";

let geminiClient: GoogleGenerativeAI | null = null;

export function initGemini(): GoogleGenerativeAI {
  if (geminiClient) {
    return geminiClient;
  }

  // En entorno de desarrollo, ADC busca automáticamente en:
  // - gcloud auth application-default login (guardado en ~/.config/gcloud/...)
  // En producción (Vercel):
  // - Variables de entorno GOOGLE_APPLICATION_CREDENTIALS o similar

  const apiKey = process.env.GOOGLE_API_KEY || "";

  geminiClient = new GoogleGenerativeAI(apiKey);

  return geminiClient;
}

export async function analyzePatterns(
  aggregatedData: Record<string, unknown>
): Promise<string> {
  const client = initGemini();
  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Analiza los siguientes datos agregados anónimos de uso de aplicaciones y proporciona patrones de comportamiento:

${JSON.stringify(aggregatedData, null, 2)}

Responde en formato JSON con:
{
  "patterns": [
    { "name": "nombre del patrón", "description": "descripción", "confidence": 0-1 }
  ],
  "insights": ["insight 1", "insight 2", ...],
  "recommendations": ["recomendación 1", "recomendación 2", ...]
}

Sé conciso y enfócate en patrones útiles para productividad.
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return text;
}
