# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 啟動指令

```bash
# 後端（從根目錄執行）
node backend/server.js          # port 4000

# 前端
cd frontend && npm run dev      # port 5173（被佔用時自動遞增）
cd frontend && npm run build    # 生產建構
```

## 架構

前後端完全分離，透過 Pusher Channels 實現即時通訊：

```
瀏覽器 → POST /api/messages → backend/server.js → Pusher Server SDK
                                                        ↓
瀏覽器 ←── pusher-js subscribe ←── Pusher 廣播 ←──────┘
```

- **後端**（`backend/server.js`）：單一檔案 Express app，只有一個路由 `POST /api/messages`。收到訊息後呼叫 `pusher.trigger('chat-room', 'new-message', payload)`。
- **前端**（`frontend/src/App.vue`）：單一 Vue 3 SFC，`onMounted` 訂閱 Pusher channel，`sendMessage()` POST 至後端。`frontend/src/pusher.js` 導出已初始化的 Pusher 實例。

## 環境變數

`.env` 放在**根目錄**，所有變數使用 `VITE_` 前綴：

```
VITE_PUSHER_APP_ID=...
VITE_PUSHER_KEY=...
VITE_PUSHER_SECRET=...
VITE_PUSHER_CLUSTER=...
```

- 後端：`require('dotenv').config({ path: path.join(__dirname, '../.env') })`（相對於 `backend/` 目錄）
- 前端：`vite.config.js` 設定 `envDir: '../'`，Vite 自動暴露 `VITE_` 前綴變數

## 注意事項

- Port 3000/3001/8080 可能被 Docker 佔用，後端固定使用 **port 4000**
- 訊息不持久化（無資料庫），重整後歷史消失
- CORS 設定允許所有 `localhost` 端口（`/^http:\/\/localhost:\d+$/`）
