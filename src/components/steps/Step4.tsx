"use client";

import { Btn, Pill } from "@/components/ui";
import type { Contexto, Edad } from "./types";

interface Props {
  contexto: Contexto;
  edad: Edad;
  proyecto: string;
  decision: string;
  trazaGuardada: boolean;
  setContexto: (v: Contexto) => void;
  setEdad: (v: Edad) => void;
  setProyecto: (v: string) => void;
  setDecision: (v: string) => void;
  setTrazaGuardada: (v: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step4(p: Props) {
  const contextos: Array<{ v: Exclude<Contexto, null>; label: string }> = [
    { v: "estudio", label: "Estudio" },
    { v: "empresa", label: "Trabajo en empresa" },
    { v: "freelance", label: "Freelance / independiente" },
    { v: "founder", label: "Fundador / emprendedor" },
    { v: "otro", label: "Otro" },
  ];
  const edades: Array<Exclude<Edad, null>> = ["14-17", "18-24", "25-34", "35-44", "45-54", "55+"];

  const canSave = p.contexto !== null && p.edad !== null;
  const handleGuardar = () => {
    if (!canSave) return;
    p.setTrazaGuardada(true);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
        Tu turno, empieza con algo pequeño
      </h2>
      <p className="text-white/60 text-sm sm:text-base mb-8 leading-relaxed">
        Así empieza paradaise a conectar contigo. Entre más contexto tengas, más continuidad puede devolverte.
      </p>

      <div className="mb-6">
        <div className="text-white text-sm font-medium mb-3">¿En qué estás hoy?</div>
        <div className="flex gap-2 flex-wrap">
          {contextos.map((c) => (
            <Pill
              key={c.v}
              selected={p.contexto === c.v}
              onClick={() => !p.trazaGuardada && p.setContexto(c.v)}
              disabled={p.trazaGuardada}
            >
              {c.label}
            </Pill>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-white text-sm font-medium mb-3">Rango de edad</div>
        <div className="flex gap-2 flex-wrap">
          {edades.map((e) => (
            <Pill
              key={e}
              selected={p.edad === e}
              onClick={() => !p.trazaGuardada && p.setEdad(e)}
              disabled={p.trazaGuardada}
            >
              {e}
            </Pill>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-white text-sm font-medium mb-3">
          Proyecto o tarea en la que estás ahora
          <span className="text-white/40 text-xs font-normal ml-1">(opcional)</span>
        </div>
        <input
          type="text"
          value={p.proyecto}
          onChange={(e) => p.setProyecto(e.target.value)}
          disabled={p.trazaGuardada}
          placeholder="Tarea de primaria, tesis de maestría, lanzamiento de producto o decisión de carrera…"
          className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 disabled:opacity-60 transition-colors"
        />
      </div>

      <div className="mb-6">
        <div className="text-white text-sm font-medium mb-3">
          Decisión más complicada de este proyecto
          <span className="text-white/40 text-xs font-normal ml-1">(opcional)</span>
        </div>
        <textarea
          rows={3}
          value={p.decision}
          onChange={(e) => p.setDecision(e.target.value)}
          disabled={p.trazaGuardada}
          placeholder="¿En qué estás pensando últimamente?"
          className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 disabled:opacity-60 resize-none transition-colors"
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-6">
        <p className="text-white/80 text-sm leading-relaxed">
          Mientras más interactúas con tus herramientas, más insumos para que aprendas y mejores.
        </p>
      </div>

      {p.trazaGuardada && (
        <div className="bg-green-500/[0.08] border border-green-500/40 text-green-200/95 px-4 py-3 rounded-lg text-sm mb-6">
          Guardada, paradaise.id vamos a aprender de esto.
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <Btn onClick={p.onPrev} variant="secondary">Atrás</Btn>
        {!p.trazaGuardada ? (
          <Btn onClick={handleGuardar} disabled={!canSave}>Guardar interacción</Btn>
        ) : (
          <Btn onClick={p.onNext}>Siguiente</Btn>
        )}
      </div>
    </div>
  );
}
