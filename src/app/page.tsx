"use client";

import { useState } from "react";
import Step1 from "@/components/steps/Step1";
import Step2 from "@/components/steps/Step2";
import Step3 from "@/components/steps/Step3";
import Step4 from "@/components/steps/Step4";
import Step5 from "@/components/steps/Step5";
import Step6 from "@/components/steps/Step6";
import Step7 from "@/components/steps/Step7";
import type { Consents, Contexto, Edad } from "@/components/steps/types";

const TOTAL_STEPS = 7;

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [consents, setConsents] = useState<Consents>({ ia: true, notas: true, busquedas: true, browser: true });

  const [contexto, setContexto] = useState<Contexto>(null);
  const [edad, setEdad] = useState<Edad>(null);
  const [proyecto, setProyecto] = useState<string>("");
  const [decision, setDecision] = useState<string>("");
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
  let usoLabel = "Uso optimo";
  let usoHint = "Mas contexto crea mejoras y continuidad mas precisa.";
  if (usoPct < 100 && usoPct >= 75) {
    usoLabel = "Uso recomendado";
    usoHint = "Buen nivel de contexto. La continuidad va a sentirse natural.";
  } else if (usoPct < 75 && usoPct >= 50) {
    usoLabel = "Uso basico";
    usoHint = "Contexto limitado. Las mejoras van a ser mas generales.";
  } else if (usoPct < 50) {
    usoLabel = "Uso solo para prueba";
    usoHint = "No recomendable. No hay suficiente contexto con este nivel.";
  }

  const toggleConsent = (k: keyof Consents) => {
    if (k === "ia") return;
    setConsents((c) => ({ ...c, [k]: !c[k] }));
  };

  const reiniciar = () => {
    setStep(1);
    setConsents({ ia: true, notas: true, busquedas: true, browser: true });
    setContexto(null);
    setEdad(null);
    setProyecto("");
    setDecision("");
    setTrazaGuardada(false);
    scrollToTop();
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto w-full px-5 sm:px-6 py-8 sm:py-12">
      <header className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <span className="text-white/40 text-xs">demo</span>
          <span className="text-white/40 text-xs">paso {step} de {TOTAL_STEPS}</span>
        </div>
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
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
            contexto={contexto}
            edad={edad}
            proyecto={proyecto}
            decision={decision}
            trazaGuardada={trazaGuardada}
            setContexto={setContexto}
            setEdad={setEdad}
            setProyecto={setProyecto}
            setDecision={setDecision}
            setTrazaGuardada={setTrazaGuardada}
            onNext={next}
            onPrev={prev}
          />
        )}
        {step === 5 && (
          <Step5
            contexto={contexto}
            edad={edad}
            proyecto={proyecto}
            decision={decision}
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
