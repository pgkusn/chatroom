## Why

目前前端所有樣式以傳統 CSS（scoped + global）撰寫於 `App.vue` 內，維護彈性低、難以快速調整 UI。改用 Tailwind CSS utility-first 方案後，樣式直接內嵌於模板中，減少命名負擔、加快原型迭代速度，並讓未來擴展元件時遵循一致的設計語言。

## What Changes

- 安裝 Tailwind CSS v4（與 Vite 整合的 `@tailwindcss/vite` plugin）
- 移除 `App.vue` 中所有 `<style scoped>` 與 `<style>` 區塊
- 移除 `frontend/src/style.css` 中的自訂樣式，改為 `@import "tailwindcss"`
- 將所有 HTML 元素的 class 從語義 class 名稱（如 `.chat-header`、`.bubble-self`）替換為 Tailwind utility classes
- 視覺效果與現有 LINE 風格保持一致（同色系、同佈局邏輯）

## Capabilities

### Modified Capabilities
- `chat-ui`：聊天室介面保持相同外觀，底層樣式實作改為 Tailwind CSS utility classes

### New Capabilities
<!-- 無 -->

## Impact

- **前端依賴**：新增 `tailwindcss`、`@tailwindcss/vite`（devDependencies）
- **修改檔案**：`frontend/vite.config.js`、`frontend/src/style.css`、`frontend/src/App.vue`
- **不影響**：後端程式碼、Pusher 整合邏輯、環境變數設定
- **視覺回歸風險**：低，需手動比對顏色、間距、圓角是否與原設計一致
