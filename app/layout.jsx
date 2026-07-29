import "./globals.css";
import { SITE } from "@/lib/site";

export const metadata = {
  title: `${SITE.brand} · 人物專訪訂閱`,
  description: "每週一位頂尖創辦人與經營者，親述關鍵決策、失敗與信念。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
