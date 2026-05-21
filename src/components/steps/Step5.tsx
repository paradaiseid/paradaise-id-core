"use client";

import { Btn, CardEnhanced } from "@/components/ui";
import { truncar } from "./types";

interface Props {
  ejemplo: string;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step5({ ejemplo, onNext, onPrev }: Props) {
  const tieneEjemplo = ejemplo.trim().length > 0;
  const recordado = tieneEjemplo
    ? `Anclamos lo que nos dijiste: "${truncar(ejemplo.trim(), 80)}"`
    : "Cuando uses paradaise normalmente, lo que aparezca aquí va a ser tuyo: tus pendientes, tus ideas, tus conversaciones recientes.";

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
        Esto es lo que puedes ver en paradaise.
      </h2>
      <p className="text-white/60 text-sm sm:text-base mb-6 leading-relaxed">
        Una vista corta y útil. Sin dashboards, sin gráficas, sin trabajo extra.
      </p>

      <CardEnhanced label="Pendientes que aparecieron solos">
        <div className="whitespace-pre-wrap">
          {tieneEjemplo
            ? `· ${truncar(ejemplo.trim(), 90)}\n· "Llamar al doctor mañana"\n· "Confirmar reunión con Ana"`
            : `· "Llamar al doctor mañana"\n· "Confirmar reunión con Ana"\n· "Comprar pilas para el control"`}
        </div>
      </CardEnhanced>

      <CardEnhanced label="Ideas que no quieres perder">
        <div>
          paradaise guarda las ideas que te llegan entre conversaciones. Cuando vuelves, las tienes ahí, sin tener que recordarlas.
        </div>
      </CardEnhanced>

      <CardEnhanced label="Continuidad entre conversaciones">
        <div>
          {recordado}
        </div>
      </CardEnhanced>

      <CardEnhanced label="Lo que esto te ahorra" className="mb-4">
        <ul className="list-disc list-inside space-y-1">
          <li>No tener que acordarte de todo.</li>
          <li>No empezar desde cero cada vez que abres una app.</li>
          <li>No perder ideas importantes entre ventanas.</li>
        </ul>
      </CardEnhanced>

      <p className="text-white/40 text-xs mb-6">Lo que paradaise muestra nunca cambia lo que tú escribiste.</p>

      <div className="flex gap-3">
        <Btn onClick={onPrev} variant="secondary">Atrás</Btn>
        <Btn onClick={onNext}>Continuar</Btn>
      </div>
    </div>
  );
}
