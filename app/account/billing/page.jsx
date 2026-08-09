import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getProfile } from "@/lib/profile";
import { currentSubscription, subscriptionTiming } from "@/lib/access";
import { PLANS } from "@/lib/site";
import DashSidebar from "@/components/DashSidebar";

const fmt = (d) => `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;

export default function Billing() {
  const user = getCurrentUser();
  if (!user) redirect("/login?next=/account/billing");
  const p = getProfile();
  const sub = currentSubscription();
  const member = !!sub;
  const plan = sub ? (PLANS[sub.plan] || PLANS.standard) : null;
  const t = subscriptionTiming(sub);
  const planLabel = member ? `${plan.name}訂閱` : "免費帳號";

  // 由訂閱起始日往前推，產生歷史帳單（示範）
  let invoices = [];
  if (member) {
    const base = new Date((sub.start || sub.currentPeriodEnd).replace(/\//g, "-"));
    for (let i = 0; i < 3; i++) {
      const d = new Date(base); d.setMonth(d.getMonth() - i);
      invoices.push({ date: fmt(d), no: `INV-${fmt(d).replace(/\//g, "")}`, plan: plan.name, amount: plan.price });
    }
  }

  const invoiceTarget = p.isCompanyPerson && p.company
    ? `公司發票 · ${p.company}${p.taxId ? `（統編 ${p.taxId}）` : ""}`
    : "個人電子發票";

  return (
    <div className="dash">
      <DashSidebar active="帳單與付款" name={p.name} planLabel={planLabel} />

      <main className="main">
        <div className="top">
          <h1>帳單與付款</h1>
          <div style={{ flex: 1 }} />
          <span className="avatar-sq">{p.name?.[0] || "會"}</span>
        </div>

        {!member ? (
          <div className="empty-state">
            <h3>目前沒有進行中的付款</h3>
            <p>訂閱台創會會員後，這裡會顯示你的下一期扣款、付款方式與歷史帳單。</p>
            <Link href="/pricing" className="btn primary">查看訂閱方案</Link>
          </div>
        ) : (
          <>
            {/* 下一期扣款 */}
            <div className="info-card">
              <h3>下一期扣款</h3>
              <div className="bill-next">
                <span className="amt">NT$ {plan.price.toLocaleString()}</span>
                <span className="when">
                  將於 <b>{sub.currentPeriodEnd}</b> 自動扣款（{t.daysLeft} 天後）· {plan.name}方案 / {plan.unit}繳
                </span>
                <Link href="/account/subscription" className="btn ghost sm" style={{ marginLeft: "auto" }}>管理訂閱</Link>
              </div>
            </div>

            {/* 付款方式 */}
            <div className="info-card">
              <h3>付款方式</h3>
              <div className="card-visual" style={{ maxWidth: 380 }}>
                <div className="brandrow"><span>台創會 會員</span><span>VISA</span></div>
                <div className="num">•••• •••• •••• 4242</div>
                <div className="sub"><span>{p.name}</span><span>有效期限 12/28</span></div>
              </div>
              <div className="pm-line" style={{ marginTop: 12 }}>
                <span className="muted">信用卡・末四碼 4242</span>
                <Link href={`/payment?plan=${sub.plan}`} className="btn ghost sm">更新付款方式</Link>
              </div>
            </div>

            {/* 發票資訊 */}
            <div className="info-card">
              <h3>發票資訊</h3>
              <div className="info-grid">
                <div className="info-row"><span className="k">開立方式</span><span className="v">{invoiceTarget}</span></div>
                <div className="info-row"><span className="k">寄送 Email</span><span className="v">{p.email || "—"}</span></div>
              </div>
              <div style={{ marginTop: 12 }}>
                <Link href="/account/settings" className="btn ghost sm">修改發票 / 統編</Link>
              </div>
            </div>

            {/* 歷史帳單 */}
            <div className="info-card">
              <h3>帳單紀錄</h3>
              <table className="bill-table">
                <thead>
                  <tr><th>日期</th><th>單號</th><th>項目</th><th>金額</th><th>狀態</th><th>收據</th></tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.no}>
                      <td>{inv.date}</td>
                      <td className="muted">{inv.no}</td>
                      <td>{inv.plan}方案 · 月費</td>
                      <td className="amt">NT$ {inv.amount.toLocaleString()}</td>
                      <td><span className="paid-badge">已付款</span></td>
                      <td><span className="rc">下載</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
