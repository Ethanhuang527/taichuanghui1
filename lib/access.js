// ★ 會員判別：訂閱狀態存在簽章 cookie（無狀態，可在 Vercel 等無伺服器環境穩定運作）。
import { cookies } from "next/headers";
import { verifyValue } from "./session";

// cookie 格式：`<plan>|<YYYY/MM/DD>`（經 HMAC 簽章）
export function currentSubscription() {
  const raw = cookies().get("sub")?.value;
  const val = verifyValue(raw);
  if (!val) return null;
  const [plan, end] = val.split("|");
  if (!plan || !end) return null;
  if (new Date(end.replace(/\//g, "-")) <= new Date()) return null; // 過期
  return { plan, currentPeriodEnd: end, status: "active" };
}

export function isMember() {
  return !!currentSubscription();
}

// 影片鑑權（同一套規則）
export function canWatch() {
  return isMember();
}
