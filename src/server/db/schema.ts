// src/server/db/schema.ts
// Schema Drizzle para paradaise.id MVP v0
// Tablas: waitlist_signups, invitations

import { pgTable, serial, text, timestamp, boolean, uniqueIndex } from "drizzle-orm/pg-core";

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

// =====================================================================
// invitations
// Un row por cada invitación enviada de inviter → invitee.
// status: 'sent' (enviada, esperando) | 'registered' (invitee se unió a waitlist)
//         | 'expired' (placeholder para política futura)
// =====================================================================

export const invitations = pgTable(
  "invitations",
  {
    id: serial("id").primaryKey(),
    inviterEmail: text("inviter_email").notNull(),
    inviteeEmail: text("invitee_email").notNull(),
    status: text("status").notNull().default("sent"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    usedAt: timestamp("used_at", { withTimezone: true }),
  },
  (table) => ({
    inviterInviteeUnique: uniqueIndex("invitations_inviter_invitee_unique").on(
      table.inviterEmail,
      table.inviteeEmail
    ),
  })
);

export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
