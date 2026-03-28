## ADDED Requirements

### Requirement: 訂閱 Pusher channel 接收即時訊息
前端 SHALL 在頁面載入時自動連線至 Pusher，並訂閱名為 `chat-room` 的 public channel，監聽 `new-message` 事件。

#### Scenario: 成功接收其他使用者訊息
- **WHEN** 後端觸發 `chat-room` channel 的 `new-message` 事件
- **THEN** 所有已訂閱的前端用戶端 SHALL 即時收到訊息並顯示於聊天視窗

#### Scenario: Pusher 連線使用 .env 憑證
- **WHEN** 前端初始化 Pusher 實例
- **THEN** 系統 SHALL 使用 `VITE_PUSHER_KEY` 與 `VITE_PUSHER_CLUSTER` 環境變數建立連線，不得 hardcode 憑證

### Requirement: 發送訊息後廣播至所有用戶端
使用者發送訊息後，系統 SHALL 透過後端 API 呼叫 Pusher Server SDK，將訊息廣播給同 channel 所有訂閱者（包含發送者自己）。

#### Scenario: 發送訊息成功廣播
- **WHEN** 使用者在輸入框輸入訊息並點擊發送
- **THEN** 後端 SHALL 呼叫 Pusher trigger，所有連線用戶端 SHALL 在 1 秒內收到該訊息

#### Scenario: 發送空白訊息
- **WHEN** 使用者提交空白或僅含空格的訊息
- **THEN** 系統 SHALL 不發送該訊息，輸入框保持原狀
