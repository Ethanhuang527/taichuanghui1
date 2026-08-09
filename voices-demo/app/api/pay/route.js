import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signValue } from "@/lib/session";
import { PLANS } from "@/lib/site";

const fmt = (d) => `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;

// 支付完成 → 訂閱寫進簽章 cookie（含起始日與續訂日）→ 訂閱成功頁。
export async function POST(req) {
  const form = await req.formData();
  const key = PLANS[(form.get("plan") || "").toString()] ? form.get("plan").toString() : "standard";

  const start = new Date();
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1); // 月訂閱：續訂日為一個月後

  // cookie 格式：`<plan>|<起始日>|<續訂日>`
  cookies().set("sub", signValue(`${key}|${fmt(start)}|${fmt(end)}`), {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.redirect(new URL("/subscribe/success", req.url), { status: 303 });
}
