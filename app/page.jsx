import Link from "next/link";
import { SITE } from "@/lib/site";
import { db, featured } from "@/lib/db";
import SiteHeader from "@/components/SiteHeader";
import PersonCard from "@/components/PersonCard";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  const hero = featured();
  const others = db.people.filter((p) => !p.featured).slice(0, 4);

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">企業人物 · 故事與決策</div>
            <h1>聽見那些改變產業的人，怎麼想。</h1>
            <p className="desc">
              每週一位頂尖創辦人與經營者，親述關鍵決策、失敗與信念。深度專訪、語錄選集，一個地方全部看完。
            </p>
            <div className="cta">
              <Link href="/p/shen" className="btn primary">免費開始閱讀</Link>
              <Link href="/pricing" className="link-green">查看訂閱方案 →</Link>
            </div>
            <div className="social">{SITE.social}</div>
          </div>
          <div><PersonCard person={hero} big /></div>
        </div>
      </section>

      {/* 精選人物 */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <h2>精選人物</h2>
            <Link href="/people" className="link-green">查看全部 →</Link>
          </div>
          <div className="grid4">
            {others.map((p) => <PersonCard key={p.id} person={p} />)}
          </div>
        </div>
      </section>

      {/* 語錄帶 */}
      <section className="qband">
        <div className="container">
          <div className="mark">“</div>
          <div className="q">{hero.tagline}</div>
          <div className="by">{hero.name} · {hero.company}{hero.role}</div>
        </div>
      </section>

      {/* 電子報 */}
      <section className="news">
        <div className="container">
          <h2>{SITE.tagline}</h2>
          <p>深度人物專訪與語錄，直接寄到你的信箱。免費閱讀，隨時取消。</p>
          <NewsletterForm />
          <div className="muted" style={{ marginTop: 12 }}>免費 · {SITE.social}</div>
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
