"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {});
    setDone(true);
  };
  if (done) return <p className="ok">已收到！每週三的人物來信會寄到 {email}。</p>;
  return (
    <form onSubmit={submit}>
      <input
        type="email" required placeholder="you@company.com"
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn primary" type="submit">訂閱 · 每週人物來信</button>
    </form>
  );
}
