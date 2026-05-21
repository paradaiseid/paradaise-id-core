"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "paradaise-theme";

function readInitial(): Theme {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readInitial());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  // mientras no esta montado, render neutral para evitar flash de hidratacion
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Cambiar tema"
        className="text-white/40 hover:text-white/80 text-[12px] transition-colors w-7 h-7 inline-flex items-center justify-center"
        suppressHydrationWarning
      >
        <span className="opacity-0">○</span>
      </button>
    );
  }

  const isLight = theme === "light";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Activar modo oscuro" : "Activar modo claro"}
      aria-pressed={isLight}
      title={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      className="text-white/45 hover:text-white/85 transition-colors w-7 h-7 inline-flex items-center justify-center rounded-full"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Icono del modo ACTUAL — luna si estás en oscuro, sol si estás en claro.
            Color hereda de currentColor (text-white/45 en dark → claro / text-black por inversión CSS en light → oscuro). */}
        {isLight ? (
          // sun — actualmente en modo claro
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M4.93 19.07l1.41-1.41" />
            <path d="M17.66 6.34l1.41-1.41" />
          </>
        ) : (
          // moon — actualmente en modo oscuro
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        )}
      </svg>
    </button>
  );
}
