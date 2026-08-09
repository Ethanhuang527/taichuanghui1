import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { PLANS } from "@/lib/site";
import { db } from "@/lib/db";

// 示範：直接標記為會員。正式版導向綠界定期定額，Webhook 回報成功才寫入。
export async function POST(req) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { plan } = await req.json();
  const key = PLANS[plan] ? plan : "standard";

  const d = new Date();
  d.setMonth(d.getMonth() + 1); // 月訂閱，下次扣款為一個月後
  const end = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;

  const record = { userId: user.id, plan: key, status: "active", currentPeriodEnd: end, ecpayNo: null };
  const existing = db.subscriptions.find((s) => s.userId === user.id);
  if (existing) Object.assign(existing, record);
  else db.subscriptions.push(record);

  return NextResponse.json({ ok: true, subscription: record });
}
