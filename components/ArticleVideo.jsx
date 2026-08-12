"use client";
// 內嵌專訪影片：向後端 /api/play 要 YouTube 影片 ID（僅會員可取得），
// 用 youtube-nocookie 內嵌播放，留在本站、不跳去 YouTube。
import { useEffect, useState } from "react";

export default function ArticleVideo({ personId }) {
  const [yt, setYt] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch("/api/play", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ personId }),
    })
      .then(async (r) => {
        const d = await r.json();
        if (r.ok && d.youtubeId) setYt(d.youtubeId);
        else setErr(true);
      })
      .catch(() => setErr(true));
  }, [personId]);

  if (err) return null;
  return (
    <div className="vwrap">
      {yt ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yt}?rel=0&modestbranding=1&playsinline=1&color=white&iv_load_policy=3`}
          title="專訪影片"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : null}
    </div>
  );
}
