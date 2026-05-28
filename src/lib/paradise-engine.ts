// src/lib/paradise-engine.ts
// Helper para leer datos agregados anónimos del Paradise Engine
// Integración local con el daemon de captura

import * as fs from "fs";
import * as path from "path";

interface EngineReport {
  clipboardEvents: number;
  keystrokes: number;
  avgKeystrokeInterval: number;
  corrections: number;
  timeByCategory: Record<string, number>;
  topApps: Array<{ app: string; time: number; category: string }>;
  captureMode: "metadata" | "deep";
  sensitiveTime: number;
}

export interface AggregatedData {
  totalAppsUsed: number;
  timeSpentByCategory: Record<string, number>;
  appSwitches: number;
  focusTimeMinutes: number;
  keyboardActivity: {
    typedMinutes: number;
    dictatedMinutes: number;
    mixedMinutes: number;
  };
  dataIntegrity: {
    sensitiveDataIsolated: boolean;
    deepModeOff: boolean;
  };
  timestamp: string;
  day: string;
}

export async function readParadiseEngineReport(
  reportDate?: string
): Promise<EngineReport | null> {
  // Ruta del reporte: C:\Code\20_Reportes_Diarios\YYYY-MM-DD_reporte.md
  const today = reportDate || new Date().toISOString().split("T")[0];
  const reportPath = path.join(
    process.env.PARADISE_ENGINE_REPORTS_DIR || "C:\\Code\\20_Reportes_Diarios",
    `${today}_reporte.md`
  );

  try {
    if (!fs.existsSync(reportPath)) {
      console.warn(`[paradise-engine] Report not found: ${reportPath}`);
      return null;
    }

    const content = fs.readFileSync(reportPath, "utf-8");

    // Parsear el markdown del reporte
    const report: EngineReport = {
      clipboardEvents: extractNumber(content, /Eventos de clipboard:\s*\*\*(\d+)\*\*/),
      keystrokes: extractNumber(content, /Keystrokes capturados:\s*\*\*(\d+)\*\*/),
      avgKeystrokeInterval: extractNumber(content, /Intervalo promedio entre teclas:\s*(\d+\.?\d*)\s*ms/),
      corrections: extractNumber(content, /Backspaces.*?:\s*\*\*(\d+)\*\*/),
      timeByCategory: extractTimeByCategory(content),
      topApps: extractTopApps(content),
      captureMode: content.includes("Modo profundo.*?OFF") ? "metadata" : "deep",
      sensitiveTime: extractNumber(content, /Tiempo agregado en sesiones.*?:\s*\*\*(\d+\.?\d*)\s*min/),
    };

    return report;
  } catch (err) {
    console.error(`[paradise-engine] Error reading report: ${err}`);
    return null;
  }
}

export async function aggregateDataForAnalysis(report: EngineReport): Promise<AggregatedData> {
  // Convertir datos del reporte a formato anónimo agregado

  // Calcular tiempo total de focus (aproximado)
  const totalTimeMinutes = Object.values(report.timeByCategory).reduce((a, b) => a + b, 0);

  // Contar app switches (basado en keystrokes + clipboard events como proxy)
  // Heurística: cada context switch típicamente genera cambios de clipboard/teclas
  const appSwitches = Math.max(report.clipboardEvents, Math.floor(report.keystrokes / 500));

  return {
    totalAppsUsed: report.topApps.length,
    timeSpentByCategory: report.timeByCategory,
    appSwitches: Math.min(appSwitches, 200), // capped for realism
    focusTimeMinutes: totalTimeMinutes,
    keyboardActivity: {
      typedMinutes: extractNumber(
        JSON.stringify(report),
        /typed:\s*\*\*(\d+)\*\*/
      ),
      dictatedMinutes: extractNumber(
        JSON.stringify(report),
        /dictated:\s*\*\*(\d+)\*\*/
      ),
      mixedMinutes: extractNumber(
        JSON.stringify(report),
        /mixed:\s*\*\*(\d+)\*\*/
      ),
    },
    dataIntegrity: {
      sensitiveDataIsolated: report.captureMode === "metadata",
      deepModeOff: report.captureMode === "metadata",
    },
    timestamp: new Date().toISOString(),
    day: new Date().toISOString().split("T")[0],
  };
}

function extractNumber(text: string, regex: RegExp): number {
  const match = text.match(regex);
  return match ? parseFloat(match[1]) : 0;
}

function extractTimeByCategory(text: string): Record<string, number> {
  const categories: Record<string, number> = {
    ia: 0,
    navegador: 0,
    productividad: 0,
    otro: 0,
  };

  // Extraer de la tabla "Top 15 apps"
  const lines = text.split("\n");
  let inTable = false;

  for (const line of lines) {
    if (line.includes("| App | Tiempo")) {
      inTable = true;
      continue;
    }
    if (inTable && line.trim().startsWith("|")) {
      const parts = line.split("|");
      if (parts.length >= 4) {
        const time = parseFloat(parts[2].trim());
        const category = parts[3].trim().toLowerCase();

        if (!isNaN(time)) {
          const key = category || "otro";
          categories[key] = (categories[key] || 0) + time;
        }
      }
    }
    if (inTable && !line.trim().startsWith("|")) {
      break;
    }
  }

  return categories;
}

function extractTopApps(
  text: string
): Array<{ app: string; time: number; category: string }> {
  const apps: Array<{ app: string; time: number; category: string }> = [];

  const lines = text.split("\n");
  let inTable = false;

  for (const line of lines) {
    if (line.includes("| App | Tiempo")) {
      inTable = true;
      continue;
    }
    if (inTable && line.trim().startsWith("|")) {
      const parts = line.split("|").slice(1, -1); // remove empty first/last
      if (parts.length >= 3) {
        const app = parts[0].trim();
        const time = parseFloat(parts[1].trim());
        const category = parts[2].trim();

        if (app && !isNaN(time)) {
          apps.push({ app, time, category });
        }
      }
    }
    if (inTable && !line.trim().startsWith("|")) {
      break;
    }
  }

  return apps;
}
