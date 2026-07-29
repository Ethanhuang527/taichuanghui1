import { SITE, PLANS } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";
import { isMember } from "@/lib/access";
import SiteHeader from "@/components/SiteHeader";
import SubscribeButton from "@/components/SubscribeButton";

export default function Pricing() {
  const user = getCurrentUser();
  const member = isMember(user);

  return (
    <>
      <SiteHeader />
      <section className="section">
        <div className="container" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <div className="eyebrow">PLANS</div>
          <h2 style={{ fontSize: 32, margin: "8px 0 6px" }}>成為 {SITE.brand} 會員</h2>
          <p className="muted" style={{ fontSize: 16 }}>看遍所有人物專訪與完整影片，每週人物來信、無廣告閱讀。</p>
        </div>

        <div className="container">
          <div className="plans">
            <div className="plan">
              <h3>{PLANS.monthly.name}</h3>
              <div className="price">NT${PLANS.monthly.price}<small> / {PLANS.monthly.unit}</small></div>
              <ul>
                <li>完整人物專訪</li>
                <li>語錄選集</li>
                <li>每週人物來信</li>
              </ul>
              {member ? <span className="chip">你已是會員</span>
                : <SubscribeButton plan="monthly" loggedIn={!!user} label="訂閱月方案" cls="btn ghost block" />}
            </div>

            <div className="plan best">
              <span className="flag">最超值</span>
              <h3>{PLANS.yearly.name}</h3>
              <div className="price">NT${PLANS.yearly.price.toLocaleString()}<small> / {PLANS.yearly.unit}</small></div>
              <ul>
                <li>月方案所有內容</li>
                <li>等於省 2 個月</li>
                <li>完整專訪影片</li>
                <li>無廣告閱讀</li>
              </ul>
              {member ? <span className="chip">你已是會員</span>
                : <SubscribeButton plan="yearly" loggedIn={!!user} label="訂閱年方案" />}
            </div>

            <div className="plan">
              <h3>團隊方案</h3>
              <div className="price">聯絡我們</div>
              <ul>
                <li>5 席以上企業訂閱</li>
                <li>統一帳單與後台</li>
                <li>專屬客戶經理</li>
              </ul>
              <a className="btn ghost block" href="mailto:hello@voices.tw">洽談團隊方案</a>
            </div>
          </div>

          <p className="muted center" style={{ marginTop: 20 }}>
            示範說明：訂閱按鈕會直接把你標記為會員；正式版導向綠界定期定額，付款成功的 Webhook 回報後才寫入。
          </p>
        </div>
      </section>
    </>
  );
}
