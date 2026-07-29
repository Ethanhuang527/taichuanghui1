import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// 示範：收集電子報 email。正式版接電子報服務（如 MailerLite / Beehiiv）。
export async function POST(req) {
  const { email } = await req.json();
  if (email && !db.newsletter.includes(email)) db.newsletter.push(email);
  return NextResponse.json({ ok: true });
}
