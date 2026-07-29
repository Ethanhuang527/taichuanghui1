import crypto from "crypto";
const SECRET = process.env.SESSION_SECRET || "dev-secret-change-me";

export function signSession(userId) {
  const p = String(userId);
  const sig = crypto.createHmac("sha256", SECRET).update(p).digest("hex");
  return `${p}.${sig}`;
}
export function verifySession(token) {
  if (!token || typeof token !== "string") return null;
  const i = token.lastIndexOf(".");
  if (i < 0) return null;
  const p = token.slice(0, i), sig = token.slice(i + 1);
  const expect = crypto.createHmac("sha256", SECRET).update(p).digest("hex");
  try {
    const a = Buffer.from(sig, "hex"), b = Buffer.from(expect, "hex");
    if (a.length === b.length && crypto.timingSafeEqual(a, b)) return p;
  } catch { return null; }
  return null;
}
