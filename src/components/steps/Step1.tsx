"use client";

import { Btn } from "@/components/ui";

export default function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
        No reinicies contexto.<br />
        Recupéralo mejorado.
      </h1>
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-4 max-w-lg">
        Cada vez que abres una nueva conversación con tus herramientas, empiezas desde cero.
      </p>
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-4 max-w-lg">
        Aquí, mientras más interactúas, más aprende paradaise contigo.
      </p>
      <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
        En un minuto vas a entender cómo se siente.
      </p>
      <Btn onClick={onNext}>Comenzar</Btn>
    </div>
  );
}
