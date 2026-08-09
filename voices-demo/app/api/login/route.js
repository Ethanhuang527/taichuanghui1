import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signSession } from "@/lib/session";
import { db } from "@/lib/db";

// 示範：任何帳密一律以示範用戶（沈方磊）登入。
export async function POST(req) {
  const form = await req.formData();
  const next = (form.get("next") || "/browse").toString();
  const user = db.users[0]; // 沈方磊
  cookies().set("session", signSession(user.id), {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30,
  });
  return NextResponse.redirect(new URL(next, req.url), { status: 303 });
}
