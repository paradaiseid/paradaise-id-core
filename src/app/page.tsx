"use client";

import { useState } from "react";
import { copy, type Lang, PUBLIC_CONTACT_EMAIL } from "@/lib/copy";

export default function Home() {
  const [lang, setLang] = useState<Lang>("es");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const t = copy[lang];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    // TODO: conectar a /api/waitlist en Day 1 - parte 2
    console.log("Waitlist signup:", { email, lang, timestamp: new Date().toISOString() });
    setTimeout(() => setStatus("success"), 600);
  }

  function toggleLang() {
    setLang(lang === "es" ? "en" : "es");
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="flex justify-between items-center px-6 py-6 md:px-12 md:py-8">
        <div className="text-sm font-medium tracking-tight">paradaise.id</div>
        <button
          onClick={toggleLang}
          className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Cambiar idioma"
        >
          {t.nav.langToggle}
        </button>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-medium leading-tight tracking-tight mb-6">
            {t.hero.headline}
          </h1>
          <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
            {t.hero.sub}
          </p>

          {status === "success" ? (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center max-w-md mx-auto">
              <p className="text-xl font-medium mb-2">{t.waitlist.successTitle}</p>
              <p className="text-sm text-white/60">{t.waitlist.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                placeholder={t.waitlist.emailPlaceholder}
                disabled={status === "submitting"}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {status === "submitting" ? "..." : t.waitlist.submitButton}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-red-400">{t.waitlist.errorMessage}</p>
          )}
        </div>
      </main>

      <footer className="px-6 md:px-12 py-6 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <div>{t.footer.copyright}</div>
          <div className="flex gap-6">
            <a
              href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
              className="hover:text-white/70 transition-colors"
            >
              {t.footer.contact}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
