import Link from "next/link";
import { SITE, PLANS } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";

// 選擇方案後：建立帳號 + 填寫會員資料
export default function Checkout({ searchParams }) {
  const key = PLANS[searchParams?.plan] ? searchParams.plan : "standard";
  const plan = PLANS[key];
  const user = getCurrentUser();

  return (
    <>
      <div className="mini-hd">
        <div className="in">
          <Link href="/" className="brand"><span className="dot" />{SITE.brand}</Link>
          <div style={{ flex: 1 }} />
          <Link href="/pricing" className="link-teal" style={{ fontSize: 14 }}>← 返回方案</Link>
        </div>
      </div>

      <div className="co-head">
        <div className="step">第 2 步，共 3 步 · 建立帳號</div>
        <h1 className="serif">填寫會員資料</h1>
      </div>

      <form className="checkout" action="/api/checkout" method="post">
        <input type="hidden" name="plan" value={key} />

        <div>
          {/* 基本資料（必填） */}
          <div className="form-card">
            <div className="form-sec-title">基本資料</div>
            <p className="form-sec-sub">標示 <span style={{ color: "var(--teal)" }}>*</span> 為必填</p>
            <div className="form-grid">
              <div>
                <label className="flabel">名字<span className="req">*</span></label>
                <input className="finput" name="name" placeholder="王小明" defaultValue={user?.name || ""} required />
              </div>
              <div>
                <label className="flabel">性別<span className="req">*</span></label>
                <select className="finput" name="gender" required defaultValue="">
                  <option value="" disabled>請選擇</option>
                  <option value="female">女</option>
                  <option value="male">男</option>
                  <option value="other">其他</option>
                  <option value="na">不透露</option>
                </select>
              </div>
              <div>
                <label className="flabel">電子郵件<span className="req">*</span></label>
                <input className="finput" name="email" type="email" placeholder="you@company.com" defaultValue={user?.email || ""} required />
              </div>
              <div>
                <label className="flabel">手機號碼<span className="req">*</span></label>
                <input className="finput" name="phone" type="tel" placeholder="0912-345-678" required />
              </div>
              <div>
                <label className="flabel">出生年月日<span className="req">*</span></label>
                <input className="finput" name="birthdate" type="date" required />
              </div>
              <div>
                <label className="flabel">設定密碼<span className="req">*</span></label>
                <input className="finput" name="password" type="password" placeholder="至少 8 碼" required />
              </div>
            </div>

            <div className="divider-line" />

            {/* 選填資料 */}
            <div className="form-sec-title">其他資料</div>
            <p className="form-sec-sub">以下皆為選填，可留空</p>
            <div className="form-grid">
              <div>
                <label className="flabel">公司行號<span className="opt">選填</span></label>
                <input className="finput" name="company" placeholder="台創股份有限公司" />
              </div>
              <div>
                <label className="flabel">職稱<span className="opt">選填</span></label>
                <input className="finput" name="title" placeholder="產品經理" />
              </div>
              <div>
                <label className="flabel">統一編號<span className="opt">選填</span></label>
                <input className="finput" name="taxId" placeholder="用於公司發票" />
              </div>
              <div>
                <label className="flabel">產業<span className="opt">選填</span></label>
                <input className="finput" name="industry" placeholder="例如：科技、製造、零售" />
              </div>
              <div className="full">
                <label className="flabel">通訊地址<span className="opt">選填</span></label>
                <input className="finput" name="address" placeholder="例如：台北市信義區…" />
              </div>
            </div>

            <label className="login-row" style={{ marginTop: 18 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5 }}>
                <input type="checkbox" required defaultChecked /> 我同意服務條款與隱私權政策，並確認自動續訂條款
              </span>
            </label>

            <button className="btn primary block" type="submit" style={{ marginTop: 18 }}>
              建立帳號並開始訂閱
            </button>
            <p className="sum-note" style={{ textAlign: "center" }}>
              示範版：不會實際扣款；送出即建立帳號並啟用訂閱。
            </p>
          </div>
        </div>

        {/* 訂閱摘要 */}
        <div className="summary-card">
          <h3>訂閱摘要</h3>
          <div className="plan-name">{plan.name}方案</div>
          <div className="sum-row"><span>方案費用</span><span>NT$ {plan.price} / {plan.unit}</span></div>
          <div className="sum-row"><span>帳單週期</span><span>{plan.cycle}</span></div>
          <div className="sum-row"><span>首期優惠</span><span>—</span></div>
          <div className="sum-total"><span>今日應付</span><span>NT$ {plan.price}</span></div>
          <ul className="sum-feat">
            {plan.feats.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <div className="sum-note">可隨時於帳號設定取消，沒有任何綁約。</div>
        </div>
      </form>
    </>
  );
}
