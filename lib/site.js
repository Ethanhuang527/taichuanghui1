// ── 品牌設定（要改名就改這裡一行）──
export const SITE = {
  brand: "台創會",            // 原 VOICES，已改為台創會
  tagline: "每週三，一位值得認識的人",
  social: "已有 28,000+ 位經理人與創業者訂閱",
};

// 方案（4 階梯，對照設計稿；價格為月費）
export const PLANS = {
  trial:    { key: "trial",    name: "體驗", price: 90,  unit: "月", cycle: "每月自動續訂",
              feats: ["標準畫質 SD", "1 台裝置觀看", "精選人物專訪"] },
  basic:    { key: "basic",    name: "基本", price: 290, unit: "月", cycle: "每月自動續訂",
              feats: ["高畫質 HD", "2 台裝置觀看", "完整專訪 ＋ 語錄"] },
  standard: { key: "standard", name: "標準", price: 390, unit: "月", cycle: "每月自動續訂", best: true,
              feats: ["超高畫質 4K", "4 台裝置觀看", "完整 ＋ 獨家 ＋ 離線下載"] },
  premium:  { key: "premium",  name: "尊榮", price: 590, unit: "月", cycle: "每月自動續訂",
              feats: ["4K ＋ HDR 影音", "6 台裝置觀看", "全部 ＋ 搶先看 ＋ 線下活動"] },
};
export const PLAN_ORDER = ["trial", "basic", "standard", "premium"];
