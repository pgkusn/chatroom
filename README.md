# Chatroom

仿 LINE 風格的即時聊天室，使用 Pusher 實現即時訊息推送。

## 技術棧

| 層級     | 技術                                                      |
| -------- | --------------------------------------------------------- |
| 前端     | Vue.js 3 (Composition API)、Vite、Tailwind CSS、pusher-js |
| 後端     | Node.js、Express、pusher (Server SDK)                     |
| 即時通訊 | Pusher Channels                                           |

## 專案結構

```
chatroom/
├── .env                  # Pusher 憑證（不提交至版本控制）
├── backend/
│   ├── server.js         # Express API 伺服器（port 4000）
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.vue       # 主要聊天室元件
    │   ├── pusher.js     # Pusher 前端初始化
    │   └── main.js
    └── vite.config.js
```

## 環境設定

在根目錄建立 `.env`：

```env
VITE_PUSHER_APP_ID=your_app_id
VITE_PUSHER_KEY=your_key
VITE_PUSHER_SECRET=your_secret
VITE_PUSHER_CLUSTER=your_cluster
```

> 前端透過 `VITE_` 前綴讀取；後端透過 dotenv 讀取所有變數。

## 啟動方式

**Terminal 1 — 後端：**

```bash
node backend/server.js
```

**Terminal 2 — 前端：**

```bash
cd frontend
npm run dev
```

瀏覽器開啟 `http://localhost:5173`（若被佔用則為 5174）。

## 功能

- 即時訊息廣播（Pusher `chat-room` channel）
- 仿 LINE 訊息氣泡（自己靠右綠色、他人靠左白色）
- 顯示發送者名稱與時間戳記（HH:mm）
- 多使用者同時在線（開多個視窗即可）
- Enter 鍵或點擊發送按鈕送出訊息
- 新訊息自動捲動至底部

## API

### `POST /api/messages`

觸發 Pusher 事件，廣播訊息至所有連線用戶端。

**Request body：**

```json
{
  "username": "Alice",
  "message": "Hello!",
  "timestamp": "14:30"
}
```

**Response：**

- `200 OK` — `{ "status": "ok" }`
- `400 Bad Request` — `{ "error": "username and message are required" }`
