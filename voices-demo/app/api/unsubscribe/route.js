import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// 取消訂閱（示範）：清除訂閱 cookie。
export async function POST(req) {
  cookies().delete("sub");
  return NextResponse.redirect(new URL("/account/subscription", req.url), { status: 303 });
}
