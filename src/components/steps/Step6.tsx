"use client";

import { Btn } from "@/components/ui";

export default function Step6({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const fases = [
    {
      activa: true,
      title: "Lo básico",
      body: "paradaise empieza a conectar lo que ya estás haciendo. Tus pendientes y tus ideas aparecen sin que tengas que organizarlos.",
    },
    {
      activa: false,
      title: "Más continuidad",
      body: "Cuando uses paradaise más seguido, lo que recordó ayer se vuelve más útil hoy. Sin hacer nada extra.",
    },
    {
      activa: false,
      title: "Más conexiones",
      body: "Con el tiempo, paradaise empieza a ayudarte a no perder hilo entre conversaciones, herramientas y días.",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">paradaise crece contigo</h2>
      <p className="text-white/60 text-sm sm:text-base mb-8 leading-relaxed">
        Entre más lo usas, más útil es. Y nunca tienes que aprender nada nuevo.
      </p>

      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {fases.map((f, i) => (
          <div
            key={i}
            className={`p-5 rounded-lg border transition-all ${
              f.activa ? "bg-white/[0.06] border-white/30" : "bg-white/[0.02] border-white/10 opacity-70"
            }`}
          >
            <div className="text-white text-sm font-medium mb-2">{f.title}</div>
            <div className="text-white/55 text-xs leading-relaxed">{f.body}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-8">
        <div className="text-white text-sm font-medium mb-1">Cuando entras en paradaise, puedes invitar a alguien.</div>
        <div className="text-white/55 text-xs leading-relaxed">Cada invitado abre el siguiente acceso.</div>
      </div>

      <div className="flex gap-3">
        <Btn onClick={onPrev} variant="secondary">Atrás</Btn>
        <Btn onClick={onNext}>Continuar</Btn>
      </div>
    </div>
  );
}
