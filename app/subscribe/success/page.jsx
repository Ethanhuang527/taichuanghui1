import Link from "next/link";
import { redirect } from "next/navigation";
import { SITE, PLANS } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";
import { currentSubscription } from "@/lib/access";

export default function Success() {
  const user = getCurrentUser();
  if (!user) redirect("/login");
  const sub = currentSubscription();
  if (!sub) redirect("/pricing");
  const plan = PLANS[sub.plan] || PLANS.standard;

  return (
    <>
      <div className="mini-hd">
        <div className="in">
          <Link href="/" className="brand"><span className="dot" />{SITE.brand}</Link>
          <div style={{ flex: 1 }} />
          <Link href="/account" className="avatar-sq">{user.name?.[0] || "會"}</Link>
        </div>
      </div>

      <div className="success">
        <div className="check">
          <svg viewBox="0 0 24 24" fill="none"><path d="M4 12.5l5 5L20 6.5" stroke="#0b1a16" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h1 className="serif">付款成功，訂閱完成！</h1>
        <div className="sub">
          感謝你的訂閱，歡迎成為 {SITE.brand} 會員！你現在就能<strong style={{ color: "var(--ink)" }}>立即觀看所有人物專訪與完整影片</strong>。
          一封含帳單明細的確認信也已寄到你的信箱。
        </div>

        <div className="summary">
          <div className="r"><span className="k">方案</span><span className="v">{plan.name}訂閱</span></div>
          <div className="r"><span className="k">金額</span><span className="v">NT$ {plan.price.toLocaleString()} / {plan.unit}</span></div>
          <div className="r"><span className="k">會員效期至</span><span className="v">{sub.currentPeriodEnd}</span></div>
          <div className="r"><span className="k">續訂方式</span><span className="v">{plan.cycle}</span></div>
        </div>

        <Link href="/browse" className="btn primary block" style={{ marginBottom: 14 }}>▶ 開始觀看專訪</Link>
        <div className="muted">
          <Link href="/account" className="link-teal">前往帳號設定</Link>
          <span style={{ margin: "0 8px" }}>·</span>
          <Link href="/account" className="link-teal">下載收據</Link>
        </div>
      </div>
    </>
  );
}
