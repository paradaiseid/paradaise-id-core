"use client";

import { useState, FormEvent } from "react";

export default function ContactoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<"general" | "investor" | "press" | "support">("general");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // For v0 — abre un email pre-llenado al hello@paradaise.id (no hay endpoint todavía)
    const subj = encodeURIComponent(`[${topic}] ${name || "Contacto"} — paradaise.id`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nCorreo: ${email}\nTema: ${topic}\n\n${message}`
    );
    window.location.href = `mailto:hello@paradaise.id?subject=${subj}&body=${body}`;
    setSent(true);
  };

  return (
    <article className="flex-1 max-w-xl mx-auto w-full px-5 sm:px-6 py-12 sm:py-20">
      <header className="mb-10">
        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">Contacto</p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-3">
          Escríbenos.
        </h1>
        <p className="text-white/55 text-base">
          Para temas específicos: founders e inversionistas vayan a <a href="/inversionistas" className="text-cyan-300 hover:underline">/inversionistas</a>.
          Para todo lo demás, este form.
        </p>
      </header>

      {sent ? (
        <div className="rounded-xl border border-cyan-300/30 bg-cyan-300/[0.05] p-5 text-cyan-100/95 text-sm leading-relaxed">
          Se abrió tu cliente de correo con el mensaje pre-llenado. Cuando lo mandes, te respondemos en menos de 72 horas.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/60 text-xs mb-2">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/60 text-xs mb-2">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/60 text-xs mb-2">Tema</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value as typeof topic)}
              className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 transition-colors"
            >
              <option value="general">General</option>
              <option value="investor">Inversionista</option>
              <option value="press">Prensa</option>
              <option value="support">Soporte</option>
            </select>
          </div>

          <div>
            <label className="block text-white/60 text-xs mb-2">Mensaje</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg text-sm bg-white/[0.04] border border-white/15 text-white/90 focus:outline-none focus:border-white/50 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-full font-medium text-sm bg-white text-black hover:bg-white/90 transition-opacity"
          >
            Enviar mensaje
          </button>

          <p className="text-white/40 text-xs pt-2">
            Al darle enviar se abre tu app de correo con el mensaje pre-llenado para que lo revises antes de mandar.
            No guardamos nada en esta página.
          </p>
        </form>
      )}
    </article>
  );
}
