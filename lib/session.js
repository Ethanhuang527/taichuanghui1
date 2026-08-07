import crypto from "crypto";
const SECRET = process.env.SESSION_SECRET || "dev-secret-change-me";

export function signSession(userId) {
  const p = String(userId);
  const sig = crypto.createHmac("sha256", SECRET).update(p).digest("hex");
  return `${p}.${sig}`;
}
export function verifySession(token) {
  return verifyValue(token);
}

// 通用簽章：把任意字串值簽章／驗證（用於訂閱狀態 cookie，無狀態、可在無伺服器環境存活）
export function signValue(value) {
  const v = String(value);
  const sig = crypto.createHmac("sha256", SECRET).update(v).digest("hex");
  return `${v}.${sig}`;
}
export function verifyValue(token) {
  if (!token || typeof token !== "string") return null;
  const i = token.lastIndexOf(".");
  if (i < 0) return null;
  const v = token.slice(0, i), sig = token.slice(i + 1);
  const expect = crypto.createHmac("sha256", SECRET).update(v).digest("hex");
  try {
    const a = Buffer.from(sig, "hex"), b = Buffer.from(expect, "hex");
    if (a.length === b.length && crypto.timingSafeEqual(a, b)) return v;
  } catch { return null; }
  return null;
}
