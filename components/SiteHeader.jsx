import Link from "next/link";
import { SITE } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";
import { getProfile } from "@/lib/profile";

// 內容區頁首（首頁＝/browse 內容首頁；品牌回入口頁 /）
export default function SiteHeader({ active }) {
  const user = getCurrentUser();
  const p = user ? getProfile() : null;
  const nav = [
    ["首頁", "/browse"],
    ["人物", "/people"],
    ["專訪", "/people"],
    ["語錄", "/browse#quotes"],
    ["訂閱方案", "/pricing"],
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
        {user ? (
          <Link href="/account" className="user-chip" title="會員中心">
            <span className="ava">{p.name?.[0] || "會"}</span>
            <span className="unm">{p.name}</span>
            <span className="caret">▾</span>
          </Link>
        ) : (
          <Link href="/login" className="btn primary" style={{ padding: "9px 18px" }}>登入</Link>
        )}

        {/* 手機版漢堡選單 */}
        <details className="mobile-menu">
          <summary aria-label="選單">☰</summary>
          <div className="menu-panel">
            {nav.map(([label, href], i) => (
              <Link key={i} href={href}>{label}</Link>
            ))}
            <div className="divider-m" />
            {user
              ? <Link href="/account">會員中心（{p.name}）</Link>
              : <Link href="/login">登入</Link>}
          </div>
        </details>
      </div>
    </div>
  );
}
