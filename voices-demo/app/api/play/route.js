import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getPerson } from "@/lib/db";
import { canWatch } from "@/lib/access";
import { signedPlaybackUrl } from "@/lib/bunny";

// 影片鑑權：僅會員可取得簽章播放網址。
export async function POST(req) {
  const { personId } = await req.json();
  const person = getPerson(personId);
  if (!person || !person.hasVideo)
    return NextResponse.json({ reason: "not_found" }, { status: 404 });

  if (!canWatch()) return NextResponse.json({ reason: "paywall" }, { status: 403 });

  const { url, expires } = signedPlaybackUrl(person);
  return NextResponse.json({ url, expires });
}
