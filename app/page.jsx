import Link from "next/link";
import { SITE } from "@/lib/site";
import { db, featured } from "@/lib/db";
import SiteHeader from "@/components/SiteHeader";
import VideoThumb from "@/components/VideoThumb";
import NewsletterForm from "@/components/NewsletterForm";
import { Silhouette } from "@/components/Avatar";

export default function Home() {
  const hero = featured();
  const shortCompany = hero.company.replace("青嶼", "").replace("集團", "");
  const others = db.people.filter((p) => !p.featured).slice(0, 5);
  const quotePerson = db.people.find((p) => p.id === "kao") || others[0];

  return (
    <>
      <SiteHeader active="首頁" />

      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">人物專訪 · 本週上架</div>
            <h1 className="serif">{hero.name}</h1>
            <p className="credit">{shortCompany} · {hero.role.replace("暨執行長", "")} · 專訪 {hero.readMinutes} 分鐘 · 中文字幕</p>
            <p className="hquote serif">「{hero.tagline}」</p>
            <div className="cta">
              <Link href={`/p/${hero.id}`} className="btn primary">▶ 觀看專訪</Link>
              <Link href="/account" className="btn ghost">＋ 加入清單</Link>
            </div>
          </div>
          <div className="portrait">
            <div className="sil"><Silhouette /></div>
            <span className="chip">本週新專訪</span>
          </div>
        </div>
      </section>

      {/* 接著認識這些人物 */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <h2 className="serif">接著認識這些人物</h2>
            <Link href="/people" className="link-teal">查看全部 →</Link>
          </div>
          <div className="vrow">
            {others.map((p) => <VideoThumb key={p.id} person={p} />)}
          </div>
        </div>
      </section>

      {/* 語錄 */}
      <section className="qband" id="quotes">
        <div className="container">
          <div className="mark serif">“</div>
          <div className="q serif">{quotePerson.tagline}</div>
          <div className="by">{quotePerson.name} · {quotePerson.company}{quotePerson.role}</div>
        </div>
      </section>

      {/* 電子報 */}
      <section className="news">
        <div className="container">
          <h2 className="serif">{SITE.tagline}</h2>
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
