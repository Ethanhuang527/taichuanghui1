import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getHistory, historyCookieValue, HISTORY_COOKIE } from "@/lib/history";

// 記錄一次閱讀：把該人物移到最前、更新時間。
export async function POST(req) {
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  let h = getHistory().filter((e) => e.id !== id);
  h.unshift({ id, at: Date.now() });
  h = h.slice(0, 50);

  cookies().set(HISTORY_COOKIE, historyCookieValue(h), {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365,
  });
  return NextResponse.json({ ok: true });
}
