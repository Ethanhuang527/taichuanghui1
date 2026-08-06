import Link from "next/link";
import { Silhouette } from "./Avatar";

export default function VideoThumb({ person }) {
  return (
    <Link href={`/p/${person.id}`} className="vthumb">
      <div className="frame">
        <div className="sil"><Silhouette /></div>
        <div className="play">
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </div>
        <div className="dur">{person.duration}</div>
      </div>
      <div className="nm">{person.name}</div>
      <div className="co">{person.company}</div>
    </Link>
  );
}
