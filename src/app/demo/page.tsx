"use client";

import { useState } from "react";
import Step1 from "@/components/steps/Step1";
import Step2 from "@/components/steps/Step2";
import Step3 from "@/components/steps/Step3";
import Step4 from "@/components/steps/Step4";
import Step5 from "@/components/steps/Step5";
import Step6 from "@/components/steps/Step6";
import Step7 from "@/components/steps/Step7";
import type { Consents } from "@/components/steps/types";

const TOTAL_STEPS = 7;

export default function DemoPage() {
  const [step, setStep] = useState<number>(1);
  // Bug C fix (2026-05-26): arrancamos con solo IA conectada (locked).
  // El usuario activa las demás → la barra crece progresivamente → animación pedagógica.
  // Evita la contradicción "todos los toggles en OFF visualmente pero barra dice 100%".
  const [consents, setConsents] = useState<Consents>({ ia: true, notas: false, busquedas: false, browser: false });

  // Input opcional del usuario (textarea libre en Step 4).
  const [ejemplo, setEjemplo] = useState<string>("");
  const [trazaGuardada, setTrazaGuardada] = useState<boolean>(false);

  const scrollToTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const next = () => {
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
    scrollToTop();
  };
  const prev = () => {
    setStep((s) => {
      const target = Math.max(1, s - 1);
      // Si el usuario regresa al Step 4 desde un step posterior, permitirle editar
      // el ejemplo de nuevo (resetear el flag de "ya guardado").
      if (target === 4) setTrazaGuardada(false);
      return target;
    });
    scrollToTop();
  };
  const progressPct = (step / TOTAL_STEPS) * 100;

  const activos = Object.values(consents).filter(Boolean).length;
  const usoPct = Math.round((activos / 4) * 100);
  let usoLabel = "Todo conectado";
  let usoHint = "Mientras más conectes, más útil se vuelve paradaise.";
  if (usoPct < 100 && usoPct >= 75) {
    usoLabel = "Casi todo conectado";
    usoHint = "Buen nivel. paradaise va a sentirse natural.";
  } else if (usoPct < 75 && usoPct >= 50) {
    usoLabel = "Conectado a la mitad";
    usoHint = "Va a ayudarte, pero hay áreas que no estamos viendo.";
  } else if (usoPct < 50) {
    usoLabel = "Casi nada conectado";
    usoHint = "Activa más opciones para que paradaise pueda ayudarte de verdad.";
  }

  const toggleConsent = (k: keyof Consents) => {
    if (k === "ia") return;
    setConsents((c) => ({ ...c, [k]: !c[k] }));
  };

  const reiniciar = () => {
    setStep(1);
    // Bug C fix: reset coherente con estado inicial (solo IA locked).
    setConsents({ ia: true, notas: false, busquedas: false, browser: false });
    setEjemplo("");
    setTrazaGuardada(false);
    scrollToTop();
  };

  // Bug A fix (2026-05-26): header sticky con contador "Paso N de M" + botón
  // "Siguiente" siempre visible. En Step 7 no mostramos el sticky para forzar
  // el flujo de validación humano (captcha + email).
  const showStickyNext = step >= 1 && step < TOTAL_STEPS;

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full px-5 sm:px-6 py-8 sm:py-12">
      {/* Header sticky del demo: contador + botón Siguiente siempre visibles */}
      <header className="sticky top-0 z-30 -mx-5 sm:-mx-6 px-5 sm:px-6 pt-3 pb-4 mb-8 bg-black/70 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-white/55 text-[11px] uppercase tracking-[0.2em]">
            Paso {step} de {TOTAL_STEPS}
          </span>
          {showStickyNext && (
            <button
              type="button"
              onClick={next}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-white text-black hover:bg-white/90 transition-opacity inline-flex items-center gap-1.5"
              aria-label={`Avanzar al paso ${step + 1}`}
            >
              Siguiente <span aria-hidden>→</span>
            </button>
          )}
        </div>
        <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/85 transition-[width] duration-500 ease-in-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      <section>
        {step === 1 && <Step1 onNext={next} />}
        {step === 2 && (
          <Step2
            consents={consents}
            usoLabel={usoLabel}
            usoPct={usoPct}
            usoHint={usoHint}
            onToggle={toggleConsent}
            onNext={next}
            onPrev={prev}
          />
        )}
        {step === 3 && <Step3 onNext={next} onPrev={prev} />}
        {step === 4 && (
          <Step4
            ejemplo={ejemplo}
            trazaGuardada={trazaGuardada}
            setEjemplo={setEjemplo}
            setTrazaGuardada={setTrazaGuardada}
            onNext={next}
            onPrev={prev}
          />
        )}
        {step === 5 && (
          <Step5
            ejemplo={ejemplo}
            onNext={next}
            onPrev={prev}
          />
        )}
        {step === 6 && <Step6 onNext={next} onPrev={prev} />}
        {step === 7 && <Step7 onPrev={prev} onReiniciar={reiniciar} />}
      </section>
    </div>
  );
}
