import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Register() {
  return (
    <div className="login-wrap">
      <div className="login-bg">
        {Array.from({ length: 24 }).map((_, i) => <span key={i} />)}
      </div>

      <div className="login-card">
        <div className="brand"><span className="dot" />{SITE.brand}</div>
        <h1 className="serif">建立帳號</h1>
        <p className="reg" style={{ marginTop: -8, marginBottom: 18 }}>
          免費加入 {SITE.brand}，開始認識那些改變產業的人。
        </p>

        <form action="/api/register" method="post">
          <div className="field">
            <input name="name" type="text" placeholder="你的名字" required />
          </div>
          <div className="field">
            <input name="email" type="email" placeholder="電子郵件" required />
          </div>
          <div className="field">
            <input name="password" type="password" placeholder="設定密碼（至少 8 碼）" required />
          </div>
          <div className="field">
            <input name="confirm" type="password" placeholder="再次輸入密碼" required />
          </div>

          <label className="login-row" style={{ marginBottom: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" required defaultChecked /> 我同意服務條款與隱私權政策
            </span>
          </label>

          <button className="btn primary block" type="submit">免費註冊</button>
        </form>

        <div className="divider" style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--muted)", fontSize: 13, margin: "18px 0" }}>
          <span style={{ flex: 1, height: 1, background: "var(--line)" }} />或<span style={{ flex: 1, height: 1, background: "var(--line)" }} />
        </div>
        <button className="btn ghost block" type="button">使用 Google 繼續</button>

        <div className="reg" style={{ textAlign: "center", marginTop: 18 }}>
          已經有帳號？<Link href="/login" className="link-teal">登入</Link>
        </div>
        <div className="tos">示範版：填寫後即建立帳號並自動登入。</div>
      </div>
    </div>
  );
}
