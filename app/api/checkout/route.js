import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signSession } from "@/lib/session";
import { PLANS } from "@/lib/site";
import { db } from "@/lib/db";

// 選方案後建立帳號 + 儲存會員資料 + 啟用訂閱。正式版：Supabase 建帳號 + 綠界定期定額。
export async function POST(req) {
  const form = await req.formData();
  const get = (k) => (form.get(k) || "").toString().trim();

  const email = get("email").toLowerCase();
  const profile = {
    name: get("name") || "新會員",
    email,
    phone: get("phone"),
    birthdate: get("birthdate"),
    gender: get("gender"),
    company: get("company"),
    title: get("title"),
    taxId: get("taxId"),
    industry: get("industry"),
    address: get("address"),
  };

  // 建立或更新使用者
  let user = db.users.find((u) => u.email === email);
  if (!user) {
    user = { id: "u_" + Date.now().toString(36), ...profile };
    db.users.push(user);
  } else {
    Object.assign(user, profile);
  }

  // 啟用訂閱
  const key = PLANS[get("plan")] ? get("plan") : "standard";
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  const end = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
  const record = { userId: user.id, plan: key, status: "active", currentPeriodEnd: end, ecpayNo: null };
  const existing = db.subscriptions.find((s) => s.userId === user.id);
  if (existing) Object.assign(existing, record);
  else db.subscriptions.push(record);

  // 自動登入
  cookies().set("session", signSession(user.id), {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.redirect(new URL("/subscribe/success", req.url), { status: 303 });
}
