// src/app/api/health/route.ts
// GET endpoint para verificar estado del sistema
// Incluye verificación de Gemini API, base de datos, y otros subsistemas

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db/client";
import { waitlistSignups } from "@/server/db/schema";
import { initGemini } from "@/lib/gemini";

interface HealthStatus {
  status: "ok" | "degraded" | "error";
  timestamp: string;
  checks: {
    database: { status: string; message?: string };
    geminiApi: { status: string; message?: string };
  };
}

export async function GET(request: NextRequest): Promise<NextResponse<HealthStatus>> {
  const timestamp = new Date().toISOString();
  const checks: HealthStatus["checks"] = {
    database: { status: "pending" },
    geminiApi: { status: "pending" },
  };

  let overallStatus: "ok" | "degraded" | "error" = "ok";

  // Check 1: Database connectivity
  try {
    const result = await db.select().from(waitlistSignups).limit(1);
    checks.database = {
      status: "ok",
      message: "Database connected (Neon PostgreSQL)",
    };
  } catch (err: any) {
    checks.database = {
      status: "error",
      message: err?.message || "Unknown database error",
    };
    overallStatus = "degraded";
  }

  // Check 2: Gemini API (verificación básica de inicialización)
  try {
    const client = initGemini();
    // Intentar obtener información del modelo sin hacer una llamada costosa
    checks.geminiApi = {
      status: "ok",
      message: "Gemini API client initialized (ADC ready)",
    };
  } catch (err: any) {
    checks.geminiApi = {
      status: "error",
      message:
        err?.message ||
        "Gemini API initialization failed (check ADC setup: gcloud auth application-default login)",
    };
    overallStatus = "degraded";
  }

  const response: HealthStatus = {
    status: overallStatus,
    timestamp,
    checks,
  };

  const statusCode = overallStatus === "ok" ? 200 : overallStatus === "degraded" ? 503 : 500;

  return NextResponse.json(response, { status: statusCode });
}
