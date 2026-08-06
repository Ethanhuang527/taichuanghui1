import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signSession } from "@/lib/session";
import { db } from "@/lib/db";

// 示範：任何 Email 登入為示範帳號。正式版換 Supabase Auth。
export async function POST(req) {
  const form = await req.formData();
  const email = form.get("email") || "demo@voices.tw";
  const next = form.get("next") || "/browse";

  let user = db.users.find((u) => u.email === email);
  if (!user) user = db.users[0];

  cookies().set("session", signSession(user.id), {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30,
  });
  return NextResponse.redirect(new URL(next, req.url), { status: 303 });
}
