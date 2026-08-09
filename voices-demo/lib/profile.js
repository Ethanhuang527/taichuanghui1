// 個人／公司資料：存在簽章 cookie（可在無伺服器環境保存、跨頁顯示）。
import { cookies } from "next/headers";
import { signValue, verifyValue } from "./session";
import { db } from "./db";

const KEY = "profile";
const enc = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
const dec = (s) => { try { return JSON.parse(Buffer.from(s, "base64url").toString()); } catch { return null; } };

// 預設值（示範用戶沈方磊）＋ 使用者儲存過的覆蓋
export function getProfile() {
  const base = {
    name: db.users[0]?.name || "會員",
    email: db.users[0]?.email || "",
    birthdate: "", gender: "", phone: "",
    isCompanyPerson: true,
    company: "", title: "", field: "", taxId: "", address: "",
    education: "", school: "", major: "", bio: "",
  };
  const val = verifyValue(cookies().get(KEY)?.value);
  const saved = val ? dec(val) : null;
  return { ...base, ...(saved || {}) };
}

export function profileCookieValue(obj) {
  return signValue(enc(obj));
}
export const PROFILE_COOKIE = KEY;
