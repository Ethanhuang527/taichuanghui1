import { NextResponse } from "next/server";
import { getPerson } from "@/lib/db";
import { canWatch } from "@/lib/access";

// 影片鑑權：只有會員才拿得到 YouTube 影片 ID（非會員連 ID 都拿不到）。
// 影片在 YouTube 設「不公開(unlisted)」，靠這裡的頁面層級把關只給會員看。
export async function POST(req) {
  const { personId } = await req.json();
  const person = getPerson(personId);
  if (!person || !person.hasVideo)
    return NextResponse.json({ reason: "not_found" }, { status: 404 });

  if (!canWatch()) return NextResponse.json({ reason: "paywall" }, { status: 403 });

  return NextResponse.json({ provider: "youtube", youtubeId: person.youtubeId });
}
