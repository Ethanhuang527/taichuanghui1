import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { PLANS } from "@/lib/site";
import { db } from "@/lib/db";

// 支付完成 → 啟用訂閱 → 訂閱成功頁。正式版：綠界/信用卡授權成功的回呼才寫入。
export async function POST(req) {
  const user = getCurrentUser() || db.users[0];
  const form = await req.formData();
  const key = PLANS[(form.get("plan") || "").toString()] ? form.get("plan").toString() : "standard";

  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  const end = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
  const record = { userId: user.id, plan: key, status: "active", currentPeriodEnd: end, ecpayNo: null };
  const existing = db.subscriptions.find((s) => s.userId === user.id);
  if (existing) Object.assign(existing, record);
  else db.subscriptions.push(record);

  return NextResponse.redirect(new URL("/subscribe/success", req.url), { status: 303 });
}
