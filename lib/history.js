// 閱讀紀錄：存簽章 cookie（跨頁/無伺服器環境保存）。項目為 { id, at(epoch ms) }。
import { cookies } from "next/headers";
import { signValue, verifyValue } from "./session";

const KEY = "history";
const DAY = 86400000;
const enc = (a) => Buffer.from(JSON.stringify(a)).toString("base64url");
const dec = (s) => { try { return JSON.parse(Buffer.from(s, "base64url").toString()); } catch { return null; } };

export function getHistory() {
  const val = verifyValue(cookies().get(KEY)?.value);
  if (val) { const a = dec(val); if (Array.isArray(a)) return a; }
  // 尚未有紀錄 → 預設一份示範閱讀紀錄
  const now = Date.now();
  return [
    { id: "ho", at: now - 3 * 3600e3 },
    { id: "chen", at: now - 2 * DAY },
    { id: "lin", at: now - 5 * DAY },
    { id: "kao", at: now - 9 * DAY },
    { id: "wu", at: now - 16 * DAY },
  ];
}
export function historyCookieValue(arr) { return signValue(enc(arr)); }
export const HISTORY_COOKIE = KEY;

export function relTime(at) {
  const diff = Date.now() - at;
  const m = Math.floor(diff / 60000), h = Math.floor(diff / 3600e3), d = Math.floor(diff / DAY);
  if (m < 1) return "剛剛";
  if (h < 1) return `${m} 分鐘前`;
  if (d < 1) return `${h} 小時前`;
  if (d < 7) return `${d} 天前`;
  if (d < 30) return `${Math.floor(d / 7)} 週前`;
  return `${Math.floor(d / 30)} 個月前`;
}
