"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Simulación del paso 3 del demo — "Así se ve cuando empieza a entenderte"
 *
 * Arriba: un editor mockup con 4 tabs (Claude / GPT / WhatsApp / Notas)
 * donde el cursor "escribe" automáticamente, borra, pega y cambia entre tabs.
 *
 * Abajo: paradaise.id va revelando observaciones del patrón en tiempo real.
 *
 * Loop completo de ~28 segundos. Auto-arranca al montar.
 */

type TabName = "claude" | "gpt" | "whatsapp" | "notas";

type ScriptFrame =
  | { at: number; tab: TabName; mode: "type"; text: string }
  | { at: number; tab: TabName; mode: "delete"; deleteChars: number }
  | { at: number; tab: TabName; mode: "clear" }
  | { at: number; tab: TabName; mode: "append"; text: string }
  | { at: number; tab: TabName; mode: "whatsapp"; who: string; text: string }
  | { at: number; tab: TabName; mode: "idle" };

const SCRIPT: ScriptFrame[] = [
  { at: 0, tab: "claude", mode: "type", text: "Estoy decidiendo si lanzar el producto antes de validar pricing" },
  { at: 4500, tab: "claude", mode: "delete", deleteChars: 8 },
  { at: 5500, tab: "claude", mode: "type", text: "el go-to-market completo" },
  { at: 8500, tab: "gpt", mode: "clear" },
  { at: 9000, tab: "gpt", mode: "type", text: "¿Qué KPIs debería medir las primeras 4 semanas post-lanzamiento?" },
  { at: 13000, tab: "whatsapp", mode: "whatsapp", who: "Mario · cofounder", text: "Oye necesito feedback rápido sobre el copy del landing antes de mandarlo" },
  { at: 16500, tab: "claude", mode: "append", text: "\n\n[pegado desde GPT]\nLos KPIs propuestos son: tasa de conversión visit→signup, tiempo en demo, % completion del onboarding…" },
  { at: 20000, tab: "notas", mode: "clear" },
  { at: 20500, tab: "notas", mode: "type", text: "recordar: revisar el thumbnail del manifesto antes de publicar" },
  { at: 24000, tab: "gpt", mode: "idle" },
];

interface InsightDef {
  at: number;
  textHtml: string;
  meta: string;
}

const INSIGHTS: InsightDef[] = [
  { at: 3200, textHtml: "<strong>Sprint creativo detectado.</strong> 1 herramienta activa, ritmo sostenido.", meta: "paradaise acaba de detectar el patrón contigo" },
  { at: 8000, textHtml: "<strong>Decisión postergada:</strong> \"lanzar el producto\" aparece sin resolución por 2da vez esta semana.", meta: "cruce con tu historial de los últimos 7 días" },
  { at: 13500, textHtml: "<strong>Cambio de modo:</strong> pasaste de razonamiento (IA) a colaboración (WhatsApp) en menos de 5 min.", meta: "patrón típico de bloqueo antes de publicar" },
  { at: 17500, textHtml: "<strong>Conexión cruzada:</strong> conectando la respuesta de GPT con la decisión que estás procesando en Claude.", meta: "sin que hayas etiquetado nada" },
  { at: 22000, textHtml: "<strong>Continuidad sugerida:</strong> mayor claridad detectada históricamente entre 10:00 y 12:00 — agendamos esta decisión para mañana?", meta: "aprendido de tus últimas 14 sesiones" },
];

const LOOP_MS = 28000;

export default function Simulation() {
  const [activeTab, setActiveTab] = useState<TabName>("claude");
  const [buffers, setBuffers] = useState<Record<TabName, string>>({ claude: "", gpt: "", whatsapp: "", notas: "" });
  const [whatsapp, setWhatsapp] = useState<{ who: string; text: string }>({ who: "", text: "" });
  const [insightsVisible, setInsightsVisible] = useState<number[]>([]);
  const [elapsedMs, setElapsedMs] = useState(0);

  const startedAtRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const frameIndexRef = useRef<number>(0);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const buffersRef = useRef<Record<TabName, string>>({ claude: "", gpt: "", whatsapp: "", notas: "" });
  const activeTabRef = useRef<TabName>("claude");

  // Mantener refs sincronizadas con el state para los timers
  useEffect(() => { buffersRef.current = buffers; }, [buffers]);
  useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);

  const setActive = (tab: TabName) => {
    setActiveTab(tab);
    activeTabRef.current = tab;
  };

  const clearTypingTimer = () => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
  };

  const writeBuffer = (tab: TabName, value: string) => {
    buffersRef.current = { ...buffersRef.current, [tab]: value };
    setBuffers(buffersRef.current);
  };

  const typeText = (targetTab: TabName, finalText: string, durationMs: number) => {
    clearTypingTimer();
    const startBuffer = buffersRef.current[targetTab] ?? "";
    const stepDelay = Math.max(15, durationMs / Math.max(1, finalText.length));
    let i = 0;
    typingTimerRef.current = setInterval(() => {
      i += 1;
      writeBuffer(targetTab, startBuffer + finalText.substring(0, i));
      if (i >= finalText.length) clearTypingTimer();
    }, stepDelay);
  };

  const deleteChars = (targetTab: TabName, n: number, durationMs: number) => {
    clearTypingTimer();
    const stepDelay = Math.max(20, durationMs / Math.max(1, n));
    let removed = 0;
    typingTimerRef.current = setInterval(() => {
      removed += 1;
      const buf = buffersRef.current[targetTab] ?? "";
      writeBuffer(targetTab, buf.substring(0, Math.max(0, buf.length - 1)));
      if (removed >= n) clearTypingTimer();
    }, stepDelay);
  };

  const clearBuffer = (targetTab: TabName) => {
    writeBuffer(targetTab, "");
  };

  const runFrame = (frame: ScriptFrame) => {
    setActive(frame.tab);
    if (frame.mode === "type") {
      const duration = Math.min(2200, frame.text.length * 40);
      typeText(frame.tab, frame.text, duration);
    } else if (frame.mode === "delete") {
      deleteChars(frame.tab, frame.deleteChars, 600);
    } else if (frame.mode === "clear") {
      clearBuffer(frame.tab);
    } else if (frame.mode === "append") {
      const text = frame.text;
      let i = 0;
      clearTypingTimer();
      typingTimerRef.current = setInterval(() => {
        i += 5;
        const cur = buffersRef.current[frame.tab] ?? "";
        // Append chunked
        const chunk = text.substring(Math.max(0, i - 5), Math.min(i, text.length));
        writeBuffer(frame.tab, cur + chunk);
        if (i >= text.length) clearTypingTimer();
      }, 35);
    } else if (frame.mode === "whatsapp") {
      setWhatsapp({ who: frame.who, text: "" });
      let i = 0;
      clearTypingTimer();
      typingTimerRef.current = setInterval(() => {
        i += 1;
        setWhatsapp({ who: frame.who, text: frame.text.substring(0, i) });
        if (i >= frame.text.length) clearTypingTimer();
      }, 40);
    } else if (frame.mode === "idle") {
      clearTypingTimer();
    }
  };

  const resetLoop = () => {
    startedAtRef.current = performance.now();
    buffersRef.current = { claude: "", gpt: "", whatsapp: "", notas: "" };
    setBuffers(buffersRef.current);
    setWhatsapp({ who: "", text: "" });
    setInsightsVisible([]);
    frameIndexRef.current = 0;
    if (SCRIPT.length > 0) {
      runFrame(SCRIPT[0]);
      frameIndexRef.current = 1;
    }
  };

  useEffect(() => {
    resetLoop();

    const tick = () => {
      const elapsed = performance.now() - startedAtRef.current;
      // Avanzar frames del script
      while (frameIndexRef.current < SCRIPT.length && SCRIPT[frameIndexRef.current].at <= elapsed) {
        runFrame(SCRIPT[frameIndexRef.current]);
        frameIndexRef.current += 1;
      }
      // Revelar insights
      setInsightsVisible((prev) => {
        let next = prev;
        INSIGHTS.forEach((ins, idx) => {
          if (!next.includes(idx) && elapsed >= ins.at) {
            next = [...next, idx];
          }
        });
        return next === prev ? prev : next;
      });
      setElapsedMs(elapsed);
      if (elapsed >= LOOP_MS) resetLoop();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTypingTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loopPct = Math.min(100, (elapsedMs / LOOP_MS) * 100);
  const seconds = Math.floor(elapsedMs / 1000);
  const totalSec = Math.floor(LOOP_MS / 1000);

  return (
    <div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden mb-2">
        {/* Tabs */}
        <div className="flex bg-white/[0.02] border-b border-white/5 px-2 overflow-x-auto">
          {(["claude", "gpt", "whatsapp", "notas"] as TabName[]).map((t) => {
            const labels: Record<TabName, string> = { claude: "Claude", gpt: "GPT", whatsapp: "WhatsApp", notas: "Notas" };
            const isActive = activeTab === t;
            return (
              <div
                key={t}
                className={`px-3.5 py-2.5 text-xs select-none whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 ${
                  isActive
                    ? "text-white/95 border-b-2 border-white/90 bg-white/[0.04]"
                    : "text-white/45 border-b-2 border-transparent"
                }`}
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    isActive ? "bg-cyan-300/85" : "bg-white/25"
                  }`}
                />
                {labels[t]}
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div className="min-h-[140px] sm:min-h-[200px] px-5 py-4 text-sm leading-relaxed text-white/85 bg-black/20 whitespace-pre-wrap break-words relative">
          {activeTab === "whatsapp" ? (
            <div className="bg-cyan-300/[0.08] border-l-2 border-cyan-300/50 px-3.5 py-2.5 rounded-lg text-[13px] leading-relaxed">
              <div className="text-[11px] text-white/40 mb-1">→ {whatsapp.who}</div>
              <div>{whatsapp.text}</div>
            </div>
          ) : (
            <>
              {buffers[activeTab]}
              <span className="inline-block w-[2px] h-[1em] bg-cyan-300/95 align-text-bottom ml-[1px] animate-[blink_1s_steps(2,start)_infinite]" />
            </>
          )}
        </div>
      </div>

      {/* Análisis */}
      <div className="mt-6 px-5 py-4 rounded-xl bg-cyan-300/[0.04] border border-cyan-300/15">
        <div className="text-[10px] uppercase tracking-[0.12em] text-cyan-300/70 mb-3 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-300/85 animate-pulse" />
          paradaise está conectando este contexto
        </div>

        <div>
          {INSIGHTS.map((ins, idx) => {
            const visible = insightsVisible.includes(idx);
            return (
              <div
                key={idx}
                className={`rounded-lg bg-cyan-300/[0.06] border border-cyan-300/20 text-[13px] leading-relaxed transition-all duration-500 overflow-hidden card-enhanced-body ${
                  visible
                    ? "opacity-100 translate-y-0 px-3.5 py-2.5 mb-2 max-h-[400px]"
                    : "opacity-0 translate-y-2 px-3.5 py-0 mb-0 max-h-0 border-transparent"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: ins.textHtml }} />
                <div className="text-[11px] mt-1 card-enhanced-label">
                  {ins.meta}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-2.5 text-[11px] text-white/40">
          <span>ciclo</span>
          <div className="flex-1 h-[2px] bg-white/[0.06] rounded-full overflow-hidden max-w-[200px]">
            <div className="h-full bg-cyan-300/55 transition-all" style={{ width: `${loopPct}%` }} />
          </div>
          <span>
            {seconds}s / {totalSec}s
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          to { visibility: hidden; }
        }
      `}</style>
    </div>
  );
}
