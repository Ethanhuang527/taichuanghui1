import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Login({ searchParams }) {
  const next = searchParams?.next || "/account";
  return (
    <div className="login">
      <div className="left">
        <div className="brand" style={{ color: "#fff" }}><span className="dot" />{SITE.brand}</div>
        <h2>歡迎回來。</h2>
        <div className="sub">繼續閱讀你追蹤的人物，與他們的每一次選擇。</div>
        <div className="mark">“</div>
        <div className="pull">{SITE.tagline}。</div>
        <div className="cnt">{SITE.social}</div>
      </div>

      <div className="right">
        <div className="box">
          <h1>登入 {SITE.brand}</h1>
          <div className="reg">還沒有帳號？<Link href="/pricing" className="link-green">免費註冊</Link></div>

          <form action="/api/login" method="post">
            <input type="hidden" name="next" value={next} />
            <div className="field">
              <label>電子郵件</label>
              <input name="email" type="email" placeholder="you@company.com" defaultValue="demo@voices.tw" required />
            </div>
            <div className="field">
              <label>密碼</label>
              <input name="password" type="password" placeholder="••••••••••" defaultValue="demo1234" />
            </div>
            <div style={{ textAlign: "right", marginBottom: 18 }}>
              <span className="link-green" style={{ fontSize: 13 }}>忘記密碼？</span>
            </div>
            <button className="btn primary block" type="submit">登入</button>
          </form>

          <div className="divider">或</div>
          <button className="gbtn" type="button">使用 Google 繼續</button>
          <div className="tos">登入即表示你同意服務條款與隱私權政策</div>
          <div className="tos" style={{ marginTop: 8 }}>示範版：任何 Email 皆可登入</div>
        </div>
      </div>
    </div>
  );
}
