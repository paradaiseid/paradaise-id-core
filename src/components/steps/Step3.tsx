"use client";

import { Btn } from "@/components/ui";
import Simulation from "@/components/Simulation";

export default function Step3({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
        Un ejemplo de cómo alguien hace su vida normal.
      </h2>
      <p className="text-white/60 text-sm sm:text-base mb-6 leading-relaxed">
        Como ves, tú no haces nada. paradaise empieza a conectar lo que ya estás haciendo.
      </p>

      <Simulation />

      <div className="flex gap-3 mt-6">
        <Btn onClick={onPrev} variant="secondary">Atrás</Btn>
        <Btn onClick={onNext}>Continuar</Btn>
      </div>
    </div>
  );
}
