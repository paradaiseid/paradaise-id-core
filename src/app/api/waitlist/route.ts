// src/app/api/waitlist/route.ts
// POST handler que recibe email del waitlist y lo guarda en Neon

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db/client";
import { waitlistSignups } from "@/server/db/schema";

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

    const validLang = lang === "en" ? "en" : "es";
    const cleanEmail = email.toLowerCase().trim();

    try {
      await db.insert(waitlistSignups).values({
        email: cleanEmail,
        lang: validLang,
        source: "landing_v0",
      });
      return NextResponse.json({ ok: true });
    } catch (err: any) {
      if (err?.code === "23505" || err?.message?.includes("duplicate")) {
        return NextResponse.json({ ok: true, duplicate: true });
      }
      throw err;
    }
  } catch (err) {
    console.error("[waitlist] error:", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
