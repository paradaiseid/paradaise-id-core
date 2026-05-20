// drizzle.config.ts
// Config para drizzle-kit (CLI) — usado para migrations
// Va en la RAÍZ del proyecto, no en src/

import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

// Cargar variables de .env.local (Next.js lo carga automático en runtime,
// pero drizzle-kit CLI no, por eso lo importamos explícito)
config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
