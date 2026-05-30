import { GoogleGenAI } from "@google/genai";
import { GoogleAuth, Impersonated } from "google-auth-library";

// --- paradaise.id · Gemini Integration ---
//
// Rutas de autenticación soportadas (en orden de prioridad):
//
// 1. GOOGLE_API_KEY (AI Studio) — más simple, gratis hasta 15 RPM
//    → Solo requiere GOOGLE_API_KEY en .env.local
//    → Endpoint: generativelanguage.googleapis.com
//
// 2. Vertex AI + Service Account Impersonation — usa créditos GCP
//    → Requiere VERTEX_SA_IMPERSONATE + ADC local + iamcredentials habilitada
//    → Endpoint: aiplatform.googleapis.com
//    → Status (2026-05-29): auth funciona, modelos Gemini 2.0 aún no accesibles
//       en el proyecto (requiere habilitación especial en Model Garden de GCP)
//
// 3. Mock — fallback local para desarrollo sin acceso a Gemini
//    → Se activa cuando ambas rutas fallan O cuando GEMINI_ENABLED=false

const GEMINI_ENABLED = process.env.GEMINI_ENABLED === "true";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const VERTEX_PROJECT = process.env.VERTEX_PROJECT_ID ?? "project-da17d117-ba8e-4f20-ad6";
const VERTEX_LOCATION = process.env.VERTEX_LOCATION ?? "us-central1";
const VERTEX_SA = process.env.VERTEX_SA_IMPERSONATE ??
  "paradaise-gemini@project-da17d117-ba8e-4f20-ad6.iam.gserviceaccount.com";

const GEMINI_MODEL = "gemini-2.0-flash";

// Exported for health-check endpoint
export function initGemini() {
  return new GoogleGenAI({
    apiKey: GOOGLE_API_KEY ?? "not-set",
    vertexai: false,
  });
}

async function getAIClientWithAPIKey(): Promise<GoogleGenAI> {
  return new GoogleGenAI({
    apiKey: GOOGLE_API_KEY!,
    vertexai: false,
  });
}

async function getAIClientWithVertex(): Promise<GoogleGenAI> {
  const baseAuth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const sourceClient = await baseAuth.getClient();

  const impersonated = new Impersonated({
    sourceClient,
    targetPrincipal: VERTEX_SA,
    lifetime: 3600,
    delegates: [],
    targetScopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  return new GoogleGenAI({
    vertexai: true,
    project: VERTEX_PROJECT,
    location: VERTEX_LOCATION,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googleAuthOptions: { authClient: impersonated as any },
  });
}

export async function analyzePatterns(
  aggregatedData: Record<string, unknown>
): Promise<string> {
  if (!GEMINI_ENABLED) {
    return generateMockAnalysis(aggregatedData);
  }

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
  `.trim();

  // --- Ruta 1: AI Studio API key (más directa) ---
  if (GOOGLE_API_KEY && GOOGLE_API_KEY.length > 10) {
    try {
      const ai = await getAIClientWithAPIKey();
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
      });
      const text = response.text ?? "";
      if (text) {
        console.log("[gemini] ✓ AI Studio response ok");
        return text;
      }
    } catch (err) {
      console.error("[gemini] AI Studio error:", err instanceof Error ? err.message : err);
    }
  }

  // --- Ruta 2: Vertex AI + impersonation ---
  try {
    const ai = await getAIClientWithVertex();
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt,
    });
    const text = response.text ?? "";
    if (text) {
      console.log("[gemini] ✓ Vertex AI response ok");
      return text;
    }
  } catch (err) {
    console.error("[gemini] Vertex AI error:", err instanceof Error ? err.message : err);
  }

  // --- Ruta 3: Mock ---
  console.log("[gemini] Using mock analysis");
  return generateMockAnalysis(aggregatedData);
}

function generateMockAnalysis(data: Record<string, unknown>): string {
  const focusTime = (data.focusTimeMinutes as number) ?? 0;
  const appSwitches = (data.appSwitches as number) ?? 0;
  const totalApps = (data.totalAppsUsed as number) ?? 0;

  const focusLabel =
    focusTime > 180 ? "alto" : focusTime > 90 ? "moderado" : "bajo";
  const switchRate = appSwitches > 60 ? "alta" : appSwitches > 30 ? "moderada" : "baja";

  return JSON.stringify({
    patterns: [
      {
        name: "Fragmentación de atención",
        description: `Cambias de aplicación ${appSwitches} veces, lo que indica una frecuencia ${switchRate} de interrupciones. Cada cambio de contexto cuesta entre 10-20 minutos de recuperación cognitiva.`,
        confidence: 0.82,
      },
      {
        name: "Capacidad de enfoque",
        description: `Tu tiempo de foco profundo es ${focusLabel} (${focusTime} min). Usas ${totalApps} aplicaciones distintas, lo que sugiere un flujo de trabajo diverso.`,
        confidence: 0.75,
      },
      {
        name: "Distribución de actividad",
        description:
          "Tu actividad se concentra en herramientas de comunicación y producción, con picos identificables durante la mañana.",
        confidence: 0.68,
      },
    ],
    insights: [
      `Con ${focusTime} minutos de foco acumulado, tu productividad profunda es ${focusLabel}.`,
      `${appSwitches} cambios de app en el día indican una fragmentación ${switchRate} de tu atención.`,
      "Los patrones de uso sugieren un estilo de trabajo reactivo con ventanas de concentración cortas.",
      `Usas ${totalApps} aplicaciones distintas — considera consolidar herramientas para reducir fricción.`,
    ],
    recommendations: [
      "Bloquea períodos de 90 minutos sin notificaciones para trabajo profundo.",
      "Agrupa revisión de mensajes a 3 momentos fijos del día (9am, 1pm, 5pm).",
      "Usa una sola herramienta por tipo de tarea para reducir cambios de contexto.",
      "Registra tu energía cada hora durante una semana para identificar tus picos naturales.",
    ],
  });
}
