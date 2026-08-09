"use client";
// 打開專訪頁時記錄一次閱讀（不影響畫面）。
import { useEffect } from "react";

export default function TrackRead({ personId }) {
  useEffect(() => {
    fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: personId }),
    }).catch(() => {});
  }, [personId]);
  return null;
}
