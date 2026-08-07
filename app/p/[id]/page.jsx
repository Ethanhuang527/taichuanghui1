import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/site";
import { getPerson } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { isMember } from "@/lib/access";
import SiteHeader from "@/components/SiteHeader";
import Avatar from "@/components/Avatar";
import ArticleVideo from "@/components/ArticleVideo";

export default function PersonArticle({ params }) {
  const person = getPerson(params.id);
  if (!person) return notFound();
  const user = getCurrentUser();
  const member = isMember();

  return (
    <>
      <SiteHeader />
      <article className="article">
        <div className="cat">{person.category} · {person.company}</div>
        <h1>{person.name}：{person.tagline}</h1>
        <div className="byline">
          <Avatar size={34} />
          <span>{person.name} · {person.role}</span>
          <span>·</span>
          <span>{person.readMinutes} 分鐘閱讀</span>
          <span>·</span>
          <span>{person.publishedAt}</span>
        </div>

        {/* 前段預覽：永遠免費 */}
        <p className="lead">{person.excerpt}</p>

        {member ? (
          <>
            {person.hasVideo && <ArticleVideo personId={person.id} />}
            {person.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {person.quotes?.map((q, i) => (
              <div className="pquote" key={i}>「{q}」</div>
            ))}
            <p className="muted" style={{ marginTop: 30 }}>— 完整專訪 · {SITE.brand}</p>
          </>
        ) : (
          <>
            {/* 鎖住的後段：只露出一小段做 fade */}
            <div className="fade-lock">
              <p>{person.body[0]}</p>
            </div>
            <div className="paywall">
              <h3>{person.hasVideo ? "訂閱看完整專訪與影片" : "訂閱閱讀完整專訪"}</h3>
              <p>成為 {SITE.brand} 會員，解鎖所有人物的完整故事、語錄{person.hasVideo ? "與專訪影片" : ""}，每週人物來信直送信箱。</p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/pricing" className="btn primary">查看訂閱方案</Link>
                {!user && <Link href={`/login?next=/p/${person.id}`} className="btn ghost">已有帳號，登入</Link>}
              </div>
            </div>
          </>
        )}
      </article>

      <footer className="footer">
        <div className="container in">
          <div className="brand"><span className="dot" />{SITE.brand}</div>
          <div>© 2026 {SITE.brand}</div>
        </div>
      </footer>
    </>
  );
}
