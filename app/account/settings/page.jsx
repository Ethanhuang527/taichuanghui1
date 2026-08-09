import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getProfile } from "@/lib/profile";
import { currentSubscription } from "@/lib/access";
import { PLANS } from "@/lib/site";
import DashSidebar from "@/components/DashSidebar";

const FIELDS = ["科技資訊", "製造", "金融投資", "零售電商", "醫療生技", "教育", "設計創意", "餐飲服務", "媒體出版", "顧問服務", "其他"];
const EDU = ["高中職", "專科", "大學", "碩士", "博士", "其他"];

export default function Settings({ searchParams }) {
  const user = getCurrentUser();
  if (!user) redirect("/login?next=/account/settings");
  const p = getProfile();
  const sub = currentSubscription();
  const planLabel = sub ? `${(PLANS[sub.plan] || PLANS.standard).name}訂閱` : "免費帳號";
  const saved = searchParams?.saved;

  return (
    <div className="dash">
      <DashSidebar active="個人資料" name={p.name} planLabel={planLabel} />

      <main className="main">
        <div className="top">
          <h1>帳號設定</h1>
          <div className="search">搜尋…</div>
          <span className="avatar-sq">{p.name?.[0] || "會"}</span>
        </div>

        <Link href="/account/profile" className="link-teal" style={{ fontSize: 14 }}>← 返回個人資料</Link>
        <div className="greet" style={{ fontSize: 22, marginTop: 6 }}>編輯個人資料</div>
        <p className="greet-sub">維護你的基本資料、公司與專業背景。這些資料僅用於個人化你的會員體驗。</p>

        {saved && <div className="saved-banner">✓ 個人資料已更新</div>}

        <form action="/api/profile" method="post">
          <div className="form-card">
            {/* 基本資料 */}
            <div className="form-sec-title">基本資料</div>
            <p className="form-sec-sub">你的名字與聯絡方式</p>
            <div className="form-grid">
              <div>
                <label className="flabel">名字<span className="req">*</span></label>
                <input className="finput" name="name" defaultValue={p.name} required />
              </div>
              <div>
                <label className="flabel">生日</label>
                <input className="finput" name="birthdate" type="date" defaultValue={p.birthdate} />
              </div>
              <div>
                <label className="flabel">性別</label>
                <select className="finput" name="gender" defaultValue={p.gender}>
                  <option value="">未選擇</option>
                  <option value="female">女</option>
                  <option value="male">男</option>
                  <option value="other">其他</option>
                  <option value="na">不透露</option>
                </select>
              </div>
              <div>
                <label className="flabel">電子郵件</label>
                <input className="finput" name="email" type="email" defaultValue={p.email} />
              </div>
              <div>
                <label className="flabel">手機號碼</label>
                <input className="finput" name="phone" type="tel" defaultValue={p.phone} placeholder="0912-345-678" />
              </div>
            </div>

            <div className="divider-line" />

            {/* 公司／專業 */}
            <div className="form-sec-title">公司與專業</div>
            <p className="form-sec-sub">若你是企業／公司代表人物，可填寫下列資料</p>
            <label className="toggle-row">
              <input type="checkbox" name="isCompanyPerson" defaultChecked={!!p.isCompanyPerson} />
              <span>
                <span className="t">我是企業／公司代表人物</span><br />
                <span className="s">勾選後，你的資料會標記為公司人物，便於媒合與收據開立</span>
              </span>
            </label>
            <div className="form-grid">
              <div>
                <label className="flabel">公司行號</label>
                <input className="finput" name="company" defaultValue={p.company} placeholder="台創股份有限公司" />
              </div>
              <div>
                <label className="flabel">職位</label>
                <input className="finput" name="title" defaultValue={p.title} placeholder="產品經理 / 創辦人" />
              </div>
              <div>
                <label className="flabel">專業領域</label>
                <select className="finput" name="field" defaultValue={p.field}>
                  <option value="">未選擇</option>
                  {FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="flabel">統一編號<span className="opt">選填</span></label>
                <input className="finput" name="taxId" defaultValue={p.taxId} placeholder="用於公司發票" />
              </div>
              <div className="full">
                <label className="flabel">公司／通訊地址<span className="opt">選填</span></label>
                <input className="finput" name="address" defaultValue={p.address} placeholder="例如：台北市信義區…" />
              </div>
            </div>

            <div className="divider-line" />

            {/* 學歷 */}
            <div className="form-sec-title">學歷</div>
            <p className="form-sec-sub">你的教育背景</p>
            <div className="form-grid">
              <div>
                <label className="flabel">最高學歷</label>
                <select className="finput" name="education" defaultValue={p.education}>
                  <option value="">未選擇</option>
                  {EDU.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="flabel">畢業學校</label>
                <input className="finput" name="school" defaultValue={p.school} placeholder="例如：國立台灣大學" />
              </div>
              <div className="full">
                <label className="flabel">主修科系</label>
                <input className="finput" name="major" defaultValue={p.major} placeholder="例如：資訊工程學系" />
              </div>
            </div>

            <div className="divider-line" />

            {/* 簡介 */}
            <div className="form-sec-title">個人簡介<span className="opt" style={{ marginLeft: 8 }}>選填</span></div>
            <textarea className="finput" name="bio" defaultValue={p.bio} placeholder="用幾句話介紹你自己或你的公司…" />

            <button className="btn primary" type="submit" style={{ marginTop: 20 }}>儲存變更</button>
          </div>
        </form>
      </main>
    </div>
  );
}
