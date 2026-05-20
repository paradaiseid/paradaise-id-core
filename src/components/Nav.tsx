"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Demo" },
  { href: "/manifesto", label: "Manifiesto" },
  { href: "/inversionistas", label: "Inversionistas" },
  { href: "/contacto", label: "Contacto" },
  { href: "/privacy", label: "Privacidad" },
  { href: "/about", label: "Nosotros" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [showEnNotice, setShowEnNotice] = useState(false);

  const toggleLang = () => {
    setShowEnNotice(true);
    setTimeout(() => setShowEnNotice(false), 2400);
  };

  return (
    <header className="w-full border-b border-white/5 bg-black/95 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity inline-flex items-center" aria-label="paradaise.id">
          <Logo size="nav" />
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/55 hover:text-white text-[13px] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleLang}
            className="text-white/40 hover:text-white/80 text-[12px] transition-colors ml-2"
            aria-label="Cambiar idioma"
            title="EN coming soon"
          >
            ES <span className="text-white/25">·</span> EN
          </button>
          <ThemeToggle />
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white/70 p-2 -mr-2"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6 L18 18 M18 6 L6 18" strokeLinecap="round" />
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" strokeLinecap="round" />
                <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
                <line x1="4" y1="17" x2="20" y2="17" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {showEnNotice && (
        <div className="hidden md:block absolute right-5 sm:right-8 top-full mt-1 bg-white/[0.06] border border-white/15 text-white/80 text-xs px-3 py-1.5 rounded-md">
          Versión en inglés pronto.
        </div>
      )}

      {open && (
        <div className="md:hidden border-t border-white/5 bg-black">
          <div className="max-w-5xl mx-auto px-5 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white text-sm py-2.5 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={toggleLang}
              className="text-left text-white/45 text-xs py-2.5 transition-colors"
            >
              ES · EN <span className="text-white/30 text-[11px]">(en breve)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
