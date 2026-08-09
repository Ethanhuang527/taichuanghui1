import Link from "next/link";
import { SITE, PLANS } from "@/lib/site";

// 支付頁面（填完個人資料後）
export default function Payment({ searchParams }) {
  const key = PLANS[searchParams?.plan] ? searchParams.plan : "standard";
  const plan = PLANS[key];

  return (
    <>
      <div className="mini-hd">
        <div className="in">
          <Link href="/" className="brand"><span className="dot" />{SITE.brand}</Link>
          <div style={{ flex: 1 }} />
          <Link href={`/checkout?plan=${key}`} className="link-teal" style={{ fontSize: 14 }}>← 返回上一步</Link>
        </div>
      </div>

      <div className="co-head">
        <div className="step">第 3 步，共 3 步 · 付款</div>
        <h1 className="serif">選擇付款方式</h1>
      </div>

      <form className="checkout" action="/api/pay" method="post">
        <input type="hidden" name="plan" value={key} />

        <div className="form-card">
          {/* 付款方式 */}
          <div className="form-sec-title">付款方式</div>
          <p className="form-sec-sub">示範版：不會真的扣款</p>
          <div className="paytabs">
            <label className="paytab"><input type="radio" name="method" value="card" defaultChecked /><span className="ic">💳</span>信用卡</label>
            <label className="paytab"><input type="radio" name="method" value="linepay" /><span className="ic">🟢</span>LINE Pay</label>
            <label className="paytab"><input type="radio" name="method" value="atm" /><span className="ic">🏧</span>ATM 轉帳</label>
            <label className="paytab"><input type="radio" name="method" value="cvs" /><span className="ic">🏪</span>超商代碼</label>
          </div>

          {/* 信用卡視覺 */}
          <div className="card-visual">
            <div className="brandrow"><span>台創會 會員</span><span>VISA</span></div>
            <div className="num">•••• •••• •••• 4242</div>
            <div className="sub"><span>持卡人</span><span>有效期限 12/28</span></div>
          </div>

          {/* 卡片欄位 */}
          <div className="form-grid">
            <div className="full">
              <label className="flabel">卡號<span className="req">*</span></label>
              <input className="finput" name="cardNo" placeholder="4242 4242 4242 4242" defaultValue="4242 4242 4242 4242" />
            </div>
            <div>
              <label className="flabel">有效期限<span className="req">*</span></label>
              <input className="finput" name="exp" placeholder="MM / YY" defaultValue="12 / 28" />
            </div>
            <div>
              <label className="flabel">安全碼 CVC<span className="req">*</span></label>
              <input className="finput" name="cvc" placeholder="•••" defaultValue="123" />
            </div>
            <div className="full">
              <label className="flabel">持卡人姓名<span className="req">*</span></label>
              <input className="finput" name="holder" placeholder="WANG XIAO MING" defaultValue="SHEN FANG LEI" />
            </div>
          </div>

          <label className="login-row" style={{ marginTop: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5 }}>
              <input type="checkbox" required defaultChecked /> 我同意於每期自動扣款，並可隨時取消
            </span>
          </label>

          <button className="btn primary block" type="submit" style={{ marginTop: 18 }}>
            確認付款 NT$ {plan.price}
          </button>
          <p className="sum-note" style={{ textAlign: "center" }}>
            🔒 示範版不會實際扣款；正式版由綠界／信用卡安全處理。
          </p>
        </div>

        {/* 訂單摘要 */}
        <div className="summary-card">
          <h3>訂單摘要</h3>
          <div className="plan-name">{plan.name}方案</div>
          <div className="sum-row"><span>方案費用</span><span>NT$ {plan.price} / {plan.unit}</span></div>
          <div className="sum-row"><span>帳單週期</span><span>{plan.cycle}</span></div>
          <div className="sum-total"><span>今日應付</span><span>NT$ {plan.price}</span></div>
          <ul className="sum-feat">
            {plan.feats.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      </form>
    </>
  );
}
