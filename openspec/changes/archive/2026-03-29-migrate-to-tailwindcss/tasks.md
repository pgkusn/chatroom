## 1. 安裝 Tailwind CSS

- [x] 1.1 在 `frontend/` 目錄安裝依賴：`npm install -D tailwindcss @tailwindcss/vite`
- [x] 1.2 驗證 `package.json` devDependencies 已包含 `tailwindcss` 與 `@tailwindcss/vite`

## 2. 設定 Vite Plugin

- [x] 2.1 開啟 `frontend/vite.config.js`，加入 `import tailwindcss from '@tailwindcss/vite'`
- [x] 2.2 在 `plugins` 陣列中加入 `tailwindcss()`（放在 `vue()` 之前或之後皆可）

## 3. 更新 style.css

- [x] 3.1 清空 `frontend/src/style.css` 所有內容，替換為單行：`@import "tailwindcss";`

## 4. 改寫 App.vue 模板 class

- [x] 4.1 移除 `App.vue` 中所有 `<style scoped>` 區塊
- [x] 4.2 移除 `App.vue` 中全域 `<style>` 區塊（`* { box-sizing... }` 與 `body { background... }`，body 背景色改用 Tailwind `bg-[#e0e0e0]` 加在 `<div class="chat-app">` 的父元素或直接由 `chat-app` 容器覆蓋）
- [x] 4.3 將 `.chat-app` 的 class 改為：`flex flex-col h-screen bg-[#f0f0f0] max-w-[480px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.15)]`
- [x] 4.4 將 `.chat-header` 的 class 改為：`bg-[#00b900] px-4 py-3 flex items-center justify-between shadow-[0_2px_4px_rgba(0,0,0,0.2)] shrink-0`
- [x] 4.5 將 `.chat-title` 的 class 改為：`text-white text-lg font-bold tracking-wide`
- [x] 4.6 將 `.username-area` 的 class 改為：`flex items-center gap-1.5`
- [x] 4.7 將 `.username-label` 的 class 改為：`text-white/90 text-[13px]`
- [x] 4.8 將 `.username-input` 的 class 改為：`bg-white/25 border border-white/50 rounded text-white text-[13px] px-2 py-0.5 w-[90px] outline-none placeholder:text-white/70`
- [x] 4.9 將 `.message-list` 的 class 改為：`flex-1 overflow-y-auto px-3 pt-3 pb-2 flex flex-col gap-2`
- [x] 4.10 將 `.message-row` 的動態 class 改為：自己訊息用 `flex flex-col items-end`，他人訊息用 `flex flex-col items-start`（用 `:class` 條件綁定）
- [x] 4.11 將 `.sender-name` 的 class 改為：`text-[12px] text-[#666] mb-0.5 ml-1`
- [x] 4.12 將 `.bubble-row` 的動態 class 改為：自己訊息用 `flex items-end gap-1.5 flex-row-reverse`，他人訊息用 `flex items-end gap-1.5`（用 `:class` 條件綁定）
- [x] 4.13 將 `.bubble` 的動態 class 改為：
  - 自己：`max-w-[220px] px-[13px] py-[9px] rounded-[18px] rounded-br text-sm leading-[1.45] break-words shadow-sm bg-[#4cd964] text-black`
  - 他人：`max-w-[220px] px-[13px] py-[9px] rounded-[18px] rounded-bl text-sm leading-[1.45] break-words shadow-sm bg-white text-black`
- [x] 4.14 將 `.timestamp` 的 class 改為：`text-[10px] text-[#999] whitespace-nowrap mb-0.5`
- [x] 4.15 將 `.input-area` 的 class 改為：`bg-white border-t border-[#ddd] px-2.5 py-2 flex gap-2 items-center shrink-0`
- [x] 4.16 將 `.message-input` 的 class 改為：`flex-1 border border-[#ddd] rounded-full px-4 py-2 text-sm outline-none bg-[#f8f8f8] focus:border-[#00b900] focus:bg-white`
- [x] 4.17 將 `.send-button` 的 class 改為：`bg-[#00b900] text-white border-none rounded-full px-[18px] py-2 text-sm font-bold cursor-pointer shrink-0 hover:bg-[#009900] active:bg-[#007700] transition-colors duration-150`

## 5. 驗證

- [x] 5.1 啟動前端開發伺服器（`cd frontend && npm run dev`），確認無 compile error（手動驗證）
- [x] 5.2 瀏覽器開啟 `http://localhost:5173`，確認 header 顯示綠色（`#00b900`）背景（手動驗證）
- [x] 5.3 發送訊息，確認自己的氣泡靠右、綠色（`#4cd964`）；他人氣泡靠左、白色（手動驗證）
- [x] 5.4 確認輸入框圓角樣式與發送按鈕顯示正確（手動驗證）
- [x] 5.5 執行 `cd frontend && npm run build`，確認 production build 無錯誤（手動驗證）
