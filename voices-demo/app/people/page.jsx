import { SITE } from "@/lib/site";
import { db } from "@/lib/db";
import SiteHeader from "@/components/SiteHeader";
import PersonCard from "@/components/PersonCard";

export default function People() {
  return (
    <>
      <SiteHeader />
      <section className="section">
        <div className="container">
          <div className="eyebrow">全部人物</div>
          <h2 style={{ fontSize: 30, margin: "6px 0 24px" }}>人物列表</h2>
          <div className="grid4">
            {db.people.map((p) => <PersonCard key={p.id} person={p} />)}
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container in">
          <div className="brand"><span className="dot" />{SITE.brand}</div>
          <div>© 2026 {SITE.brand}</div>
        </div>
      </footer>
    </>
  );
}
