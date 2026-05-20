"use client";

import { Btn } from "@/components/ui";

export default function Step6({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const cajitas = [
    { unlocked: true, emoji: "🟢", badge: "Desbloqueada", title: "Captura básica", body: "Tus conversaciones empiezan a conectarse entre sesiones." },
    { unlocked: false, emoji: "🔵", badge: "Próximo nivel", title: "Recuperación cruzada", body: "paradaise empieza a conectar decisiones entre herramientas y tiempo." },
    { unlocked: false, emoji: "🟣", badge: "Más adelante", title: "Habilidades validadas", body: "Tus interacciones empiezan a mostrar en qué eres bueno — con evidencia y continuidad, no solo CV." },
    { unlocked: false, emoji: "⚪", badge: "Tier alto", title: "Ingresos por habilidad", body: "Las habilidades que demuestras pueden abrir nuevas oportunidades dentro de paradaise." },
  ];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">Cómo creces en paradaise</h2>
      <p className="text-white/60 text-sm sm:text-base mb-8 leading-relaxed">
        Tus interacciones, mejoras y habilidades validadas hacen crecer tu continuidad. Nuevas capacidades se activan a medida que avanzas.
      </p>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-6 text-center">
        <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Continuidad actual</div>
        <div className="text-white text-5xl font-semibold tracking-tight">15</div>
        <div className="text-white/50 text-xs mt-2">cada interacción suma</div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {cajitas.map((c, i) => (
          <div
            key={i}
            className={`relative p-4 rounded-lg border transition-all ${
              c.unlocked ? "bg-white/[0.06] border-white/30" : "bg-white/[0.02] border-white/10 opacity-60"
            }`}
          >
            <span
              className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                c.unlocked ? "bg-green-500/15 text-green-200/95" : "bg-white/10 text-white/60"
              }`}
            >
              {c.badge}
            </span>
            <div className="text-2xl mb-2">{c.emoji}</div>
            <div className="text-white text-sm font-medium mb-1">{c.title}</div>
            <div className="text-white/55 text-xs leading-relaxed">{c.body}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-8">
        <div className="text-white text-sm font-medium mb-1">Los accesos se liberan cada 24 hrs después de que tu invitado se registre.</div>
        <div className="text-white/55 text-xs leading-relaxed">Cada nueva conexión acelera tu continuidad.</div>
      </div>

      <div className="flex gap-3">
        <Btn onClick={onPrev} variant="secondary">Atrás</Btn>
        <Btn onClick={onNext}>Continuar</Btn>
      </div>
    </div>
  );
}
