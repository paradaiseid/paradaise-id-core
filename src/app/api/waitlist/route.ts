// src/app/api/waitlist/route.ts
// POST handler que recibe email del waitlist, lo guarda en Neon y manda email de confirmación vía Resend

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db/client";
import { waitlistSignups } from "@/server/db/schema";
import { resend, RESEND_FROM, isResendEnabled } from "@/lib/resend";
import { waitlistConfirmEmail } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, lang } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "email_required" }, { status: 400 });
    }
    if (!email.includes("@") || email.length > 254) {
      return NextResponse.json({ error: "email_invalid" }, { status: 400 });
    }

    const validLang: "es" | "en" = lang === "en" ? "en" : "es";
    const cleanEmail = email.toLowerCase().trim();

    let duplicate = false;

    try {
      await db.insert(waitlistSignups).values({
        email: cleanEmail,
        lang: validLang,
        source: "landing_v0",
      });
    } catch (err: any) {
      if (err?.code === "23505" || err?.message?.includes("duplicate")) {
        duplicate = true;
      } else {
        throw err;
      }
    }

    // Mandar email de confirmación SOLO si es signup nuevo (no duplicado).
    // Email failure NUNCA debe romper el signup — atrapamos y logueamos.
    if (!duplicate && isResendEnabled() && resend) {
      try {
        const template = waitlistConfirmEmail({ lang: validLang });
        await resend.emails.send({
          from: RESEND_FROM,
          to: cleanEmail,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });
      } catch (emailErr) {
        console.error("[waitlist] resend email failed (signup OK):", emailErr);
        // intencional: no throw — el signup ya está en DB
      }
    }

    return NextResponse.json({ ok: true, duplicate });
  } catch (err) {
    console.error("[waitlist] error:", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
