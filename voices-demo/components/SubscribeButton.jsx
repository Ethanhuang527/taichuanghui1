"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubscribeButton({ plan, loggedIn, label, cls = "btn primary block" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const go = async () => {
    if (!loggedIn) { router.push(`/login?next=/pricing`); return; }
    setLoading(true);
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    setLoading(false);
    if (res.ok) router.push("/subscribe/success");
  };
  return (
    <button className={cls} onClick={go} disabled={loading}>
      {loading ? "處理中…" : label}
    </button>
  );
}
