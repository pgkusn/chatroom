## Why

本專案需要一個即時聊天室應用程式，讓使用者能夠在仿 LINE 風格的介面中傳送訊息。目前缺乏即時通訊功能，透過 Pusher 整合可快速實現低延遲的即時訊息推送。

## What Changes

- 新增 Node.js 後端伺服器，負責觸發 Pusher 事件並處理訊息 API
- 新增 Vue.js 前端應用程式，渲染仿 LINE 風格的聊天視窗
- 整合 pusher-js（前端）與 pusher（後端 SDK）實現即時雙向通訊
- 使用 `.env` 環境變數管理 Pusher 連線憑證（App ID、Key、Secret、Cluster）

## Capabilities

### New Capabilities
- `realtime-messaging`: 透過 Pusher channel 發送與接收即時文字訊息，支援多使用者廣播
- `chat-ui`: 仿 LINE 風格聊天介面，包含訊息氣泡、發送者名稱、時間戳記、輸入框與發送按鈕
- `message-api`: Node.js Express API 端點，接收訊息並透過 Pusher Server SDK 觸發事件

### Modified Capabilities
<!-- 無現有 spec 需修改 -->

## Impact

- **前端依賴**：Vue.js 3、pusher-js、vite（開發伺服器）
- **後端依賴**：Node.js、Express、pusher（Server SDK）、dotenv、cors
- **環境變數**：VITE_PUSHER_APP_ID、VITE_PUSHER_KEY、VITE_PUSHER_SECRET、VITE_PUSHER_CLUSTER
- **專案結構**：新增 `frontend/`（Vue 應用程式）與 `backend/`（Express API 伺服器）兩個子目錄
