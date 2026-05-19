// src/lib/copy.ts
// Strings centralizados del landing v0 — ES + EN
// Cualquier cambio de copy se hace AQUÍ, nunca en page.tsx

export const copy = {
  es: {
    nav: {
      langToggle: "EN",
    },
    hero: {
      headline: "No reinicies contexto. Recupéralo mejorado.",
      sub: "paradaise.id preserva cómo decides, trabajas y corriges a través de conversaciones, herramientas y tiempo. Bajo tu consentimiento.",
      cta: "Reserva tu acceso",
    },
    waitlist: {
      emailPlaceholder: "tu@correo.com",
      submitButton: "Reserva tu acceso",
      successTitle: "Estás dentro.",
      successMessage: "Te avisamos en cuanto abramos accesos.",
      errorMessage: "Algo falló. Intenta de nuevo en un momento.",
    },
    footer: {
      copyright: "© 2026 paradaise.id",
      contact: "hello@paradaise.id",
      privacy: "Privacidad",
      manifesto: "Manifiesto",
    },
  },
  en: {
    nav: {
      langToggle: "ES",
    },
    hero: {
      headline: "Don't reset context. Recover it improved.",
      sub: "paradaise.id preserves how you decide, work and self-correct across conversations, tools and time. Under your consent.",
      cta: "Reserve your access",
    },
    waitlist: {
      emailPlaceholder: "you@email.com",
      submitButton: "Reserve your access",
      successTitle: "You're in.",
      successMessage: "We'll let you know as soon as we open access.",
      errorMessage: "Something went wrong. Please try again in a moment.",
    },
    footer: {
      copyright: "© 2026 paradaise.id",
      contact: "hello@paradaise.id",
      privacy: "Privacy",
      manifesto: "Manifesto",
    },
  },
} as const;

export const PUBLIC_CONTACT_EMAIL = "hello@paradaise.id";

export type Lang = keyof typeof copy;
export type CopyShape = typeof copy.es;
