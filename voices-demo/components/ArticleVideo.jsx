"use client";
// 內嵌專訪影片：向後端 /api/play 要簽章網址（僅會員可取得）。
import { useEffect, useState } from "react";

export default function ArticleVideo({ personId }) {
  const [url, setUrl] = useState(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    fetch("/api/play", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ personId }),
    })
      .then(async (r) => {
        const d = await r.json();
        if (r.ok) setUrl(d.url); else setErr(true);
      })
      .catch(() => setErr(true));
  }, [personId]);

  if (err) return null;
  return (
    <div className="vwrap">
      {url ? <video src={url} controls playsInline /> : null}
    </div>
  );
}
