// ★ 會員判別：訂閱制。全文與專訪影片需有效訂閱；預覽前段永遠免費。
import { getSubscription } from "./db";

export function isMember(user) {
  if (!user) return false;
  const sub = getSubscription(user.id);
  return !!sub && sub.status === "active" && new Date(sub.currentPeriodEnd) > new Date();
}

// 影片鑑權（同一套規則）
export function canWatch(user /*, person */) {
  return isMember(user);
}
