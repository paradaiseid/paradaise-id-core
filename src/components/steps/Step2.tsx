"use client";

import { Btn } from "@/components/ui";
import type { Consents } from "./types";

interface Props {
  consents: Consents;
  usoLabel: string;
  usoPct: number;
  usoHint: string;
  onToggle: (k: keyof Consents) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step2({ consents, usoLabel, usoPct, usoHint, onToggle, onNext, onPrev }: Props) {
  const toggles: Array<{ key: keyof Consents; label: string; sub: string; locked?: boolean }> = [
    { key: "ia", label: "Conversaciones con IA", sub: "Para que no se pierdan los chats que sí importan.", locked: true },
    { key: "notas", label: "Notas e ideas", sub: "Para que las ideas no se queden olvidadas." },
    { key: "busquedas", label: "Lo que vuelves a buscar", sub: "Para que tus consultas no se pierdan." },
    { key: "browser", label: "Tu día entre apps", sub: "Para que no empieces desde cero cada vez que cambias de pantalla." },
  ];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">¿Qué quieres conectar?</h2>
      <p className="text-white/60 text-sm sm:text-base mb-8 leading-relaxed">
        Cada opción es algo que tú activas si quieres. Nada entra sin tu permiso.
      </p>

      <div className="space-y-5 mb-6">
        {toggles.map((t) => (
          <div key={t.key} className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => onToggle(t.key)}
              disabled={t.locked}
              aria-label={`Toggle ${t.label}`}
              className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-200 ${
                consents[t.key] ? "bg-white/85" : "bg-white/15"
              } ${t.locked ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-200 ${
                  consents[t.key] ? "translate-x-5 bg-black" : "bg-white"
                }`}
              />
            </button>
            <div className="flex-1">
              <div className="text-white text-sm font-medium">{t.label}</div>
              <div className="text-white/50 text-xs mt-1">{t.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-white text-sm font-medium">{usoLabel}</div>
          <div className="text-white/50 text-xs">{usoPct}%</div>
        </div>
        <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden mt-1.5">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${usoPct}%`,
              background: "linear-gradient(90deg, rgba(239,68,68,0.6), rgba(234,179,8,0.6) 50%, rgba(34,197,94,0.7))",
            }}
          />
        </div>
        <div className="text-white/50 text-xs mt-2 leading-relaxed">{usoHint}</div>
      </div>

      <p className="text-white/40 text-xs mb-6">Puedes cambiar preferencias en cualquier momento.</p>

      <div className="flex gap-3">
        <Btn onClick={onPrev} variant="secondary">Atrás</Btn>
        <Btn onClick={onNext}>Continuar</Btn>
      </div>
    </div>
  );
}
