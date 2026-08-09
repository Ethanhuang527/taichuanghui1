import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getProfile } from "@/lib/profile";
import { currentSubscription, subscriptionTiming } from "@/lib/access";
import { PLANS, PLAN_ORDER } from "@/lib/site";
import DashSidebar from "@/components/DashSidebar";

export default function Subscription() {
  const user = getCurrentUser();
  if (!user) redirect("/login?next=/account/subscription");
  const p = getProfile();
  const sub = currentSubscription();
  const member = !!sub;
  const plan = sub ? (PLANS[sub.plan] || PLANS.standard) : null;
  const t = subscriptionTiming(sub); // { daysLeft, percent, start, end }
  const planLabel = member ? `${plan.name}訂閱` : "免費帳號";

  return (
    <div className="dash">
      <DashSidebar active="我的訂閱" name={p.name} planLabel={planLabel} />

      <main className="main">
        <div className="top">
          <h1>我的訂閱</h1>
          <div className="search">搜尋…</div>
          <span className="avatar-sq">{p.name?.[0] || "會"}</span>
        </div>

        {member ? (
          <>
            {/* 目前方案狀態卡 */}
            <div className="sub-status">
              <div className="planrow">
                <span className="crown">👑</span>
                <span className="pname">{plan.name}方案</span>
                <span className="chip">有效中</span>
                <span className="price">NT$ {plan.price} / {plan.unit}</span>
              </div>

              {/* 自動計算的剩餘天數（續訂日 − 今天） */}
              <div className="countdown">
                <span className="num">{t.daysLeft}</span>
                <span className="unit">天後續訂</span>
              </div>
              <div className="count-note">下次續訂扣款日：{sub.currentPeriodEnd}（{plan.cycle}）</div>

              {/* 本期進度條 */}
              <div className="pbar"><div className="pbar-fill" style={{ width: `${t.percent}%` }} /></div>
              <div className="pbar-legend">
                <span>本期起 {sub.start || "—"}</span>
                <span>已過 {t.percent}%</span>
                <span>續訂 {sub.currentPeriodEnd}</span>
              </div>

              <div className="sub-actions">
                <Link href="/pricing" className="btn primary">變更 / 升級方案</Link>
                <form action="/api/unsubscribe" method="post">
                  <button type="submit" className="btn ghost">取消訂閱</button>
                </form>
              </div>
            </div>

            {/* 方案內容 */}
            <div className="info-card">
              <h3>方案包含</h3>
              <div className="info-grid">
                {plan.feats.map((f, i) => <div className="info-row" key={i}><span className="k">{f}</span><span className="v" style={{ color: "var(--teal)" }}>✓</span></div>)}
                <div className="info-row"><span className="k">完整人物專訪</span><span className="v" style={{ color: "var(--teal)" }}>✓</span></div>
                <div className="info-row"><span className="k">每週人物來信</span><span className="v" style={{ color: "var(--teal)" }}>✓</span></div>
              </div>
            </div>
          </>
        ) : (
          <div className="sub-empty">
            <h3>你目前尚未訂閱</h3>
            <p>成為台創會會員，即可看遍所有人物專訪與完整影片，並在這裡看到方案狀態與續訂日期。</p>
            <Link href="/pricing" className="btn primary">查看訂閱方案</Link>
          </div>
        )}

        {/* 變更方案 */}
        <div className="sec-head" style={{ marginTop: 26, marginBottom: 12 }}>
          <h2 style={{ fontSize: 18 }}>可選方案</h2>
        </div>
        <div className="plan-mini">
          {PLAN_ORDER.map((key) => {
            const pl = PLANS[key];
            const isCur = member && sub.plan === key;
            return (
              <div className={`pm${isCur ? " cur" : ""}`} key={key}>
                {isCur && <span className="curtag">目前方案</span>}
                <div className="nm">{pl.name}</div>
                <div className="pr">NT${pl.price}<small> / {pl.unit}</small></div>
                {isCur ? (
                  <span className="muted">使用中</span>
                ) : (
                  <Link href={`/checkout?plan=${key}`} className="btn ghost block">切換至此方案</Link>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
