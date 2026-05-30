"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------
interface Pattern {
  name: string;
  description: string;
  confidence: number;
}

interface Analysis {
  patterns: Pattern[];
  insights: string[];
  recommendations: string[];
}

// ---------------------------------------------------------------------------
// Datos del día — demo estático. En producción vendrán del Paradise Engine
// vía /api/sync-paradise → DB → aquí.
// ---------------------------------------------------------------------------
const DEMO_DATA = {
  focusTimeMinutes: 145,
  totalAppsUsed: 12,
  appSwitches: 63,
  timeSpentByCategory: {
    comunicacion: 95,
    produccion: 145,
    navegacion: 45,
    entretenimiento: 15,
  },
};

const STATS = [
  { label: "Foco", value: "145 min", sub: "profundo" },
  { label: "Apps", value: "12", sub: "distintas" },
  { label: "Cambios", value: "63", sub: "de contexto" },
  { label: "Prod.", value: "145 min", sub: "en producción" },
];

// ---------------------------------------------------------------------------
// Sub-componentes
// ---------------------------------------------------------------------------
function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="w-full h-[2px] bg-white/10 rounded-full mt-3">
      <div
        className="h-full bg-cyan-300/50 rounded-full transition-[width] duration-700"
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[80, 60, 90, 55].map((w, i) => (
        <div key={i} className="h-4 bg-white/[0.06] rounded" style={{ width: `${w}%` }} />
      ))}
      <div className="h-24 bg-white/[0.04] rounded-lg mt-4" />
      <div className="h-24 bg-white/[0.04] rounded-lg" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Página
// ---------------------------------------------------------------------------
export default function DashboardPage() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(DEMO_DATA),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setAnalysis(data.analysis as Analysis);
        else setError("No se pudo cargar el análisis.");
      })
      .catch(() => setError("Error al conectar con el análisis."))
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const fecha = now.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-10 sm:py-14">

        {/* Header */}
        <div className="mb-8">
          <div className="text-white/35 text-[11px] uppercase tracking-[0.18em] mb-2 capitalize">{fecha}</div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-1">Tu día de hoy</h1>
          <p className="text-white/45 text-sm leading-relaxed">
            paradaise analizó tu actividad y encontró estos patrones.
          </p>
        </div>

        {/* Métricas del día */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-10">
          {STATS.map((s) => (
            <div key={s.label} className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <div className="text-white/35 text-[10px] uppercase tracking-wider mb-1">{s.label}</div>
              <div className="text-lg sm:text-xl font-semibold">{s.value}</div>
              <div className="text-white/30 text-[10px] mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Cabecera análisis */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Análisis generado por Gemini
          </span>
          <span className="w-1 h-1 rounded-full bg-cyan-300/50 inline-block" />
        </div>

        {/* Estados */}
        {loading && <Skeleton />}

        {error && (
          <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/[0.05] text-red-300/80 text-sm">
            {error}
          </div>
        )}

        {/* Resultados */}
        {analysis && (
          <div className="space-y-8">

            {/* Patrones */}
            <section>
              <h2 className="text-[10px] uppercase tracking-[0.18em] text-white/35 mb-3">
                Patrones identificados
              </h2>
              <div className="space-y-2.5">
                {analysis.patterns.map((p, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-cyan-300/[0.05] border border-cyan-300/[0.15]"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <span className="text-sm font-medium text-white/90 leading-snug">{p.name}</span>
                      <span className="text-[10px] text-cyan-300/55 shrink-0 mt-0.5 tabular-nums">
                        {Math.round(p.confidence * 100)}%
                      </span>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed">{p.description}</p>
                    <ConfidenceBar value={p.confidence} />
                  </div>
                ))}
              </div>
            </section>

            {/* Insights */}
            <section>
              <h2 className="text-[10px] uppercase tracking-[0.18em] text-white/35 mb-3">
                Lo que esto significa
              </h2>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2.5">
                {analysis.insights.map((insight, i) => (
                  <div key={i} className="flex gap-2.5 text-sm text-white/60 leading-relaxed">
                    <span className="text-white/20 shrink-0 mt-0.5">·</span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Recomendaciones */}
            <section>
              <h2 className="text-[10px] uppercase tracking-[0.18em] text-white/35 mb-3">
                Qué puedes hacer
              </h2>
              <div className="space-y-2">
                {analysis.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.07] hover:bg-white/[0.04] transition-colors"
                  >
                    <span className="text-white/20 text-xs shrink-0 mt-0.5 tabular-nums">{i + 1}</span>
                    <p className="text-white/65 text-sm leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
          <p className="text-white/20 text-[11px]">
            Análisis local · tus datos no salen de tu dispositivo
          </p>
          <Link
            href="/demo"
            className="text-white/35 hover:text-white/70 text-[11px] transition-colors"
          >
            Ver demo →
          </Link>
        </div>
      </div>
    </div>
  );
}
