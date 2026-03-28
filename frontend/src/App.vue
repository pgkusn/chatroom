<template>
  <div class="chat-app">
    <!-- Header -->
    <div class="chat-header">
      <span class="chat-title">聊天室</span>
      <div class="username-area">
        <span class="username-label">名稱：</span>
        <input
          v-model="currentUser"
          class="username-input"
          placeholder="輸入名稱"
          maxlength="20"
        />
      </div>
    </div>

    <!-- Messages -->
    <div class="message-list" ref="messageListRef">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="message-row"
        :class="msg.username === currentUser ? 'self' : 'other'"
      >
        <div v-if="msg.username !== currentUser" class="sender-name">
          {{ msg.username }}
        </div>
        <div class="bubble-row">
          <div
            class="bubble"
            :class="msg.username === currentUser ? 'bubble-self' : 'bubble-other'"
          >
            {{ msg.message }}
          </div>
          <span class="timestamp">{{ msg.timestamp }}</span>
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="input-area">
      <input
        v-model="inputMessage"
        class="message-input"
        placeholder="輸入訊息..."
        @keydown.enter.prevent="sendMessage"
      />
      <button class="send-button" @click="sendMessage">發送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import pusher from './pusher.js';

const currentUser = ref('User');
const inputMessage = ref('');
const messages = ref([]);
const messageListRef = ref(null);

function getTimestamp() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

async function scrollToBottom() {
  await nextTick();
  if (messageListRef.value) {
    messageListRef.value.scrollTop = messageListRef.value.scrollHeight;
  }
}

onMounted(() => {
  const channel = pusher.subscribe('chat-room');
  channel.bind('new-message', (data) => {
    messages.value.push(data);
    scrollToBottom();
  });
});

async function sendMessage() {
  const text = inputMessage.value.trim();
  if (!text) return;

  const payload = {
    username: currentUser.value || 'User',
    message: text,
    timestamp: getTimestamp(),
  };

  inputMessage.value = '';

  await fetch('http://localhost:4000/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #e0e0e0;
}
</style>

<style scoped>
.chat-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  max-width: 480px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

/* Header */
.chat-header {
  background-color: #00b900;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.chat-title {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.username-area {
  display: flex;
  align-items: center;
  gap: 6px;
}

.username-label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
}

.username-input {
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  padding: 3px 8px;
  width: 90px;
  outline: none;
}

.username-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

/* Message list */
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-row {
  display: flex;
  flex-direction: column;
}

.message-row.self {
  align-items: flex-end;
}

.message-row.other {
  align-items: flex-start;
}

.sender-name {
  font-size: 12px;
  color: #666;
  margin-bottom: 2px;
  margin-left: 4px;
}

.bubble-row {
  display: flex;
  align-items: flex-end;
  gap: 6px;
}

.message-row.self .bubble-row {
  flex-direction: row-reverse;
}

.bubble {
  max-width: 220px;
  padding: 9px 13px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.45;
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.bubble-self {
  background-color: #4cd964;
  color: #000;
  border-bottom-right-radius: 4px;
}

.bubble-other {
  background-color: #fff;
  color: #000;
  border-bottom-left-radius: 4px;
}

.timestamp {
  font-size: 10px;
  color: #999;
  white-space: nowrap;
  margin-bottom: 2px;
}

/* Input area */
.input-area {
  background-color: #fff;
  border-top: 1px solid #ddd;
  padding: 8px 10px;
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
}

.message-input {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  outline: none;
  background: #f8f8f8;
}

.message-input:focus {
  border-color: #00b900;
  background: #fff;
}

.send-button {
  background-color: #00b900;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.15s;
}

.send-button:hover {
  background-color: #009900;
}

.send-button:active {
  background-color: #007700;
}
</style>
