## Context

本專案從零開始建立一個即時聊天室應用程式。技術棧選擇以 .env 中已備妥的 Pusher 憑證為基礎，前端採用 Vue.js 3、後端採用 Node.js Express。Pusher 作為 managed WebSocket 服務，省去自建 WebSocket 伺服器的複雜度。

## Goals / Non-Goals

**Goals:**
- 建立可運行的聊天室 MVP，前後端分離
- 仿 LINE 風格 UI（訊息氣泡、自己/他人訊息區分、時間戳記）
- 透過 Pusher channels 實現即時訊息廣播
- 所有 Pusher 憑證從 `.env` 讀取，不 hardcode

**Non-Goals:**
- 使用者身份驗證 / 帳號系統
- 訊息持久化儲存（不使用資料庫）
- 私訊 / 多房間功能
- 訊息已讀回條

## Decisions

### 1. 前後端分離架構
- **決定**：`frontend/`（Vite + Vue 3）與 `backend/`（Express）各自獨立運行
- **理由**：前端使用 Vite dev server（port 5173），後端 Express（port 3000），CORS 設定允許前端呼叫後端 API
- **替代方案**：SSR 整合 → 複雜度過高，MVP 不需要

### 2. Pusher 使用方式：後端觸發事件
- **決定**：前端透過 HTTP POST 呼叫後端 `/api/messages`，後端用 Pusher Server SDK 觸發 channel 事件；前端同時訂閱同一 channel 接收廣播
- **理由**：後端觸發可避免前端直接持有 Pusher Secret，符合安全最佳實踐
- **替代方案**：前端直接呼叫 Pusher REST API → 需要暴露 Secret，不安全

### 3. Vue 3 Composition API
- **決定**：使用 `<script setup>` + Composition API
- **理由**：現代寫法，程式碼更簡潔，與 Vite 整合佳
- **替代方案**：Options API → 較冗長

### 4. 環境變數命名
- **決定**：前端使用 `VITE_` 前綴（VITE_PUSHER_KEY 等），後端使用同名但不含 VITE_ 前綴（PUSHER_APP_ID 等）或直接使用同一個 .env 檔
- **理由**：Vite 只暴露 `VITE_` 前綴的變數給瀏覽器端；後端用 dotenv 可讀取所有變數
- **實作**：前後端共用根目錄的 `.env`，後端 dotenv 設定路徑指向根目錄

## Risks / Trade-offs

- **訊息無持久化** → 重新整理頁面後歷史訊息消失。緩解：MVP 接受此限制，未來可加 DB
- **CORS 設定** → 開發環境允許 localhost，需確保生產環境限縮來源
- **Pusher 免費方案限制** → 100 concurrent connections / 200k messages/day，開發測試足夠
- **使用者名稱無驗證** → 任何人可冒用他人名稱。緩解：MVP 接受，未來加 auth

## Migration Plan

1. 建立 `backend/` 目錄，初始化 npm，安裝依賴
2. 建立 `frontend/` 目錄，用 Vite 建立 Vue 3 專案，安裝依賴
3. 分別設定 `.env` 路徑讀取
4. 啟動後端（`node server.js`）與前端（`npm run dev`）驗證
5. 無需 rollback 策略（全新專案）
