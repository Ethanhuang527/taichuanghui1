import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signSession } from "@/lib/session";
import { db } from "@/lib/db";

// 建立帳號並自動登入。正式版換成 Supabase Auth（密碼雜湊、Email 驗證）。
export async function POST(req) {
  const form = await req.formData();
  const name = (form.get("name") || "").toString().trim() || "新會員";
  const email = (form.get("email") || "").toString().trim().toLowerCase();

  let user = db.users.find((u) => u.email === email);
  if (!user) {
    user = { id: "u_" + Date.now().toString(36), email, name };
    db.users.push(user);
  } else {
    user.name = name; // 已存在則更新名稱（示範）
  }

  cookies().set("session", signSession(user.id), {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30,
  });
  // 註冊完成 → 進內容首頁（免費帳號，之後可在方案頁升級訂閱）
  return NextResponse.redirect(new URL("/browse", req.url), { status: 303 });
}
