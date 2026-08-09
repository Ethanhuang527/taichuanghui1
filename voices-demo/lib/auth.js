import { cookies } from "next/headers";
import { verifySession } from "./session";
import { getUser } from "./db";

export function getCurrentUser() {
  const token = cookies().get("session")?.value;
  const uid = verifySession(token);
  if (!uid) return null;
  return getUser(uid) || null;
}
