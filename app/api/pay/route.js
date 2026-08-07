import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signValue } from "@/lib/session";
import { PLANS } from "@/lib/site";

// 支付完成 → 把訂閱狀態寫進「簽章 cookie」→ 訂閱成功頁。
// 用 cookie 而非伺服器記憶體，才能在 Vercel 等無伺服器環境穩定存活。
export async function POST(req) {
  const form = await req.formData();
  const key = PLANS[(form.get("plan") || "").toString()] ? form.get("plan").toString() : "standard";

  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  const end = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;

  cookies().set("sub", signValue(`${key}|${end}`), {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.redirect(new URL("/subscribe/success", req.url), { status: 303 });
}
