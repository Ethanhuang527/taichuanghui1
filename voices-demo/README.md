# VOICES / 台創會 · 人物專訪訂閱站 Demo

照設計初稿做的高擬真 demo，**會員鑑權真的會動**：非會員只看前段＋付費牆，登入訂閱後解鎖全文與專訪影片。

## 執行

```bash
npm install
npm run dev
```

打開 http://localhost:3000

## 體驗動線
1. **首頁**：hero、精選人物、語錄帶、每週人物來信訂閱。
2. 點任一人物 → **專訪內文頁**：只看到前段，後段是**付費牆**。
3. 右上「開始探索」→ **方案頁** → 訂閱（示範任何 Email 先登入）。
4. 進 **訂閱成功頁** → **帳號總覽**（訂閱狀態：有效）。
5. 回人物頁 → 全文與**專訪影片**解鎖。

## 頁面
- `/` 首頁 · `/people` 人物列表 · `/p/[id]` 專訪內文頁
- `/login` 登入 · `/pricing` 方案 · `/subscribe/success` 訂閱成功 · `/account` 帳號總覽

## 改成正式版 / 換內容
| 想做的事 | 改哪裡 |
|---|---|
| 改品牌名（VOICES → 台創會）、定價 | `lib/site.js` |
| 換人物、文章、語錄 | `lib/db.js` |
| 會員判別規則 | `lib/access.js` |
| 影片簽章（接 Bunny Stream） | `lib/bunny.js`（含正式版範本） |
| 換真登入（Supabase Auth） | `lib/auth.js`、`app/api/login` |
| 訂閱接綠界定期定額 | `app/api/subscribe` + 新增 webhook |
| 品牌色 | `app/globals.css` 的 `--green` 等變數 |

## ⚠️ 示範限制
記憶體資料，重啟會重置；登入不驗證密碼；影片為公開範例、token 為示範。以上正式版都要替換（檔案內皆有註解標示）。所有文案、人物、定價、品牌名皆為**佔位，可隨時替換**。
