// 追蹤名單：存在簽章 cookie（跨頁/無伺服器環境保存）。預設追蹤全部人物。
import { cookies } from "next/headers";
import { signValue, verifyValue } from "./session";
import { db } from "./db";

const KEY = "follows";
const enc = (a) => Buffer.from(JSON.stringify(a)).toString("base64url");
const dec = (s) => { try { return JSON.parse(Buffer.from(s, "base64url").toString()); } catch { return null; } };

export function getFollowing() {
  const val = verifyValue(cookies().get(KEY)?.value);
  if (val) { const a = dec(val); if (Array.isArray(a)) return a; }
  return db.people.map((p) => p.id); // 尚未設定 → 預設全部追蹤
}
export function isFollowing(id) {
  return getFollowing().includes(id);
}
export function followsCookieValue(arr) {
  return signValue(enc(arr));
}
export const FOLLOW_COOKIE = KEY;
