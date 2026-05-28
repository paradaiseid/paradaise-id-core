// src/app/api/sync-paradise/route.ts
// Sincronizar datos del Paradise Engine con Gemini API
// Lee el reporte diario, extrae datos anónimos, envía a /api/analyze

import { NextRequest, NextResponse } from "next/server";
import {
  readParadiseEngineReport,
  aggregateDataForAnalysis,
  type AggregatedData,
} from "@/lib/paradise-engine";
import { analyzePatterns } from "@/lib/gemini";

interface SyncResponse {
  ok: boolean;
  reportDate: string;
  aggregatedData?: AggregatedData;
  analysis?: Record<string, unknown>;
  error?: string;
  message?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<SyncResponse>> {
  try {
    // Opcionalmente aceptar ?date=YYYY-MM-DD en la query
    const { searchParams } = new URL(request.url);
    const reportDate = searchParams.get("date");

    console.log("[sync-paradise] Reading Paradise Engine report for:", reportDate || "today");

    // 1) Leer reporte del Paradise Engine
    const report = await readParadiseEngineReport(reportDate || undefined);

    if (!report) {
      return NextResponse.json(
        {
          ok: false,
          reportDate: reportDate || new Date().toISOString().split("T")[0],
          error: "report_not_found",
          message: "Paradise Engine report not found for this date",
        },
        { status: 404 }
      );
    }

    console.log("[sync-paradise] Report read successfully:", {
      clipboardEvents: report.clipboardEvents,
      keystrokes: report.keystrokes,
      categories: Object.keys(report.timeByCategory),
    });

    // 2) Agregar datos anónimamente
    const aggregatedData = await aggregateDataForAnalysis(report);

    console.log("[sync-paradise] Aggregated data:", aggregatedData);

    // 3) Enviar a Gemini para análisis
    let analysis: Record<string, unknown> = {};
    try {
      const analysisText = await analyzePatterns(aggregatedData as unknown as Record<string, unknown>);

      // Parsear JSON si es posible
      try {
        const jsonMatch = analysisText.match(/```json\n?([\s\S]*?)\n?```/);
        const jsonStr = jsonMatch ? jsonMatch[1] : analysisText;
        analysis = JSON.parse(jsonStr);
      } catch {
        analysis = { rawAnalysis: analysisText };
      }

      console.log("[sync-paradise] Gemini analysis completed");
    } catch (analyzeErr: any) {
      console.error("[sync-paradise] Gemini analysis failed:", analyzeErr?.message);
      // No fallar si Gemini falla — devolver los datos agregados de todas formas
      analysis = { error: "gemini_analysis_failed", message: analyzeErr?.message };
    }

    return NextResponse.json({
      ok: true,
      reportDate: reportDate || new Date().toISOString().split("T")[0],
      aggregatedData,
      analysis,
    });
  } catch (err: any) {
    console.error("[sync-paradise] error:", err?.message);
    return NextResponse.json(
      {
        ok: false,
        reportDate: new Date().toISOString().split("T")[0],
        error: "internal_error",
        message: err?.message || "Sync failed",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse<SyncResponse>> {
  // GET también funciona para testing
  return POST(request);
}
