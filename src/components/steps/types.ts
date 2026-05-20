export type Contexto = "estudio" | "empresa" | "freelance" | "founder" | "otro" | null;
export type Edad = "14-17" | "18-24" | "25-34" | "35-44" | "45-54" | "55+" | null;

export interface Consents {
  ia: boolean;
  notas: boolean;
  busquedas: boolean;
  browser: boolean;
}

export function labelContexto(v: Contexto): string {
  if (!v) return "";
  const map: Record<Exclude<Contexto, null>, string> = {
    estudio: "Estudiante",
    empresa: "Trabajo en empresa",
    freelance: "Freelance / independiente",
    founder: "Fundador / emprendedor",
    otro: "Otro",
  };
  return map[v];
}

export function truncar(s: string, n: number): string {
  return s.length > n ? s.substring(0, n - 1) + "…" : s;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function isValidEmail(s: string): boolean {
  return EMAIL_RE.test(s);
}
