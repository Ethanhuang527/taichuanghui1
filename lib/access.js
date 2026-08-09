// ★ 會員判別：訂閱狀態存在簽章 cookie（無狀態，可在 Vercel 等無伺服器環境穩定運作）。
import { cookies } from "next/headers";
import { verifyValue } from "./session";

// cookie 格式：`<plan>|<起始日>|<續訂日>`（舊格式 `<plan>|<續訂日>` 亦相容）
export function currentSubscription() {
  const raw = cookies().get("sub")?.value;
  const val = verifyValue(raw);
  if (!val) return null;
  const parts = val.split("|");
  let plan, start, end;
  if (parts.length >= 3) { [plan, start, end] = parts; }
  else { [plan, end] = parts; start = null; }
  if (!plan || !end) return null;
  if (new Date(end.replace(/\//g, "-")) <= new Date()) return null; // 過期
  return { plan, start, currentPeriodEnd: end, status: "active" };
}

// 自動計算：距離續訂日還有幾天、以及本期進度（用「續訂日 − 今天」即時算出）
export function subscriptionTiming(sub) {
  if (!sub) return null;
  const now = new Date();
  const end = new Date(sub.currentPeriodEnd.replace(/\//g, "-"));
  const start = sub.start ? new Date(sub.start.replace(/\//g, "-")) : new Date(end.getTime() - 30 * 86400000);
  const daysLeft = Math.max(0, Math.ceil((end - now) / 86400000));
  const total = Math.max(1, end - start);
  const elapsed = Math.min(total, Math.max(0, now - start));
  const percent = Math.round((elapsed / total) * 100);
  return { daysLeft, percent, start, end };
}

export function isMember() {
  return !!currentSubscription();
}

// 影片鑑權（同一套規則）
export function canWatch() {
  return isMember();
}
