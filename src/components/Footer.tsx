"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type FooterLink = { href: string; label: string };

// "Inversionistas" intencionalmente NO listado — la página sigue existiendo pero no se anuncia
// porque rompe la lectura mom-friendly (activa "ah, startup levantando lana").
const FOOTER_LINKS_ES: FooterLink[] = [
  { href: "/about", label: "Nosotros" },
  { href: "/manifesto", label: "Manifiesto" },
  { href: "/privacy", label: "Privacidad" },
  { href: "/contacto", label: "Contacto" },
];

const FOOTER_LINKS_EN: FooterLink[] = [
  { href: "/en/about", label: "About" },
  { href: "/en/manifesto", label: "Manifesto" },
  { href: "/en/privacy", label: "Privacy" },
  { href: "/en/contacto", label: "Contact" },
];

function detectLang(pathname: string): "es" | "en" {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

export default function Footer() {
  const pathname = usePathname() || "/";
  const lang = detectLang(pathname);
  const links = lang === "en" ? FOOTER_LINKS_EN : FOOTER_LINKS_ES;

  return (
    <footer className="border-t border-white/5 py-6 mt-12">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-white/30 text-xs">
          Paradaise — donde el focus de la inteligencia no es artificial
        </p>
        <nav className="flex flex-wrap gap-5" aria-label={lang === "en" ? "Footer" : "Pie de página"}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/65 hover:text-white text-sm transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
