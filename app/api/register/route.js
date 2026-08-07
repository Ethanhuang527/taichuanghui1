import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signSession } from "@/lib/session";
import { db } from "@/lib/db";

// 示範：不論填寫的名字/郵件為何，一律以原示範用戶（沈方磊）登入，
// 並導向「用戶主頁」（帳號總覽）。正式版才會真正建立獨立帳號。
export async function POST(req) {
  const user = db.users[0]; // 沈方磊
  cookies().set("session", signSession(user.id), {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30,
  });
  return NextResponse.redirect(new URL("/browse", req.url), { status: 303 });
}
