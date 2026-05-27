// src/app/api/invite/route.ts
// POST handler para invitaciones: un usuario en waitlist invita a un tercero.
// Valida que el inviter esté en waitlist_signups, que el invitee no lo esté,
// y que la pareja (inviter, invitee) no haya sido usada antes.
// Inserta row en invitations y manda correo al invitee vía Resend (best-effort).

import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/server/db/client";
import { waitlistSignups, invitations } from "@/server/db/schema";
import { resend, RESEND_FROM, isResendEnabled } from "@/lib/resend";
import { invitationEmail } from "@/lib/email-templates";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(v: unknown): v is string {
  return typeof v === "string" && v.length <= 254 && EMAIL_RE.test(v.trim());
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    const { inviterEmail, inviteeEmail } = body as {
      inviterEmail?: unknown;
      inviteeEmail?: unknown;
    };

    if (!isValidEmail(inviterEmail) || !isValidEmail(inviteeEmail)) {
      return NextResponse.json({ error: "email_invalid" }, { status: 400 });
    }

    const inviter = inviterEmail.toLowerCase().trim();
    const invitee = inviteeEmail.toLowerCase().trim();

    if (inviter === invitee) {
      return NextResponse.json({ error: "self_invite" }, { status: 400 });
    }

    // 1) inviter debe existir en waitlist_signups
    const inviterRows = await db
      .select({ id: waitlistSignups.id, lang: waitlistSignups.lang })
      .from(waitlistSignups)
      .where(eq(waitlistSignups.email, inviter))
      .limit(1);

    if (inviterRows.length === 0) {
      return NextResponse.json(
        { error: "inviter_not_in_waitlist", message: "Solo personas en la lista pueden invitar" },
        { status: 403 }
      );
    }

    const inviterLang: "es" | "en" = inviterRows[0].lang === "en" ? "en" : "es";

    // 2) invitee no debe estar ya en waitlist_signups
    const inviteeAlreadyRegistered = await db
      .select({ id: waitlistSignups.id })
      .from(waitlistSignups)
      .where(eq(waitlistSignups.email, invitee))
      .limit(1);

    if (inviteeAlreadyRegistered.length > 0) {
      return NextResponse.json({ ok: true, alreadyRegistered: true });
    }

    // 3) (inviter, invitee) no debe existir ya en invitations
    const existingInvite = await db
      .select({ id: invitations.id })
      .from(invitations)
      .where(
        and(
          eq(invitations.inviterEmail, inviter),
          eq(invitations.inviteeEmail, invitee)
        )
      )
      .limit(1);

    if (existingInvite.length > 0) {
      return NextResponse.json({ ok: true, alreadyInvited: true });
    }

    // 4) Insert. Si por race condition explota el unique, lo tratamos como alreadyInvited.
    try {
      await db.insert(invitations).values({
        inviterEmail: inviter,
        inviteeEmail: invitee,
        status: "sent",
      });
    } catch (err: any) {
      if (err?.code === "23505" || err?.message?.includes("duplicate")) {
        return NextResponse.json({ ok: true, alreadyInvited: true });
      }
      throw err;
    }

    // 5) Mandar correo al invitee — best-effort, no rompe el insert.
    if (isResendEnabled() && resend) {
      try {
        const template = invitationEmail({ inviterEmail: inviter, lang: inviterLang });
        await resend.emails.send({
          from: RESEND_FROM,
          to: invitee,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });
      } catch (emailErr) {
        console.error("[invite] resend email failed (insert OK):", emailErr);
        // intencional: no throw — la invitación quedó registrada
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[invite] error:", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
