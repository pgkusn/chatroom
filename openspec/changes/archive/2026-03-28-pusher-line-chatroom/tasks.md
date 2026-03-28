## 1. 後端初始化

- [x] 1.1 建立 `backend/` 目錄，執行 `npm init -y`
- [x] 1.2 安裝後端依賴：`npm install express pusher dotenv cors`
- [x] 1.3 建立 `backend/server.js`，用 dotenv 載入根目錄 `.env`（`require('dotenv').config({ path: '../.env' })`）
- [x] 1.4 驗證啟動時所有必要 Pusher 環境變數存在（VITE_PUSHER_APP_ID、VITE_PUSHER_KEY、VITE_PUSHER_SECRET、VITE_PUSHER_CLUSTER），缺少任一則拋出錯誤

## 2. 後端 Pusher 整合

- [x] 2.1 在 `server.js` 中初始化 Pusher Server SDK（使用 .env 中的四個憑證）
- [x] 2.2 設定 Express CORS 允許 `http://localhost:5173`
- [x] 2.3 設定 Express JSON body parser
- [x] 2.4 實作 `POST /api/messages` 路由，驗證 `username` 與 `message` 欄位
- [x] 2.5 路由成功時呼叫 `pusher.trigger('chat-room', 'new-message', payload)` 並回傳 200
- [x] 2.6 路由欄位缺失時回傳 400 錯誤

## 3. 前端初始化

- [x] 3.1 在 `frontend/` 目錄建立 Vite + Vue 3 專案（`npm create vite@latest . -- --template vue`）
- [x] 3.2 安裝前端依賴：`npm install pusher-js`
- [x] 3.3 清除 Vite 預設樣板內容（App.vue、style.css）

## 4. 前端 Pusher 整合

- [x] 4.1 在 `frontend/src/` 建立 `pusher.js`，初始化 Pusher 實例使用 `VITE_PUSHER_KEY` 與 `VITE_PUSHER_CLUSTER`
- [x] 4.2 在主元件（App.vue）的 `onMounted` 訂閱 `chat-room` channel 的 `new-message` 事件
- [x] 4.3 收到事件時將訊息 push 至 `messages` 陣列
- [x] 4.4 實作發送函式：POST 至 `http://localhost:3000/api/messages`，帶 username、message、timestamp
- [x] 4.5 發送前驗證訊息非空白，空白則不發送

## 5. 聊天室 UI 實作

- [x] 5.1 在 App.vue 建立頂部使用者名稱輸入區（預設值 "User"）
- [x] 5.2 建立訊息列表區域，使用 `v-for` 渲染 `messages` 陣列
- [x] 5.3 依據 `message.username === currentUser` 區分自己/他人訊息，套用不同樣式（右/左對齊、不同背景色）
- [x] 5.4 每則訊息顯示發送者名稱（他人訊息顯示，自己訊息可選擇隱藏）與時間（HH:mm）
- [x] 5.5 建立底部輸入區：文字輸入框 + 發送按鈕
- [x] 5.6 輸入框支援 Enter 鍵發送（`@keydown.enter.prevent`）
- [x] 5.7 發送後清空輸入框

## 6. 樣式（仿 LINE）

- [x] 6.1 聊天視窗整體背景使用 LINE 風格淺灰色（#f0f0f0）
- [x] 6.2 自己的訊息氣泡：綠色背景（#4CD964）、圓角、靠右
- [x] 6.3 他人訊息氣泡：白色背景、圓角、靠左，左側顯示發送者名稱
- [x] 6.4 訊息列表區域可捲動，使用 `ref` 實現新訊息自動捲動至底部（`scrollTop = scrollHeight`）
- [x] 6.5 頂部 header 樣式仿 LINE（深色背景、白色文字）
- [x] 6.6 底部輸入區固定於視窗底部

## 7. 驗證

- [x] 7.1 啟動後端（`node backend/server.js`），確認 port 4000 正常
- [x] 7.2 啟動前端（`cd frontend && npm run dev`），確認 port 5173 正常
- [x] 7.3 開兩個瀏覽器視窗，確認訊息可即時互相接收（手動驗證）
- [x] 7.4 測試空白訊息不發送（手動驗證）
- [x] 7.5 測試新訊息到達時自動捲動至底部（手動驗證）
