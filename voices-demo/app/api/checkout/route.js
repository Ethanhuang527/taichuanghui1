import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signSession } from "@/lib/session";
import { PLANS } from "@/lib/site";
import { db } from "@/lib/db";

// 選方案後填完個人資料 → 儲存資料、以示範用戶登入 → 前往「支付頁面」。
// 訂閱在支付完成後才啟用（見 /api/pay）。
export async function POST(req) {
  const form = await req.formData();
  const get = (k) => (form.get(k) || "").toString().trim();

  // 示範：一律綁到原示範用戶（沈方磊），只補充其他會員資料，不改名字/信箱
  const user = db.users[0];
  Object.assign(user, {
    phone: get("phone"),
    birthdate: get("birthdate"),
    gender: get("gender"),
    company: get("company"),
    title: get("title"),
    taxId: get("taxId"),
    industry: get("industry"),
    address: get("address"),
  });

  cookies().set("session", signSession(user.id), {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30,
  });

  const key = PLANS[get("plan")] ? get("plan") : "standard";
  return NextResponse.redirect(new URL(`/payment?plan=${key}`, req.url), { status: 303 });
}
