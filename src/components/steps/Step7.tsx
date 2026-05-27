"use client";

import { ChangeEvent, useState } from "react";
import { Btn, Reveal } from "@/components/ui";
import { isValidEmail } from "./types";

interface Props {
  onPrev: () => void;
  onReiniciar: () => void;
}

export default function Step7({ onPrev, onReiniciar }: Props) {
  // Pre-submit
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [emailConfirmShown, setEmailConfirmShown] = useState(false);
  const [humanChecked, setHumanChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);
  const [alreadyIn, setAlreadyIn] = useState(false);

  // Post-success
  const [accesoAbierto, setAccesoAbierto] = useState(false);
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [inviteeConfirm, setInviteeConfirm] = useState("");
  const [inviteeConfirmShown, setInviteeConfirmShown] = useState(false);
  const [invitacionEnviada, setInvitacionEnviada] = useState(false);
  const [invitando, setInvitando] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);

  const emailValido = isValidEmail(email);
  const emailMatch = emailValido && email.toLowerCase() === emailConfirm.toLowerCase() && emailConfirm.length > 0;
  const inviteeValido = isValidEmail(inviteeEmail);
  const inviteeMatch = inviteeValido && inviteeEmail.toLowerCase() === inviteeConfirm.toLowerCase() && inviteeConfirm.length > 0;

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (isValidEmail(e.target.value) && !emailConfirmShown) setEmailConfirmShown(true);
    if (humanChecked) setHumanChecked(false);
  };
  const onEmailConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailConfirm(e.target.value);
    if (humanChecked) setHumanChecked(false);
  };
  const onInviteeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteeEmail(e.target.value);
    if (isValidEmail(e.target.value) && !inviteeConfirmShown) setInviteeConfirmShown(true);
  };

  const handleSubmit = async () => {
    if (!emailValido || !emailMatch || !humanChecked) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), lang: "es" }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        // El backend marca `duplicate: true` si el email ya estaba.
        // Lo tratamos como signup exitoso (registered = true) con mensaje distinto.
        if (data.duplicate) setAlreadyIn(true);
        setRegistered(true);
      } else {
        setSubmitError("Algo no salió bien. Inténtalo de nuevo en un momento.");
      }
    } catch (err) {
      setSubmitError("Algo no salió bien. Inténtalo de nuevo en un momento.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEnviarInvitacion = async () => {
    if (!inviteeValido || !inviteeMatch || invitando || invitacionEnviada) return;
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

  if (registered) {
    return (
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
          {alreadyIn ? "Ya estás en la lista" : "Estás dentro"}
        </h2>
        <p className="text-white/70 text-base mb-6 leading-relaxed">Te avisamos cuando abramos accesos.</p>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-4">
          <div className="text-white text-sm font-medium mb-1">Hoy puedes abrir 1 acceso</div>
          <div className="text-white/55 text-xs leading-relaxed mb-4">Los accesos se liberan cada 24 hrs después de que tu invitado se registre.</div>
          {!accesoAbierto ? (
            <Btn onClick={() => setAccesoAbierto(true)} variant="secondary" small>Abrir acceso</Btn>
          ) : (
            <Btn variant="secondary" small disabled>Acceso abierto</Btn>
          )}
        </div>

        {accesoAbierto && (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-6">
            <div className="text-white text-sm font-medium mb-4">Invitar a alguien</div>

            <div className="mb-3">
              <input
                type="email"
                value={inviteeEmail}
                onChange={onInviteeChange}
                disabled={invitacionEnviada}
                placeholder="su@correo.com"
                className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 disabled:opacity-60 transition-colors"
              />
            </div>

            <Reveal shown={inviteeConfirmShown} className="mb-3">
              <input
                type="email"
                value={inviteeConfirm}
                onChange={(e) => setInviteeConfirm(e.target.value)}
                disabled={invitacionEnviada}
                placeholder="vuelve a escribirlo"
                className={`w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border ${
                  inviteeMatch ? "border-cyan-300/50" : inviteeConfirm.length > 0 ? "border-red-400/50" : "border-white/15"
                } text-white/90 focus:outline-none focus:border-white/50 disabled:opacity-60 transition-colors`}
              />
              {inviteeConfirm.length > 0 && !inviteeMatch && (
                <div className="text-white/55 text-xs mt-2">Revisa este acceso una vez más.</div>
              )}
            </Reveal>

            <div className="flex items-center gap-3 mt-4">
              <Btn onClick={handleEnviarInvitacion} disabled={!inviteeMatch || invitacionEnviada || invitando} small>
                {invitando ? "..." : invitacionEnviada ? "Enviada" : "Enviar invitación"}
              </Btn>
              {invitacionEnviada && <span className="text-cyan-300/80 text-xs">acceso enviado</span>}
            </div>
            {inviteError && <p className="text-red-400/80 text-xs mt-3">{inviteError}</p>}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/"
            className="px-6 py-3 rounded-full font-medium text-sm bg-white text-black hover:bg-white/90 transition-opacity inline-flex items-center justify-center"
          >
            → Inicio
          </a>
          <Btn onClick={onReiniciar} variant="secondary">Ver el demo otra vez</Btn>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">Esto es paradaise.id</h2>
      <p className="text-white/70 text-base mb-8 leading-relaxed">Si esto hizo sentido para ti, reserva tu acceso.</p>

      <div className="mb-3">
        <input
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="tu@email.com"
          className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 transition-colors"
        />
      </div>

      <Reveal shown={emailConfirmShown} className="mb-3">
        <input
          type="email"
          value={emailConfirm}
          onChange={onEmailConfirmChange}
          placeholder="vuelve a escribirlo"
          className={`w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border ${
            emailMatch ? "border-cyan-300/50" : emailConfirm.length > 0 ? "border-red-400/50" : "border-white/15"
          } text-white/90 focus:outline-none focus:border-white/50 transition-colors`}
        />
        {emailConfirm.length > 0 && !emailMatch && (
          <div className="text-white/55 text-xs mt-2">Revisa este acceso una vez más.</div>
        )}
      </Reveal>

      <Reveal shown={emailMatch} className="mb-5">
        <button
          type="button"
          onClick={() => emailMatch && setHumanChecked(true)}
          disabled={humanChecked}
          className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-full text-[13px] transition-colors ${
            humanChecked
              ? "border border-cyan-300/45 bg-cyan-300/[0.06] text-cyan-100/95"
              : "border border-white/12 bg-white/[0.03] text-white/85 hover:border-white/30 hover:bg-white/[0.05] cursor-pointer"
          }`}
        >
          <span
            className={`relative w-[18px] h-[18px] rounded border flex items-center justify-center transition-colors ${
              humanChecked ? "border-cyan-300/60" : "border-white/35 bg-black/20"
            }`}
          >
            <span
              className={`block rounded-sm bg-white/95 transition-all duration-500 ${
                humanChecked ? "w-3 h-3" : "w-0 h-0"
              }`}
            />
          </span>
          Continuar como humano
        </button>
      </Reveal>

      {submitError && <p className="text-red-400/80 text-xs mb-3">{submitError}</p>}

      <div className="flex flex-col sm:flex-row gap-3">
        <Btn onClick={onPrev} variant="secondary">Atrás</Btn>
        <Btn onClick={handleSubmit} disabled={!emailValido || !emailMatch || !humanChecked || submitting}>
          {submitting ? "..." : "Reserva tu acceso"}
        </Btn>
      </div>
    </div>
  );
}
