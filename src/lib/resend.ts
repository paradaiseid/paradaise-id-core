// src/lib/resend.ts
// Cliente Resend inicializado una sola vez

import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  // No lanzamos error en build time, solo warn — la app sigue corriendo aunque Resend no esté configurado
  console.warn("[resend] RESEND_API_KEY no definida — emails no se enviarán");
}

export const resend = apiKey ? new Resend(apiKey) : null;

export const RESEND_FROM = process.env.RESEND_FROM_EMAIL || "paradaise.id <onboarding@resend.dev>";

export function isResendEnabled(): boolean {
  return !!resend;
}
