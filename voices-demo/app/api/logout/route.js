import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  cookies().delete("session");
  cookies().delete("sub");
  return NextResponse.redirect(new URL("/", req.url), { status: 303 });
}
