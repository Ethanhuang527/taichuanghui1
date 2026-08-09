import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getFollowing, followsCookieValue, FOLLOW_COOKIE } from "@/lib/follow";

// 切換追蹤／取消追蹤
export async function POST(req) {
  const form = await req.formData();
  const id = (form.get("id") || "").toString();
  const back = (form.get("back") || "/account/following").toString();

  let list = getFollowing();
  list = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  cookies().set(FOLLOW_COOKIE, followsCookieValue(list), {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365,
  });
  return NextResponse.redirect(new URL(back, req.url), { status: 303 });
}
