import Link from "next/link";
import { Silhouette } from "./Avatar";

export default function PersonCard({ person, big = false }) {
  return (
    <Link href={`/p/${person.id}`}>
      <div className={`pcard${big ? " big" : ""}`}>
        <span className="tag">{person.category}</span>
        <div className="sil"><Silhouette /></div>
        <div className="meta">
          <div className="nm">{person.name}</div>
          <div className="cp">{person.company} · {person.role}</div>
        </div>
      </div>
    </Link>
  );
}
