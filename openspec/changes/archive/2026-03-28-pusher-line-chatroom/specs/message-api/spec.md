## ADDED Requirements

### Requirement: POST /api/messages 接收並廣播訊息
後端 SHALL 提供 `POST /api/messages` 端點，接收 JSON 格式的訊息資料，驗證後透過 Pusher Server SDK 觸發 `chat-room` channel 的 `new-message` 事件。

#### Scenario: 成功發送訊息
- **WHEN** 前端 POST `{ "username": "Alice", "message": "Hello", "timestamp": "14:30" }` 至 `/api/messages`
- **THEN** 後端 SHALL 呼叫 Pusher trigger，回傳 HTTP 200 與 `{ "status": "ok" }`

#### Scenario: 缺少必要欄位
- **WHEN** 請求 body 缺少 `message` 或 `username` 欄位
- **THEN** 後端 SHALL 回傳 HTTP 400 與錯誤訊息，不觸發 Pusher 事件

### Requirement: 使用 .env 憑證初始化 Pusher Server SDK
後端 SHALL 使用 `PUSHER_APP_ID`、`VITE_PUSHER_KEY`、`VITE_PUSHER_SECRET`、`VITE_PUSHER_CLUSTER` 環境變數初始化 Pusher 實例。

#### Scenario: 環境變數正確載入
- **WHEN** 後端伺服器啟動
- **THEN** 系統 SHALL 透過 dotenv 從根目錄 `.env` 讀取所有 Pusher 憑證，若缺少任一必要變數 SHALL 拋出錯誤並終止啟動

### Requirement: CORS 允許前端跨域請求
後端 SHALL 設定 CORS，允許來自 `http://localhost:5173`（Vite dev server）的請求。

#### Scenario: 前端呼叫後端 API
- **WHEN** 瀏覽器從 `http://localhost:5173` 發出請求至 `http://localhost:3000/api/messages`
- **THEN** 後端 SHALL 正確回應 CORS headers，瀏覽器不得收到 CORS 錯誤
