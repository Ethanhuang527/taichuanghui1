import Link from "next/link";
import { SITE } from "@/lib/site";
import Avatar from "./Avatar";

const NAV = [
  ["總覽", "/account"],
  ["我的訂閱", "/account"],
  ["追蹤的人物", "/account"],
  ["閱讀紀錄", "/account"],
  ["帳號設定", "/account/settings"],
  ["帳單與付款", "/account"],
];

export default function DashSidebar({ active, name, planLabel }) {
  return (
    <aside className="side">
      <div className="brand"><span className="dot" />{SITE.brand}</div>
      <nav className="nav">
        {NAV.map(([label, href]) => (
          <Link key={label} href={href} className={active === label ? "active" : ""}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "currentColor", display: "inline-block", opacity: .8 }} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="me">
        <Avatar size={36} ring />
        <div>
          <div className="nm">{name}</div>
          <div className="pl">{planLabel}</div>
        </div>
      </div>
    </aside>
  );
}
