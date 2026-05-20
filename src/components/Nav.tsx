"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

type NavLink = { href: string; label: string };

const NAV_LINKS_ES: NavLink[] = [
  { href: "/", label: "Demo" },
  { href: "/manifesto", label: "Manifiesto" },
  { href: "/inversionistas", label: "Inversionistas" },
  { href: "/contacto", label: "Contacto" },
  { href: "/privacy", label: "Privacidad" },
  { href: "/about", label: "Nosotros" },
];

const NAV_LINKS_EN: NavLink[] = [
  { href: "/en", label: "Demo" },
  { href: "/en/manifesto", label: "Manifesto" },
  { href: "/en/inversionistas", label: "Investors" },
  { href: "/en/contacto", label: "Contact" },
  { href: "/en/privacy", label: "Privacy" },
  { href: "/en/about", label: "About" },
];

function detectLang(pathname: string): "es" | "en" {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

function swapLang(pathname: string, target: "es" | "en"): string {
  const current = detectLang(pathname);
  if (current === target) return pathname;
  if (target === "en") {
    if (pathname === "/") return "/en";
    return `/en${pathname}`;
  }
  // target === es
  if (pathname === "/en" || pathname === "/en/") return "/";
  return pathname.replace(/^\/en/, "");
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const router = useRouter();
  const lang = detectLang(pathname);
  const links = useMemo(() => (lang === "en" ? NAV_LINKS_EN : NAV_LINKS_ES), [lang]);

  const toggleLang = () => {
    const target = lang === "es" ? "en" : "es";
    router.push(swapLang(pathname, target));
  };

  return (
    <header className="w-full border-b border-white/5 bg-black/95 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link
          href={lang === "en" ? "/en" : "/"}
          className="hover:opacity-80 transition-opacity inline-flex items-center"
          aria-label="paradaise.id"
        >
          <Logo size="nav" />
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
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
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
            title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            <span className={lang === "es" ? "text-white/80" : "text-white/40"}>ES</span>{" "}
            <span className="text-white/25">·</span>{" "}
            <span className={lang === "en" ? "text-white/80" : "text-white/40"}>EN</span>
          </button>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle visible siempre + hamburguesa */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="text-white/70 p-2 -mr-2"
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
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-black">
          <div className="max-w-5xl mx-auto px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
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
              onClick={() => {
                toggleLang();
                setOpen(false);
              }}
              className="text-left text-white/45 text-xs py-2.5 transition-colors"
            >
              <span className={lang === "es" ? "text-white/80" : "text-white/40"}>ES</span>{" "}
              <span className="text-white/30">·</span>{" "}
              <span className={lang === "en" ? "text-white/80" : "text-white/40"}>EN</span>
            </button>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
