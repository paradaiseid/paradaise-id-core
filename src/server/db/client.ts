// src/server/db/client.ts
// Cliente Drizzle conectado a Neon Postgres serverless.
// La inicialización es lazy: solo valida DATABASE_URL la primera vez que se
// usa `db`, no al importar el módulo. Esto permite que el build pase en
// entornos Preview de Vercel que no tienen DATABASE_URL (no se ejecutan
// queries en build, solo al servir requests).

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

type DrizzleClient = ReturnType<typeof drizzle<typeof schema>>;

let _db: DrizzleClient | null = null;

function getDb(): DrizzleClient {
  if (_db) return _db;
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no está definida en las variables de entorno");
  }
  const sql = neon(process.env.DATABASE_URL);
  _db = drizzle(sql, { schema });
  return _db;
}

// Proxy que delega al cliente real, inicializándolo perezosamente.
// Permite seguir usando `db.select(...)` sin tocar los callers.
export const db = new Proxy({} as DrizzleClient, {
  get(_target, prop) {
    const client = getDb();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
