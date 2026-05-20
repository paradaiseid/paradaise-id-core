// src/server/db/schema.ts
// Schema Drizzle para paradaise.id MVP v0
// Tabla principal: waitlist_signups

import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const waitlistSignups = pgTable("waitlist_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  lang: text("lang").notNull().default("es"),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  ip_hash: text("ip_hash"),
  user_agent_hash: text("user_agent_hash"),
  source: text("source").default("landing_v0"),
  confirmed: boolean("confirmed").notNull().default(false),
});

export type WaitlistSignup = typeof waitlistSignups.$inferSelect;
export type NewWaitlistSignup = typeof waitlistSignups.$inferInsert;
