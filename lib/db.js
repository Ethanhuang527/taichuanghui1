// ── 示範用記憶體資料庫（正式換 Supabase）。內容皆為佔位，可隨時替換。──
const SAMPLE_VIDEO = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_VIDEO2 = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export const db = globalThis.__VOICES_DB__ || (globalThis.__VOICES_DB__ = {
  users: [{ id: "u_demo", email: "demo@voices.tw", name: "沈方磊" }],

  // demo 帳號預設「未訂閱」，方便體驗付費牆。到方案頁訂閱後即成為會員。
  subscriptions: [],

  newsletter: [], // 電子報 email 收集（示範）

  // 追蹤/已讀（示範靜態數字用）
  stats: { readThisMonth: 18, following: 24 },

  people: [
    {
      id: "shen",
      name: "沈方磊",
      company: "青嶼永續能源集團",
      role: "創辦人暨執行長",
      category: "本週人物",
      featured: true,
      tagline: "真正的領導，不是消除不確定，而是把它變成別人願意跟隨的方向。",
      hook: "在所有人都說不可能的那年，他決定把公司押在一條沒人走過的路上。",
      readMinutes: 18,
      duration: "18:20",
      updated: "本週更新", isNew: false,
      publishedAt: "2026/07/29",
      hasVideo: true,
      previewYoutubeId: "aqz-KE-bpKQ", // ← 免費預告（設為「公開」，人人可看）
      youtubeId: "aqz-KE-bpKQ",   // ← 完整專訪（設為「不公開 unlisted」，僅會員）
      bunnyGuid: "guid-shen",
      videoSrc: SAMPLE_VIDEO,
      videoPoster: "",
      excerpt:
        "沈方磊記得那通電話。投資人只用了三分鐘，就否決了他準備半年的計畫。掛上電話，他沒有回辦公室，而是走到頂樓，看著遠方的風機一圈一圈轉。「那一刻我才想清楚，我要的不是被誰認同，是把事情做成。」",
      body: [
        "回到公司，他做的第一件事不是修改簡報，而是把整個團隊叫進會議室，坦白告訴他們壞消息。「我以為大家會慌，結果他們問我：那我們接下來要怎麼贏？」那是他第一次意識到，領導不是把不確定藏起來，而是把它攤開，變成一個大家願意一起解的題目。",
        "接下來的十八個月，青嶼把重心從追逐補助，轉向自建維運團隊。這個決定短期讓財報難看，卻在第三年換來穩定的現金流與客戶信任。「便宜的成長會反噬你，慢一點但站得穩的，才是你的。」",
        "如今回頭看，他說最關鍵的不是那次被拒絕，而是被拒絕後的那個星期——他決定不再向不理解的人證明自己，而是把力氣花在真正相信這件事的人身上。",
      ],
      quotes: [
        "便宜的成長會反噬你，慢一點但站得穩的，才是你的。",
      ],
    },
    {
      id: "ho",
      name: "何若嵐",
      company: "云織科技",
      role: "共同創辦人",
      category: "創辦人",
      tagline: "被拒絕的那天，我把它寫成了公司的第一條文化守則。",
      hook: "她把一次被拒絕的融資，寫成公司第一條文化守則。",
      readMinutes: 9,
      duration: "09:12",
      updated: "2 天前更新", isNew: true,
      publishedAt: "2026/07/22",
      hasVideo: true,
      previewYoutubeId: "aqz-KE-bpKQ", // ← 免費預告（設為「公開」）
      youtubeId: "aqz-KE-bpKQ",   // ← 完整專訪（設為「不公開 unlisted」，僅會員）
      bunnyGuid: "guid-ho",
      videoSrc: SAMPLE_VIDEO2,
      excerpt:
        "第七次募資失敗那晚，何若嵐沒有難過太久。她打開筆記本，寫下一句話：「如果連我們自己都說服不了，那產品一定還不夠好。」這句話後來被印在公司牆上。",
      body: [
        "她把每一次被拒絕都當成一次使用者訪談。「投資人其實是最挑剔的使用者，他們願意花時間告訴你哪裡不對，是免費的。」云織把這些回饋整理成產品路線圖，半年後拿到了第一張大單。",
        "何若嵐說，創業最難的不是撐過失敗，而是在失敗裡保持誠實——對團隊、對客戶、也對自己。",
      ],
      quotes: ["如果連我們自己都說服不了，那產品一定還不夠好。"],
    },
    {
      id: "chen",
      name: "陳柏睿",
      company: "恆山製造",
      role: "董事長",
      category: "接班",
      tagline: "接手父親的老工廠，我先把辦公室搬到產線旁。",
      hook: "接手父親的老工廠，他先把辦公室搬到產線旁。",
      readMinutes: 11,
      duration: "14:05",
      updated: "5 天前更新", isNew: true,
      publishedAt: "2026/07/15",
      hasVideo: false,
      excerpt:
        "回家接班的第一週，陳柏睿做了一件讓所有主管意外的事：他把董事長辦公室從三樓搬到了一樓產線旁邊的鐵皮隔間。「我爸留給我的不是工廠，是那些做了三十年的老師傅。」",
      body: [
        "他花了整整一年，什麼都不改，只是每天站在產線旁看、問、記。老師傅們從防備到願意教他，中間隔著的是信任。「你要先讓人相信你不是來拆掉這裡的，他們才會告訴你哪裡真的該修。」",
        "第二年，他才開始導入數位化，而且每一步都找最資深的師傅一起決定。恆山的良率在三年內提升了兩成，離職率卻降到歷史新低。",
      ],
      quotes: ["我爸留給我的不是工廠，是那些做了三十年的老師傅。"],
    },
    {
      id: "lin",
      name: "林澄",
      company: "小徑生活",
      role: "主理人",
      category: "品牌",
      tagline: "從市場擺攤到百店品牌，我堅持親自面試每一位店長。",
      hook: "從市場擺攤到百店品牌，她堅持親自面試每位店長。",
      readMinutes: 8,
      duration: "11:38",
      updated: "1 週前更新", isNew: true,
      publishedAt: "2026/07/08",
      hasVideo: false,
      excerpt:
        "小徑生活開到第一百家店那天，林澄還是坐在面試桌的另一頭。有人勸她該放手了，她說：「店可以複製，但站在店裡的那個人不能。」",
      body: [
        "她相信品牌不是 logo，而是每一次顧客走進店裡遇到的那個人。所以她把最多的時間花在選人與訓練上，而不是展店速度。",
        "「慢，是我唯一的護城河。」林澄說，當別人用加盟衝規模時，她寧可少開幾家，也要每一家都像第一家。",
      ],
      quotes: ["店可以複製，但站在店裡的那個人不能。"],
    },
    {
      id: "kao",
      name: "高子謙",
      company: "遠見資本",
      role: "合夥人",
      category: "投資",
      tagline: "我投的不是商業模式，是那個人在最壞情況下的選擇。",
      hook: "看過上千份簡報，他說最終決定投資的，往往是一個問題的答案。",
      readMinutes: 10,
      duration: "07:45",
      updated: "2 週前更新", isNew: false,
      publishedAt: "2026/07/01",
      hasVideo: false,
      excerpt:
        "高子謙的第一個問題永遠一樣：「如果這件事失敗了，你會後悔嗎？」他說創業者的答案，比任何財務模型都誠實。",
      body: [
        "他看重的不是聰明，而是誠實與韌性。「聰明的人到處都是，但願意在最壞的時候還說真話的人很少。」",
        "遠見資本這幾年最成功的幾筆投資，共同點都不是最亮眼的簡報，而是那些在低谷時依然清醒的創辦人。",
      ],
      quotes: ["聰明的人到處都是，但願意在最壞的時候還說真話的人很少。"],
    },
    {
      id: "wu",
      name: "吳念真",
      company: "南方書店",
      role: "創辦人",
      category: "品牌",
      tagline: "一間書店能不能活，看的不是賣幾本書，是留住幾個人。",
      hook: "在最不被看好的小鎮開書店，他把它變成整條街的客廳。",
      readMinutes: 13,
      duration: "16:20",
      updated: "3 週前更新", isNew: false,
      publishedAt: "2026/06/24",
      hasVideo: false,
      excerpt:
        "所有人都說小鎮開書店會倒，吳念真偏偏選了最安靜的那條街。他說：「我不是要賣書，我是想留一個大家願意坐下來的地方。」",
      body: [
        "他把書店一半的空間讓給講座、修理鋪、和一張大長桌。營收慢，但人心留住了，第三年開始有人專程搭車來。",
        "「一間店的價值，不在坪效，在它讓多少人覺得這個地方值得留下來。」",
      ],
      quotes: ["一間店能不能活，看的不是賣幾本書，是留住幾個人。"],
    },
  ],
});

export const getPerson = (id) => db.people.find((p) => p.id === id);
export const featured = () => db.people.find((p) => p.featured) || db.people[0];
export const getUser = (id) => db.users.find((u) => u.id === id);
export const getSubscription = (uid) => db.subscriptions.find((s) => s.userId === uid);
