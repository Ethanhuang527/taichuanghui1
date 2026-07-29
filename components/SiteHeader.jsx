import Link from "next/link";
import { SITE } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";
import Avatar from "./Avatar";

export default function SiteHeader() {
  const user = getCurrentUser();
  return (
    <div className="hd">
      <div className="in">
        <Link href="/" className="brand"><span className="dot" />{SITE.brand}</Link>
        <Link href="/" className="nav">精選人物</Link>
        <Link href="/people" className="nav">人物列表</Link>
        <Link href="/pricing" className="nav">方案</Link>
        <div className="sp" />
        {user ? (
          <Link href="/account" className="avatar-chip"><Avatar size={30} ring />{user.name}</Link>
        ) : (
          <Link href="/pricing" className="btn primary" style={{ padding: "10px 18px" }}>開始探索</Link>
        )}
      </div>
    </div>
  );
}
