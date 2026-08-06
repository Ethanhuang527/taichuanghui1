import Link from "next/link";
import { SITE } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";

// 內容區頁首（首頁＝/browse 內容首頁；品牌回入口頁 /）
export default function SiteHeader({ active }) {
  const user = getCurrentUser();
  const nav = [
    ["首頁", "/browse"],
    ["人物", "/people"],
    ["專訪", "/people"],
    ["語錄", "/browse#quotes"],
    ["我的清單", "/account"],
  ];
  return (
    <div className="hd">
      <div className="in">
        <Link href="/browse" className="brand"><span className="dot" />{SITE.brand}</Link>
        {nav.map(([label, href], i) => (
          <Link key={i} href={href} className={`nav${active === label ? " active" : ""}`}>{label}</Link>
        ))}
        <div className="sp" />
        <div className="iconbtn" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" strokeLinecap="round" />
          </svg>
        </div>
        {user ? (
          <Link href="/account" className="avatar-sq">沈</Link>
        ) : (
          <Link href="/login" className="btn primary" style={{ padding: "9px 18px" }}>登入</Link>
        )}
      </div>
    </div>
  );
}
