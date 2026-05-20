"use client";

import { Btn } from "@/components/ui";
import Simulation from "@/components/Simulation";

export default function Step3({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
        Tu continuidad empieza sola
      </h2>
      <p className="text-white/60 text-sm sm:text-base mb-6 leading-relaxed">
        No necesitas etiquetar, limpiar ni reorganizar tu vida digital. paradaise empieza a conectar contexto mientras usas tus herramientas normalmente.
      </p>

      <Simulation />

      <div className="flex gap-3 mt-6">
        <Btn onClick={onPrev} variant="secondary">Atrás</Btn>
        <Btn onClick={onNext}>Continuar</Btn>
      </div>
    </div>
  );
}
