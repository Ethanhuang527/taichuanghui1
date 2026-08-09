import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getProfile } from "@/lib/profile";
import { currentSubscription } from "@/lib/access";
import { getHistory, relTime } from "@/lib/history";
import { getPerson } from "@/lib/db";
import { PLANS } from "@/lib/site";
import DashSidebar from "@/components/DashSidebar";
import Avatar from "@/components/Avatar";

const DAY = 86400000;

function RowList({ items }) {
  return (
    <div className="readlist">
      {items.map((e) => (
        <Link key={e.id + e.at} href={`/p/${e.person.id}`} className="readrow">
          <div className="av"><Avatar size={40} /></div>
          <div>
            <span className="nm">{e.person.name}</span>{" "}
            <span className="co">{e.person.company} · {e.person.role}</span>
            <div className="ttl">{e.person.tagline}</div>
          </div>
          <div className="rt">
            <span className="tm">{relTime(e.at)} · {e.person.readMinutes} 分鐘</span>
            <span className="re">重讀 →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function History() {
  const user = getCurrentUser();
  if (!user) redirect("/login?next=/account/history");
  const p = getProfile();
  const sub = currentSubscription();
  const planLabel = sub ? `${(PLANS[sub.plan] || PLANS.standard).name}訂閱` : "免費帳號";

  const entries = getHistory()
    .map((e) => ({ ...e, person: getPerson(e.id) }))
    .filter((e) => e.person);

  const now = Date.now();
  const groups = { today: [], week: [], earlier: [] };
  for (const e of entries) {
    const d = (now - e.at) / DAY;
    if (d < 1) groups.today.push(e);
    else if (d < 7) groups.week.push(e);
    else groups.earlier.push(e);
  }
  const totalMin = entries.reduce((s, e) => s + (e.person.readMinutes || 0), 0);
  const lastRead = entries[0] ? relTime(entries[0].at) : "—";

  return (
    <div className="dash">
      <DashSidebar active="閱讀紀錄" name={p.name} planLabel={planLabel} />

      <main className="main">
        <div className="top">
          <h1>閱讀紀錄</h1>
          <div style={{ flex: 1 }} />
          <span className="avatar-sq">{p.name?.[0] || "會"}</span>
        </div>

        {entries.length === 0 ? (
          <div className="empty-state">
            <h3>還沒有閱讀紀錄</h3>
            <p>開始閱讀人物專訪，你看過的內容會自動記錄在這裡，方便隨時回顧。</p>
            <Link href="/browse" className="btn primary">開始閱讀</Link>
          </div>
        ) : (
          <>
            <div className="hist-stats">
              <div className="tile"><div className="lbl">累計閱讀</div><div className="big">{entries.length} 篇</div><div className="foot">你看過的人物專訪</div></div>
              <div className="tile"><div className="lbl">閱讀時數</div><div className="big">{totalMin} 分</div><div className="foot">約 {Math.max(1, Math.round(totalMin / 60))} 小時內容</div></div>
              <div className="tile"><div className="lbl">最近一次</div><div className="big ink">{lastRead}</div><div className="foot">保持每週閱讀的習慣</div></div>
            </div>

            {groups.today.length > 0 && (<><div className="hist-group">今天</div><RowList items={groups.today} /></>)}
            {groups.week.length > 0 && (<><div className="hist-group">本週</div><RowList items={groups.week} /></>)}
            {groups.earlier.length > 0 && (<><div className="hist-group">更早</div><RowList items={groups.earlier} /></>)}
          </>
        )}
      </main>
    </div>
  );
}
