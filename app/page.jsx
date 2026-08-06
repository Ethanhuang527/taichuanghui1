import Link from "next/link";
import { SITE } from "@/lib/site";
import PeopleCluster from "@/components/PeopleCluster";

// 入口首頁（網站門面：歡迎＋登入＋快速搜尋＋人物群像）
function SearchIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* 頂部導覽＋快速搜尋 */}
      <div className="land-hd">
        <div className="in">
          <Link href="/" className="brand"><span className="dot" />{SITE.brand}</Link>
          <div className="lnav">
            <Link href="/browse">人物</Link>
            <Link href="/browse">專訪</Link>
            <Link href="/browse#quotes">語錄</Link>
            <Link href="/pricing">會員方案</Link>
          </div>
          <div className="sp" style={{ flex: 1 }} />
          <div className="searchbox">
            <SearchIcon />
            <input placeholder="快速搜尋人物、產業、關鍵字…" />
          </div>
          <div className="login-mini">
            <span className="hint">還不是會員？</span>
            <Link href="/pricing">免費註冊</Link>
          </div>
          <Link href="/login" className="btn primary" style={{ padding: "10px 20px" }}>登入</Link>
        </div>
      </div>

      {/* Hero */}
      <section className="land-hero">
        <div className="in">
          <div>
            <div className="land-eyebrow">WELCOME TO {SITE.brand}</div>
            <h1 className="land-title"><span className="dot" />{SITE.brand}</h1>
            <p className="land-slogan serif">
              遇見那些，<span className="hl">正在改變產業的人。</span>
            </p>
            <p className="land-sub">
              每週一位頂尖創辦人與經營者，親述關鍵決策、失敗與信念。深度專訪、語錄選集，一個地方全部看完。
            </p>

            {/* 快速搜尋 */}
            <div className="land-search">
              <div className="box">
                <SearchIcon size={18} />
                <input placeholder="搜尋人物、產業、關鍵字…" />
              </div>
              <Link href="/browse" className="btn primary">搜尋</Link>
            </div>

            {/* 登入 + 提示 */}
            <div className="land-cta">
              <Link href="/login" className="btn primary">▶ 登入，開始探索</Link>
              <span className="hint">還不是會員？<Link href="/pricing">免費註冊 →</Link></span>
            </div>
          </div>

          <PeopleCluster />
        </div>
      </section>

      <footer className="footer">
        <div className="container in">
          <div className="brand"><span className="dot" />{SITE.brand}</div>
          <div>關於 · 聯絡 · 隱私權 · © 2026 {SITE.brand}</div>
        </div>
      </footer>
    </>
  );
}
