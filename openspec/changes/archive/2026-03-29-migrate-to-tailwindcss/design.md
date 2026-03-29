## Context

前端現有樣式全部集中在 `App.vue` 的 `<style scoped>` 區塊（共約 180 行），採用語義化 class 名稱實作仿 LINE 聊天室 UI。本次遷移目標是以 Tailwind CSS v4 + Vite plugin 取代所有自訂 CSS，外觀維持不變。

## Goals / Non-Goals

**Goals:**
- 安裝並整合 Tailwind CSS v4（`@tailwindcss/vite` plugin 方案）
- App.vue 模板中所有 class 改為 Tailwind utility classes
- 移除 `<style scoped>` 與 `<style>` 區塊（body reset 改用 Tailwind）
- 保持仿 LINE 外觀：綠色 header `#00b900`、自己氣泡 `#4cd964`、他人氣泡白色

**Non-Goals:**
- 重新設計 UI 或改變視覺風格
- 拆分元件（仍維持單一 App.vue）
- 引入 Tailwind 設計系統（Design Tokens / Config）以外的額外工具

## Decisions

### 1. Tailwind CSS v4 + @tailwindcss/vite（非 PostCSS 方案）
- **決定**：使用 `@tailwindcss/vite` plugin，在 `vite.config.js` 中加入 `tailwindcss()` plugin，並在 `style.css` 以 `@import "tailwindcss"` 載入
- **理由**：Tailwind v4 官方推薦的 Vite 整合方式，不需要 `tailwind.config.js` 或 PostCSS 設定檔，設定最精簡
- **替代方案**：PostCSS 方案 → 需額外設定檔，v4 已不推薦

### 2. 任意值（Arbitrary Values）處理品牌色
- **決定**：使用 Tailwind 任意值語法（`bg-[#00b900]`、`bg-[#4cd964]`）保留精確的 LINE 品牌色，不修改預設色盤
- **理由**：遷移目的是替換實作方式，不是調整視覺設計；任意值讓顏色一對一對應原始 CSS
- **替代方案**：在 CSS 中用 `@theme` 定義自訂色票 → 額外複雜度，MVP 不需要

### 3. 保留 style.css，僅改內容
- **決定**：保留 `frontend/src/style.css`，將原有 reset 樣式移除，改為單行 `@import "tailwindcss"`
- **理由**：`main.js` 已 import 此檔，最小化改動範圍
- **替代方案**：刪除 style.css 並在 main.js 直接 import tailwindcss → 需改 main.js，多一個改動點

### 4. 不引入 tailwind.config.js
- **決定**：Tailwind v4 預設自動掃描所有模板檔，不需要 `content` 設定，故不建立 config 檔
- **理由**：減少設定負擔；v4 零設定即可運作

## Class 對應表

| 原 class | Tailwind 等效 |
|---|---|
| `.chat-app` | `flex flex-col h-screen bg-[#f0f0f0] max-w-[480px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.15)] font-sans` |
| `.chat-header` | `bg-[#00b900] px-4 py-3 flex items-center justify-between shadow-[0_2px_4px_rgba(0,0,0,0.2)] shrink-0` |
| `.chat-title` | `text-white text-lg font-bold tracking-wide` |
| `.username-area` | `flex items-center gap-1.5` |
| `.username-label` | `text-white/90 text-[13px]` |
| `.username-input` | `bg-white/25 border border-white/50 rounded text-white text-[13px] px-2 py-0.5 w-[90px] outline-none placeholder:text-white/70` |
| `.message-list` | `flex-1 overflow-y-auto px-3 pt-3 pb-2 flex flex-col gap-2` |
| `.message-row.self` | `flex flex-col items-end` |
| `.message-row.other` | `flex flex-col items-start` |
| `.sender-name` | `text-[12px] text-[#666] mb-0.5 ml-1` |
| `.bubble-row.self` | `flex items-end gap-1.5 flex-row-reverse` |
| `.bubble-row.other` | `flex items-end gap-1.5` |
| `.bubble-self` | `max-w-[220px] px-[13px] py-[9px] rounded-[18px] rounded-br text-sm leading-[1.45] break-words shadow-sm bg-[#4cd964] text-black` |
| `.bubble-other` | `max-w-[220px] px-[13px] py-[9px] rounded-[18px] rounded-bl text-sm leading-[1.45] break-words shadow-sm bg-white text-black` |
| `.timestamp` | `text-[10px] text-[#999] whitespace-nowrap mb-0.5` |
| `.input-area` | `bg-white border-t border-[#ddd] px-2.5 py-2 flex gap-2 items-center shrink-0` |
| `.message-input` | `flex-1 border border-[#ddd] rounded-full px-4 py-2 text-sm outline-none bg-[#f8f8f8] focus:border-[#00b900] focus:bg-white` |
| `.send-button` | `bg-[#00b900] text-white border-none rounded-full px-[18px] py-2 text-sm font-bold cursor-pointer shrink-0 hover:bg-[#009900] active:bg-[#007700] transition-colors duration-150` |

## Risks / Trade-offs

- **任意值增加模板冗長度**：Tailwind 任意值語法使模板較長，但換來移除 CSS 區塊；可接受
- **圓角細節**：原 `.bubble-self` 使用 `border-bottom-right-radius: 4px`（僅右下角縮小），Tailwind 用 `rounded-[18px] rounded-br` 近似（`rounded-br` = `border-radius: 0.25rem`，即 4px）需驗證效果
- **box-shadow 細節**：部分 shadow 需用 arbitrary value，確保與原設計一致
