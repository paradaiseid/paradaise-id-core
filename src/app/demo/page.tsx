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
  const [consents, setConsents] = useState<Consents>({ ia: true, notas: true, busquedas: true, browser: true });

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
    setStep((s) => Math.max(1, s - 1));
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
    setConsents({ ia: true, notas: true, busquedas: true, browser: true });
    setEjemplo("");
    setTrazaGuardada(false);
    scrollToTop();
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full px-5 sm:px-6 py-8 sm:py-12">
      {/* Header del demo: solo a partir del paso 2 (paso 1 es el hero limpio) */}
      {step > 1 && (
        <header className="mb-10">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/85 transition-[width] duration-500 ease-in-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </header>
      )}

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
