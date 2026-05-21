// src/app/page.tsx
// MamaLanding — home pública de paradaise.id
// Doctrina: lenguaje cotidiano, sin jerga. La prueba es que la mamá lo entienda.
// El demo interactivo de 7 pasos vive en /demo (link desde "¿Cómo funciona?")

"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";

const WAITLIST_LANG = "es";

export default function MamaLanding() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyIn, setAlreadyIn] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const onSubmit = async () => {
    if (!isValidEmail(email) || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), lang: WAITLIST_LANG }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        if (data.duplicate) {
          setAlreadyIn(true);
        } else {
          setSubmitted(true);
        }
      } else {
        setSubmitError("Algo no salió bien. Inténtalo de nuevo en un momento.");
      }
    } catch {
      setSubmitError("Algo no salió bien. Inténtalo de nuevo en un momento.");
    } finally {
      setSubmitting(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (submitError) setSubmitError(null);
  };

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-5 sm:px-8 py-10 sm:py-16">
      {/* HERO */}
      <section className="mb-14 sm:mb-20">
        <h1 className="text-[28px] sm:text-[40px] font-semibold text-white tracking-tight leading-[1.15] mb-5 max-w-3xl">
          Una aplicación para tu celular y computadora que te ayuda a no perderte entre todo lo que ya haces.
        </h1>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
          Como tener un asistente que no olvida tus pendientes mientras tú sigues haciendo tu vida normal.
        </p>
      </section>

      {/* ¿CUÁL ES EL PROBLEMA? */}
      <section className="mb-14 sm:mb-20">
        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-3">¿Cuál es el problema?</p>
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-4 leading-snug max-w-2xl">
          La vida ya es demasiado compleja como para además tener que organizarla.
        </h2>
        <p className="text-white/70 text-base leading-relaxed max-w-2xl">
          Estás saturado. La vida no para — trabajo, hijos, escuela, amigos, recados, ideas.
          Anotar todo manualmente ya no funciona. Las agendas, celulares y computadoras se dispersan.
          paradaise empieza a conectarlas sin esfuerzo adicional.
        </p>
      </section>

      {/* ¿CÓMO FUNCIONA? */}
      <section className="mb-14 sm:mb-20">
        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-3">¿Cómo funciona?</p>
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-5 leading-snug max-w-2xl">
          La instalas una vez y empieza a ayudarte mientras usas normalmente tu celular y tu computadora.
        </h2>
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-300 text-black font-medium text-sm hover:bg-cyan-200 transition-colors"
        >
          Ver aplicación interactiva
          <span aria-hidden>→</span>
        </Link>
      </section>

      {/* ¿QUÉ TIENES QUE HACER DESPUÉS? */}
      <section className="mb-14 sm:mb-20">
        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-3">¿Qué tienes que hacer después?</p>
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-4 leading-snug">
          Nada. Seguir tu vida normal.
        </h2>
        <p className="text-white/70 text-base leading-relaxed mb-4 max-w-2xl">
          Cuando lo necesites, abres paradaise y puedes ver:
        </p>
        <ul className="space-y-1 text-white/75 text-base leading-snug max-w-2xl">
          <li className="flex gap-2"><span className="text-white/40">·</span><span>tus pendientes</span></li>
          <li className="flex gap-2"><span className="text-white/40">·</span><span>acciones rápidas que destraban tu día</span></li>
          <li className="flex gap-2"><span className="text-white/40">·</span><span>ideas importantes que no quieres perder</span></li>
          <li className="flex gap-2"><span className="text-white/40">·</span><span>continuidad entre conversaciones</span></li>
          <li className="flex gap-2"><span className="text-white/40">·</span><span>y cómo estás usando tu tiempo digital</span></li>
        </ul>
      </section>

      {/* PRIVACIDAD */}
      <section className="mb-14 sm:mb-20">
        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-3">Privacidad</p>
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-6 leading-snug">
          Tu información. Tus reglas.
        </h2>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-white/40 text-[11px] uppercase tracking-wider mb-3">Qué ve</div>
            <p className="text-white/80 text-sm leading-relaxed">
              Solo los espacios que tú decides conectar.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-white/40 text-[11px] uppercase tracking-wider mb-3">Qué nunca ve</div>
            <p className="text-white/80 text-sm leading-relaxed">
              Nunca tu micrófono. Nunca tu cámara. Nunca espacios no activados.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-white/40 text-[11px] uppercase tracking-wider mb-3">Dónde vive</div>
            <p className="text-white/80 text-sm leading-relaxed">
              En infraestructura privada y segura asociada a tu cuenta.
            </p>
          </div>
        </div>

        <p className="text-white/55 text-sm">Nunca vendemos tus datos personales.</p>
      </section>

      {/* WAITLIST */}
      <section className="mb-12">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">Empieza</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-6 leading-snug">
          Estás a un correo de empezar.
        </h2>

        {submitted ? (
          <div className="rounded-xl border border-cyan-300/30 bg-cyan-300/[0.05] p-5 max-w-xl">
            <p className="text-white text-base font-medium mb-1">Estás dentro.</p>
            <p className="text-white/65 text-sm leading-relaxed">
              Te avisamos cuando abramos accesos. Mientras tanto, si quieres ver cómo se siente,
              {" "}<Link href="/demo" className="text-cyan-300/90 underline underline-offset-4 hover:text-cyan-200">ve la aplicación interactiva</Link>.
            </p>
          </div>
        ) : alreadyIn ? (
          <div className="rounded-xl border border-white/15 bg-white/[0.04] p-5 max-w-xl">
            <p className="text-white text-base font-medium mb-1">Ya estás en la lista.</p>
            <p className="text-white/65 text-sm leading-relaxed">
              Te avisamos cuando abramos accesos. Si quieres ver cómo se siente mientras esperas,
              {" "}<Link href="/demo" className="text-cyan-300/90 underline underline-offset-4 hover:text-cyan-200">ve la aplicación interactiva</Link>.
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="email"
              value={email}
              onChange={onChange}
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 transition-colors"
            />
            <button
              type="button"
              onClick={onSubmit}
              disabled={!isValidEmail(email) || submitting}
              className="px-6 py-3 rounded-full font-medium text-sm bg-white text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {submitting ? "..." : "Reservar mi acceso →"}
            </button>
          </div>
        )}
        {submitError && <p className="text-red-400/80 text-xs mt-3">{submitError}</p>}
      </section>
    </div>
  );
}
