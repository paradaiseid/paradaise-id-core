"use client";

import { Btn } from "@/components/ui";

export default function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
        Aquí vas a ver cómo se siente paradaise<br />
        antes de descargarlo.
      </h1>
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-3 max-w-lg">
        Un minuto.
      </p>
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-3 max-w-lg">
        Sin instalar nada.
      </p>
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
        Sin cuenta.
      </p>
      <Btn onClick={onNext}>Empezar</Btn>
    </div>
  );
}
