// src/app/page.tsx
// MamaLanding — home pública de paradaise.id
// Doctrina: lenguaje cotidiano, sin jerga. La prueba es que la mamá lo entienda.
// El demo interactivo de 7 pasos vive en /demo

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

  // Flow post-signup: invitar a alguien.
  const [accesoAbierto, setAccesoAbierto] = useState(false);
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [invitacionEnviada, setInvitacionEnviada] = useState(false);
  const [invitando, setInvitando] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);

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

  const inviteeValido = isValidEmail(inviteeEmail);
  const handleEnviarInvitacion = async () => {
    if (!inviteeValido || invitando || invitacionEnviada) return;
    setInvitando(true);
    setInviteError(null);
    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inviterEmail: email.toLowerCase().trim(),
          inviteeEmail: inviteeEmail.toLowerCase().trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setInvitacionEnviada(true);
      } else {
        setInviteError("No pudimos enviar la invitación. Inténtalo de nuevo en un momento.");
      }
    } catch {
      setInviteError("No pudimos enviar la invitación. Inténtalo de nuevo en un momento.");
    } finally {
      setInvitando(false);
    }
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-12 lg:px-16 py-10 sm:py-14">
      {/* HERO — sin CTAs (los CTAs viven en "¿Cómo funciona?") */}
      <section className="mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-5 max-w-5xl">
          Una aplicación para tu celular y computadora que te ayuda a no perderte entre todo lo que ya haces.
        </h1>
        <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-4xl">
          Como tener un asistente que no olvida tus pendientes mientras tú sigues haciendo tu vida normal.
        </p>
      </section>

      {/* ¿CUÁL ES EL PROBLEMA? */}
      <section className="mb-10 sm:mb-14">
        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-3">¿Cuál es el problema?</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4 leading-snug max-w-4xl">
          La vida ya es demasiado compleja como para además tener que organizarla.
        </h2>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-4xl">
          Estás saturado. La vida no para — trabajo, hijos, escuela, amigos, recados, ideas.
          Las cosas importantes terminan dispersas entre agendas, celulares y computadoras. paradaise empieza a conectarlas.
        </p>
      </section>

      {/* ¿CÓMO FUNCIONA? — aquí viven los dos CTAs (Ver aplicación + Únete) */}
      <section className="mb-10 sm:mb-14">
        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-3">¿Cómo funciona?</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-6 leading-snug max-w-4xl">
          La instalas una vez y empieza a ayudarte mientras usas normalmente tu celular y tu computadora.
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Link
            href="/demo"
            className="btn-paradaise-primary inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm"
          >
            Ver aplicación interactiva
            <span className="text-white/75 text-xs">(1 min)</span>
            <span aria-hidden>→</span>
          </Link>
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/[0.04] transition-colors"
          >
            Únete
          </a>
        </div>
      </section>

      {/* ¿QUÉ TIENES QUE HACER DESPUÉS? */}
      <section className="mb-10 sm:mb-14">
        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-3">¿Qué tienes que hacer después?</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4 leading-snug">
          Nada. Seguir tu vida normal.
        </h2>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-4 max-w-4xl">
          Cuando lo necesites, abres paradaise y puedes ver:
        </p>
        <ul className="space-y-1 text-white/75 text-base sm:text-lg leading-snug max-w-4xl">
          <li className="flex gap-2"><span className="text-white/40">·</span><span>tus pendientes</span></li>
          <li className="flex gap-2"><span className="text-white/40">·</span><span>acciones rápidas para ayudarte a avanzar</span></li>
          <li className="flex gap-2"><span className="text-white/40">·</span><span>ideas importantes que no quieres perder</span></li>
          <li className="flex gap-2"><span className="text-white/40">·</span><span>continuidad entre conversaciones</span></li>
          <li className="flex gap-2"><span className="text-white/40">·</span><span>métricas básicas</span></li>
          <li className="flex gap-2"><span className="text-white/40">·</span><span>uso de IA y redes sociales</span></li>
        </ul>
      </section>

      {/* PRIVACIDAD */}
      <section className="mb-10 sm:mb-14">
        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-3">Privacidad</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-6 leading-snug">
          Tu información. Tus reglas.
        </h2>

        {/* Bug B fix (2026-05-26): 3 columnas solo en lg+ (1024px), no en sm.
            min-w-0 evita overflow horizontal de grid items con texto largo. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 min-w-0">
            <div className="text-white/40 text-[11px] uppercase tracking-wider mb-3">Qué ve</div>
            <p className="text-white/80 text-sm leading-relaxed">
              Solo los espacios que tú decides conectar.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 min-w-0">
            <div className="text-white/40 text-[11px] uppercase tracking-wider mb-3">Qué nunca hace</div>
            <ul className="text-white/80 text-sm leading-relaxed space-y-1.5">
              <li>Nunca escucha tu micrófono.</li>
              <li>Nunca prende tu cámara.</li>
              <li>Nunca lee mensajes fuera de los espacios que tú conectas.</li>
              <li>Nunca vende tus datos personales.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 min-w-0">
            <div className="text-white/40 text-[11px] uppercase tracking-wider mb-3">Dónde vive</div>
            <p className="text-white/80 text-sm leading-relaxed">
              Tu información vive en infraestructura privada y segura asociada únicamente a tu cuenta.
            </p>
          </div>
        </div>
      </section>

      {/* WAITLIST — id ancla para "Únete" del nav y del CTA secundario */}
      <section id="waitlist" className="mb-10 scroll-mt-24">
        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-3">Reserva tu acceso</p>

        {submitted || alreadyIn ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-2 leading-snug">
              {submitted ? "Estás dentro." : "Ya estás en la lista."}
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-6 max-w-2xl">
              Te avisamos cuando abramos accesos.
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-4 max-w-xl">
              <div className="text-white text-sm font-medium mb-1">Hoy puedes abrir 1 acceso</div>
              <div className="text-white/55 text-xs leading-relaxed mb-4">
                Los accesos se liberan cada 24 hrs después de que tu invitado se registre.
              </div>
              {!accesoAbierto ? (
                <button
                  type="button"
                  onClick={() => setAccesoAbierto(true)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white/[0.04] transition-colors"
                >
                  Abrir acceso
                </button>
              ) : (
                <span className="text-white/85 text-xs">Acceso abierto</span>
              )}
            </div>

            {accesoAbierto && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-6 max-w-xl">
                <div className="text-white text-sm font-medium mb-4">Invitar a alguien</div>
                <div className="flex flex-col sm:flex-row gap-3 mb-2">
                  <input
                    type="email"
                    value={inviteeEmail}
                    onChange={(e) => {
                      setInviteeEmail(e.target.value);
                      if (inviteError) setInviteError(null);
                    }}
                    disabled={invitacionEnviada || invitando}
                    placeholder="su@correo.com"
                    className="flex-1 px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 disabled:opacity-60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleEnviarInvitacion}
                    disabled={!inviteeValido || invitacionEnviada || invitando}
                    className="btn-paradaise-primary px-5 py-2.5 rounded-full text-sm font-medium"
                  >
                    {invitando ? "..." : invitacionEnviada ? "Enviada" : "Enviar invitación"}
                  </button>
                </div>
                {invitacionEnviada && (
                  <p className="text-white/75 text-xs mt-2">Acceso enviado.</p>
                )}
                {inviteError && (
                  <p className="text-red-400/80 text-xs mt-2">{inviteError}</p>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/[0.04] transition-colors"
              >
                Ver demo otra vez
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-6 leading-snug">
              Estás a un correo de empezar.
            </h2>
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
                className="btn-paradaise-primary px-6 py-3 rounded-full font-medium text-sm"
              >
                {submitting ? "..." : "Reserva tu acceso →"}
              </button>
            </div>
            {submitError && <p className="text-red-400/80 text-xs mt-3">{submitError}</p>}
          </>
        )}
      </section>
    </div>
  );
}
