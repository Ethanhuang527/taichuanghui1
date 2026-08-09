import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getProfile } from "@/lib/profile";
import { currentSubscription, subscriptionTiming } from "@/lib/access";
import { getFollowing } from "@/lib/follow";
import { PLANS } from "@/lib/site";
import { db } from "@/lib/db";
import DashSidebar from "@/components/DashSidebar";
import Avatar from "@/components/Avatar";

export default function Following({ searchParams }) {
  const user = getCurrentUser();
  if (!user) redirect("/login?next=/account/following");
  const p = getProfile();
  const sub = currentSubscription();
  const planLabel = sub ? `${(PLANS[sub.plan] || PLANS.standard).name}訂閱` : "免費帳號";

  const ids = getFollowing();
  const followed = db.people.filter((x) => ids.includes(x.id));
  const newCount = followed.filter((x) => x.isNew).length;
  const tab = searchParams?.tab === "new" ? "new" : "all";
  const back = `/account/following${tab === "new" ? "?tab=new" : ""}`;
  const list = tab === "new" ? followed.filter((x) => x.isNew) : followed;

  return (
    <div className="dash">
      <DashSidebar active="追蹤的人物" name={p.name} planLabel={planLabel} />

      <main className="main">
        <div className="top">
          <h1>追蹤的人物</h1>
          <div className="search">搜尋…</div>
          <span className="avatar-sq">{p.name?.[0] || "會"}</span>
        </div>

        <div className="follow-bar">
          <span className="cnt">共 {followed.length} 位</span>
          <div className="tabs">
            <Link href="/account/following" className={`tab${tab === "all" ? " active" : ""}`}>全部</Link>
            <Link href="/account/following?tab=new" className={`tab${tab === "new" ? " active" : ""}`}>有新專訪{newCount > 0 ? ` (${newCount})` : ""}</Link>
          </div>
        </div>

        {newCount > 0 && tab === "all" && (
          <div className="new-callout">🔔 你追蹤的人物中，有 {newCount} 位發布了新專訪</div>
        )}

        {list.length === 0 ? (
          <div className="empty-state">
            <h3>{tab === "new" ? "目前沒有新專訪" : "還沒有追蹤任何人物"}</h3>
            <p>{tab === "new" ? "追蹤的人物有新內容時，會出現在這裡。" : "到人物列表探索，追蹤你感興趣的創業者與經營者。"}</p>
            <Link href="/people" className="btn primary">探索人物</Link>
          </div>
        ) : (
          <div className="fgrid">
            {list.map((x) => (
              <div className="fcard" key={x.id}>
                {x.isNew && <span className="newdot">NEW</span>}
                <span className="tag">{x.category}</span>
                <div className="head">
                  <Avatar size={44} />
                  <div>
                    <Link href={`/p/${x.id}`} className="nm">{x.name}</Link>
                    <div className="co">{x.company} · {x.role}</div>
                  </div>
                </div>
                <div className="hook">{x.hook}</div>
                <div className="foot">
                  <span className="upd">{x.updated}</span>
                  <form action="/api/follow" method="post">
                    <input type="hidden" name="id" value={x.id} />
                    <input type="hidden" name="back" value={back} />
                    <button type="submit" className="btn ghost sm following">追蹤中</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
