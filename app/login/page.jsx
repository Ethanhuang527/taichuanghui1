import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Login({ searchParams }) {
  const next = searchParams?.next || "/account";
  return (
    <div className="login-wrap">
      <div className="login-bg">
        {Array.from({ length: 24 }).map((_, i) => <span key={i} />)}
      </div>

      <div className="login-card">
        <div className="brand"><span className="dot" />{SITE.brand}</div>
        <h1 className="serif">登入</h1>

        <form action="/api/login" method="post">
          <input type="hidden" name="next" value={next} />
          <div className="field">
            <input name="email" type="text" placeholder="電子郵件或手機號碼" defaultValue="demo@voices.tw" required />
          </div>
          <div className="field">
            <input name="password" type="password" placeholder="密碼" defaultValue="demo1234" />
          </div>
          <button className="btn primary block" type="submit" style={{ marginTop: 6 }}>登入</button>
        </form>

        <div className="login-row">
          <label><input type="checkbox" defaultChecked /> 記住我</label>
          <span className="link-teal">需要協助？</span>
        </div>

        <div className="reg">還沒有帳號？<Link href="/register" className="link-teal">免費註冊</Link></div>
        <div className="tos">本頁受安全驗證保護，以確認你不是機器人。</div>
        <div className="tos">示範版：任何 Email 皆可登入</div>
      </div>
    </div>
  );
}
