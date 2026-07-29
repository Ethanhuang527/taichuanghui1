import Link from "next/link";
import { redirect } from "next/navigation";
import { SITE, PLANS } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";
import { getSubscription, db } from "@/lib/db";
import { isMember } from "@/lib/access";
import Avatar from "@/components/Avatar";

const NAV = [
  ["總覽", true], ["我的訂閱"], ["追蹤的人物"], ["閱讀紀錄"], ["帳號設定"], ["帳單與付款"],
];

export default function Account() {
  const user = getCurrentUser();
  if (!user) redirect("/login?next=/account");

  const sub = getSubscription(user.id);
  const member = isMember(user);
  const plan = sub ? (PLANS[sub.plan] || PLANS.yearly) : PLANS.yearly;
  const recent = db.people.filter((p) => !p.featured).slice(0, 3);
  const times = ["2 天前", "5 天前", "1 週前"];

  return (
    <div className="dash">
      <aside className="side">
        <div className="brand"><span className="dot" />{SITE.brand}</div>
        <nav className="nav">
          {NAV.map(([label, active]) => (
            <Link key={label} href="/account" className={active ? "active" : ""}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: "currentColor", display: "inline-block", opacity: .8 }} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="me">
          <Avatar size={36} ring />
          <div>
            <div className="nm">沈{user.name}</div>
            <div className="pl">{member ? plan.name : "免費帳號"}</div>
          </div>
        </div>
      </aside>

      <main className="main">
        <div className="top">
          <h1>帳號總覽</h1>
          <div className="search">搜尋…</div>
          <span className="avatar-chip"><Avatar size={28} ring />{user.name}</span>
        </div>

        <div className="greet">早安，{user.name}。</div>
        <p className="greet-sub">
          {member
            ? `你的會員有效，本月已讀 ${db.stats.readThisMonth} 篇人物故事。`
            : "你目前是免費帳號，訂閱後即可看遍所有人物專訪與影片。"}
        </p>

        <div className="tiles">
          <div className="tile">
            <div className="lbl">訂閱狀態</div>
            <div className="big">{member ? "有效" : "未訂閱"}</div>
            <div className="foot">{member ? plan.name : <Link href="/pricing" className="link-green">前往訂閱</Link>}</div>
          </div>
          <div className="tile">
            <div className="lbl">本月已讀</div>
            <div className="big">{db.stats.readThisMonth} 篇</div>
            <div className="foot">較上月 +5</div>
          </div>
          <div className="tile">
            <div className="lbl">追蹤人物</div>
            <div className="big">{db.stats.following} 位</div>
            <div className="foot">3 位有新故事</div>
          </div>
          <div className="tile">
            <div className="lbl">會員到期</div>
            <div className="big ink">{member ? sub.currentPeriodEnd : "—"}</div>
            <div className="foot">{member ? "自動續訂中" : "尚未訂閱"}</div>
          </div>
        </div>

        <div className="subcard">
          <div>
            <div className="h">我的訂閱 {member && <span className="chip">有效中</span>}</div>
            <div className="muted" style={{ marginTop: 6, fontSize: 14 }}>
              {member
                ? `${plan.name} · NT$${plan.price.toLocaleString()} / ${plan.unit} · 下次扣款 ${sub.currentPeriodEnd}`
                : "尚未訂閱任何方案"}
            </div>
            {member && <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>包含：完整人物專訪 · 語錄選集 · 每週來信 · 無廣告閱讀</div>}
          </div>
          <Link href="/pricing" className="btn ghost">{member ? "管理訂閱" : "前往訂閱"}</Link>
        </div>

        <div className="sec-head" style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 18 }}>最近閱讀</h2>
          <Link href="/people" className="link-green" style={{ fontSize: 14 }}>查看全部 →</Link>
        </div>
        <div className="readlist">
          {recent.map((p, i) => (
            <Link key={p.id} href={`/p/${p.id}`} className="readrow">
              <div className="av"><Avatar size={40} /></div>
              <div>
                <span className="nm">{p.name}</span>{" "}
                <span className="co">{p.company} · {p.role}</span>
                <div className="hk">{p.hook}</div>
              </div>
              <div className="tm">{times[i]}</div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <form action="/api/logout" method="post"><button className="btn ghost" type="submit">登出</button></form>
        </div>
      </main>
    </div>
  );
}
