"use client";

import { Btn } from "@/components/ui";

interface Props {
  ejemplo: string;
  trazaGuardada: boolean;
  setEjemplo: (v: string) => void;
  setTrazaGuardada: (v: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step4(p: Props) {
  const handleGuardar = () => {
    p.setTrazaGuardada(true);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
        Si quieres, te doy un ejemplo
      </h2>
      <p className="text-white/60 text-sm sm:text-base mb-6 leading-relaxed">
        Esto es opcional. paradaise funciona contigo aunque no escribas nada aquí.
      </p>

      <div className="mb-4">
        <div className="text-white text-sm font-medium mb-3">
          Una frase de alguna conversación o un par de pendientes
          <span className="text-white/40 text-xs font-normal ml-1">(opcional)</span>
        </div>
        <textarea
          rows={5}
          value={p.ejemplo}
          onChange={(e) => p.setEjemplo(e.target.value)}
          disabled={p.trazaGuardada}
          placeholder="Por ejemplo: 'Necesito llamar al doctor mañana', 'la idea que se me ocurrió el lunes sobre…', o cualquier cosa que tengas en mente."
          className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 disabled:opacity-60 resize-none transition-colors"
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-6">
        <p className="text-white/80 text-sm leading-relaxed">
          Tú no haces nada. paradaise ayuda mientras tú sigues viviendo normalmente.
        </p>
      </div>

      {p.trazaGuardada && (
        <div className="bg-green-500/[0.08] border border-green-500/40 text-green-200/95 px-4 py-3 rounded-lg text-sm mb-6">
          Listo. Sigamos.
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <Btn onClick={p.onPrev} variant="secondary">Atrás</Btn>
        {!p.trazaGuardada ? (
          <Btn onClick={handleGuardar}>Continuar</Btn>
        ) : (
          <Btn onClick={p.onNext}>Siguiente</Btn>
        )}
      </div>
    </div>
  );
}
