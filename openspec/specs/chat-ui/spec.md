## ADDED Requirements

### Requirement: 仿 LINE 訊息氣泡顯示
介面 SHALL 以訊息氣泡方式呈現聊天內容，自己發送的訊息顯示於右側（綠色背景），他人訊息顯示於左側（白色背景），並顯示發送者名稱與時間戳記。

#### Scenario: 自己發送的訊息顯示於右側
- **WHEN** 使用者發送一則訊息
- **THEN** 該訊息 SHALL 顯示於聊天視窗右側，氣泡樣式仿 LINE 綠色背景

#### Scenario: 他人訊息顯示於左側
- **WHEN** 其他使用者發送訊息並由 Pusher 廣播
- **THEN** 該訊息 SHALL 顯示於聊天視窗左側，氣泡樣式為白色/灰色背景，並附發送者名稱

#### Scenario: 顯示時間戳記
- **WHEN** 任一訊息顯示於聊天視窗
- **THEN** 每則訊息 SHALL 顯示發送時間（HH:mm 格式）

### Requirement: 聊天輸入區域
介面底部 SHALL 提供文字輸入框與發送按鈕，輸入框支援 Enter 鍵發送，發送後自動清空。

#### Scenario: 按 Enter 發送訊息
- **WHEN** 使用者在輸入框按下 Enter 鍵（非 Shift+Enter）
- **THEN** 系統 SHALL 觸發發送訊息流程，輸入框清空

#### Scenario: 點擊發送按鈕
- **WHEN** 使用者點擊發送按鈕
- **THEN** 系統 SHALL 觸發發送訊息流程，輸入框清空

### Requirement: 訊息列表自動捲動至底部
每當新訊息加入時，聊天視窗 SHALL 自動捲動至最新訊息。

#### Scenario: 新訊息到達自動捲動
- **WHEN** 新訊息加入訊息列表（無論來源）
- **THEN** 聊天視窗 SHALL 自動捲動使最新訊息可見

### Requirement: 使用者名稱設定
使用者 SHALL 能在頁面頂部輸入自己的顯示名稱，預設為 "User"。

#### Scenario: 設定使用者名稱
- **WHEN** 使用者在名稱輸入框輸入名稱
- **THEN** 後續發送的訊息 SHALL 使用該名稱作為發送者名稱
