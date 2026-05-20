"use client";

import { Btn } from "@/components/ui";
import Simulation from "@/components/Simulation";

export default function Step3({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
        Así se ve cuando empieza a entenderte
      </h2>
      <p className="text-white/60 text-sm sm:text-base mb-6 leading-relaxed">
        No es magia, es continuidad. Arriba es tu uso real cruzando herramientas. Abajo es lo que paradaise va detectando contigo.
      </p>

      <Simulation />

      <div className="flex gap-3 mt-6">
        <Btn onClick={onPrev} variant="secondary">Atrás</Btn>
        <Btn onClick={onNext}>Continuar</Btn>
      </div>
    </div>
  );
}
