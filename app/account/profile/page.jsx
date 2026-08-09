import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getProfile } from "@/lib/profile";
import { currentSubscription } from "@/lib/access";
import { PLANS } from "@/lib/site";
import DashSidebar from "@/components/DashSidebar";
import Avatar from "@/components/Avatar";

const GENDER = { female: "女", male: "男", other: "其他", na: "不透露" };

function Row({ k, v, full }) {
  const empty = !v;
  return (
    <div className={`info-row${full ? " full" : ""}`}>
      <span className="k">{k}</span>
      <span className={`v${empty ? " empty" : ""}`}>{empty ? "—" : v}</span>
    </div>
  );
}

export default function ProfileView() {
  const user = getCurrentUser();
  if (!user) redirect("/login?next=/account/profile");
  const p = getProfile();
  const sub = currentSubscription();
  const planLabel = sub ? `${(PLANS[sub.plan] || PLANS.standard).name}訂閱` : "免費帳號";

  const headline = [p.title, p.company].filter(Boolean).join(" · ") || "台創會會員";
  const heroMeta = [p.field, p.education].filter(Boolean).join(" · ");

  return (
    <div className="dash">
      <DashSidebar active="個人資料" name={p.name} planLabel={planLabel} />

      <main className="main">
        <div className="top">
          <h1>個人資料</h1>
          <div className="search">搜尋…</div>
          <span className="avatar-sq">{p.name?.[0] || "會"}</span>
        </div>

        {/* 名片式標頭 */}
        <div className="profile-hero">
          <div className="av"><Avatar size={72} /></div>
          <div className="grow">
            <div className="nm">{p.name}</div>
            <div className="role">{headline}</div>
            {heroMeta && <div className="meta">{heroMeta}</div>}
          </div>
          {p.isCompanyPerson && <span className="chip">公司人物</span>}
          <Link href="/account/settings" className="btn primary">編輯資料</Link>
        </div>

        {/* 基本資料 */}
        <div className="info-card">
          <h3>基本資料</h3>
          <div className="info-grid">
            <Row k="名字" v={p.name} />
            <Row k="生日" v={p.birthdate} />
            <Row k="性別" v={GENDER[p.gender]} />
            <Row k="電子郵件" v={p.email} />
            <Row k="手機號碼" v={p.phone} />
          </div>
        </div>

        {/* 公司與專業 */}
        <div className="info-card">
          <h3>公司與專業</h3>
          <div className="info-grid">
            <Row k="身分" v={p.isCompanyPerson ? "公司代表人物" : "一般會員"} />
            <Row k="公司行號" v={p.company} />
            <Row k="職位" v={p.title} />
            <Row k="專業領域" v={p.field} />
            <Row k="統一編號" v={p.taxId} />
            <Row k="公司／通訊地址" v={p.address} />
          </div>
        </div>

        {/* 學歷 */}
        <div className="info-card">
          <h3>學歷</h3>
          <div className="info-grid">
            <Row k="最高學歷" v={p.education} />
            <Row k="畢業學校" v={p.school} />
            <Row k="主修科系" v={p.major} />
          </div>
        </div>

        {/* 簡介 */}
        <div className="info-card">
          <h3>個人簡介</h3>
          <div className="info-grid">
            <Row k="" v={p.bio} full />
          </div>
        </div>

        <Link href="/account/settings" className="btn primary">編輯資料</Link>
      </main>
    </div>
  );
}
