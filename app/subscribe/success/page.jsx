import Link from "next/link";
import { redirect } from "next/navigation";
import { SITE, PLANS } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";
import { getSubscription } from "@/lib/db";

export default function Success() {
  const user = getCurrentUser();
  if (!user) redirect("/login");
  const sub = getSubscription(user.id);
  if (!sub) redirect("/pricing");
  const plan = PLANS[sub.plan] || PLANS.yearly;

  return (
    <>
      <div className="hd">
        <div className="in">
          <Link href="/" className="brand"><span className="dot" />{SITE.brand}</Link>
          <div className="sp" />
          <span className="avatar-chip">{user.name}</span>
        </div>
      </div>

      <div className="success">
        <div className="check">
          <svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5l5 5L20 6.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h1>訂閱成功！</h1>
        <div className="sub">歡迎加入 {SITE.brand} 會員，你的每週人物來信已啟用。</div>

        <div className="summary">
          <div className="r"><span className="k">方案</span><span className="v">{plan.name}</span></div>
          <div className="r"><span className="k">金額</span><span className="v">NT$ {plan.price.toLocaleString()} / {plan.unit}</span></div>
          <div className="r"><span className="k">帳單週期</span><span className="v">{plan.cycle}</span></div>
          <div className="r"><span className="k">下次扣款</span><span className="v">{sub.currentPeriodEnd}</span></div>
        </div>

        <Link href="/account" className="btn primary block" style={{ marginBottom: 14 }}>開始閱讀</Link>
        <div className="muted">
          <Link href="/account" className="link-green">查看收據</Link> · <Link href="/account" className="link-green">前往帳號設定</Link>
        </div>
      </div>
    </>
  );
}
