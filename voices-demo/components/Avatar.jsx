// 綠色剪影頭像佔位（之後換成真實照片）。size 可調。
export default function Avatar({ size = 40, ring = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ borderRadius: "50%", display: "block", flex: "none" }} aria-hidden="true">
      <defs>
        <linearGradient id={`g${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f9a83" />
          <stop offset="1" stopColor="#0e4034" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#g${size})`} />
      <circle cx="50" cy="40" r="17" fill="rgba(255,255,255,.30)" />
      <path d="M20 84c0-17 13-27 30-27s30 10 30 27z" fill="rgba(255,255,255,.30)" />
      {ring && <rect x="1.5" y="1.5" width="97" height="97" rx="48.5" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="3" />}
    </svg>
  );
}

// 大張人物剪影（卡片/文章用）
export function Silhouette() {
  return (
    <svg viewBox="0 0 200 210" width="70%" height="70%" aria-hidden="true" style={{ opacity: .32 }}>
      <circle cx="100" cy="72" r="40" fill="#eafffb" />
      <path d="M28 200c0-42 32-64 72-64s72 22 72 64z" fill="#eafffb" />
    </svg>
  );
}
