import Link from "next/link";
import { redirect } from "next/navigation";
import { PLANS } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { isMember, currentSubscription } from "@/lib/access";
import { getProfile } from "@/lib/profile";
import { getFollowing } from "@/lib/follow";
import Avatar from "@/components/Avatar";
import DashSidebar from "@/components/DashSidebar";

const GENDER = { female: "女", male: "男", other: "其他", na: "不透露" };

export default function Account() {
  const user = getCurrentUser();
  if (!user) redirect("/login?next=/account");

  const p = getProfile();
  const sub = currentSubscription();
  const member = isMember();
  const plan = sub ? (PLANS[sub.plan] || PLANS.standard) : PLANS.standard;
  const planLabel = member ? `${plan.name}訂閱` : "免費帳號";
  const recent = db.people.filter((x) => !x.featured).slice(0, 3);
  const times = ["2 天前", "5 天前", "1 週前"];
  const following = getFollowing();
  const newStories = db.people.filter((x) => following.includes(x.id) && x.isNew).length;

  const hasProfile = p.company || p.title || p.field || p.education;

  return (
    <div className="dash">
      <DashSidebar active="總覽" name={p.name} planLabel={planLabel} />

      <main className="main">
        <div className="top">
          <h1>帳號總覽</h1>
          <div style={{ flex: 1 }} />
          <span className="avatar-sq">{p.name?.[0] || "會"}</span>
        </div>

        <div className="greet">早安，{p.name}。</div>
        <p className="greet-sub">
          {member
            ? `你的會員有效，本月已讀 ${db.stats.readThisMonth} 篇人物故事。`
            : "你目前是免費帳號，訂閱後即可看遍所有人物專訪與影片。"}
        </p>

        <div className="tiles">
          <div className="tile">
            <div className="lbl">訂閱狀態</div>
            <div className="big">{member ? "有效" : "未訂閱"}</div>
            <div className="foot">{member ? plan.name : <Link href="/pricing" className="link-teal">前往訂閱</Link>}</div>
          </div>
          <div className="tile">
            <div className="lbl">本月已讀</div>
            <div className="big">{db.stats.readThisMonth} 篇</div>
            <div className="foot">較上月 +5</div>
          </div>
          <div className="tile">
            <div className="lbl">追蹤人物</div>
            <div className="big">{following.length} 位</div>
            <div className="foot"><Link href="/account/following" className="link-teal">{newStories} 位有新故事 →</Link></div>
          </div>
          <div className="tile">
            <div className="lbl">會員到期</div>
            <div className="big ink">{member ? sub.currentPeriodEnd : "—"}</div>
            <div className="foot">{member ? "自動續訂中" : "尚未訂閱"}</div>
          </div>
        </div>

        {/* 我的資料 */}
        <div className="subcard">
          <div>
            <div className="h">我的資料 {p.isCompanyPerson && <span className="chip">公司人物</span>}</div>
            <div className="muted" style={{ marginTop: 6, fontSize: 14 }}>
              {hasProfile
                ? [p.company, p.title, p.field, p.education && `${p.education}`].filter(Boolean).join(" · ")
                : "尚未填寫公司與專業資料"}
            </div>
            {(p.gender || p.birthdate) && (
              <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                {[GENDER[p.gender], p.birthdate].filter(Boolean).join(" · ")}
              </div>
            )}
          </div>
          <Link href="/account/profile" className="btn ghost">查看個人資料</Link>
        </div>

        {/* 我的訂閱 */}
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
          <Link href={member ? "/account/subscription" : "/pricing"} className="btn ghost">{member ? "管理訂閱" : "前往訂閱"}</Link>
        </div>

        <div className="sec-head" style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 18 }}>最近閱讀</h2>
          <Link href="/account/history" className="link-teal" style={{ fontSize: 14 }}>查看全部 →</Link>
        </div>
        <div className="readlist">
          {recent.map((x, i) => (
            <Link key={x.id} href={`/p/${x.id}`} className="readrow">
              <div className="av"><Avatar size={40} /></div>
              <div>
                <span className="nm">{x.name}</span>{" "}
                <span className="co">{x.company} · {x.role}</span>
                <div className="hk">{x.hook}</div>
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
