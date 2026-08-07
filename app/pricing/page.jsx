import { SITE, PLANS, PLAN_ORDER } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";
import { isMember } from "@/lib/access";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function Pricing() {
  const user = getCurrentUser();
  const member = isMember();

  return (
    <>
      <SiteHeader active="方案" />
      <section className="pricing">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <h1 className="serif">選擇最適合你的方案</h1>
            </div>
            <div className="stepper">第 1 步，共 3 步</div>
          </div>

          <ul className="checks">
            <li>隨時可取消，沒有任何綁約</li>
            <li>每週更新，一位值得認識的企業人物</li>
            <li>無廣告，完整深度影音專訪與語錄</li>
          </ul>

          <div className="plans">
            {PLAN_ORDER.map((key) => {
              const p = PLANS[key];
              return (
                <div key={key} className={`plan${p.best ? " best" : ""}`}>
                  {p.best && <span className="flag">最受歡迎</span>}
                  <h3 className="serif">{p.name}</h3>
                  <div className={`price${p.best ? " hl" : ""}`}>NT${p.price}<small>月</small></div>
                  {member ? (
                    <span className="chip">你已是會員</span>
                  ) : (
                    <Link
                      href={`/checkout?plan=${key}`}
                      className={p.best ? "btn primary block" : "btn ghost block"}
                    >
                      選擇{p.name}方案
                    </Link>
                  )}
                  <ul className="feats">
                    {p.feats.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="muted center" style={{ marginTop: 22 }}>
            可隨時在帳號設定變更或取消方案。所有價格均含稅。
          </p>
        </div>
      </section>
    </>
  );
}
