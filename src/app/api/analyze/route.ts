// src/app/api/analyze/route.ts
// POST endpoint para análisis de patrones con Gemini API
// Recibe datos agregados anónimos del Paradise Engine (sin contenido literal)
// Devuelve patrones de uso identificados por Gemini

import { NextRequest, NextResponse } from "next/server";
import { analyzePatterns } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "invalid_body", message: "Request body must be valid JSON" },
        { status: 400 }
      );
    }

    // Esperamos datos agregados anónimos, ej:
    // {
    //   "totalAppsUsed": 15,
    //   "timeSpentByCategory": { "work": 420, "social": 60 },
    //   "appSwitches": 145,
    //   "focusTimeMinutes": 180,
    //   ...
    // }

    const aggregatedData = body as Record<string, unknown>;

    // Validación mínima: debe tener al menos algún dato
    if (Object.keys(aggregatedData).length === 0) {
      return NextResponse.json(
        { error: "empty_data", message: "No aggregated data provided" },
        { status: 400 }
      );
    }

    console.log("[analyze] Processing aggregated data:", {
      keys: Object.keys(aggregatedData),
      timestamp: new Date().toISOString(),
    });

    // Llamar a Gemini con los datos agregados
    const analysisResult = await analyzePatterns(aggregatedData);

    // Parsear el JSON de respuesta
    let parsedResult: Record<string, unknown>;
    try {
      // Gemini puede devolver markdown con ```json, extraer solo el JSON
      const jsonMatch = analysisResult.match(/```json\n?([\s\S]*?)\n?```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : analysisResult;
      parsedResult = JSON.parse(jsonStr);
    } catch {
      // Si no es JSON válido, devolver como string
      parsedResult = { rawAnalysis: analysisResult };
    }

    return NextResponse.json({
      ok: true,
      analysis: parsedResult,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[analyze] error:", {
      message: err?.message,
      code: err?.code,
      status: err?.status,
      timestamp: new Date().toISOString(),
    });

    // Diferenciar errores de Gemini API de otros errores
    if (err?.message?.includes("API key") || err?.message?.includes("authentication")) {
      return NextResponse.json(
        { error: "auth_error", message: "Gemini API authentication failed" },
        { status: 401 }
      );
    }

    if (err?.message?.includes("quota") || err?.message?.includes("rate limit")) {
      return NextResponse.json(
        { error: "rate_limit", message: "Gemini API rate limit exceeded" },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "internal_error", message: "Analysis failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Use POST to analyze aggregated data",
      example: {
        method: "POST",
        url: "/api/analyze",
        body: {
          totalAppsUsed: 15,
          timeSpentByCategory: { work: 420, social: 60 },
          appSwitches: 145,
          focusTimeMinutes: 180,
        },
      },
    },
    { status: 200 }
  );
}
