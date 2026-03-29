<template>
  <div class="flex flex-col h-screen bg-[#f0f0f0] max-w-[480px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.15)]">
    <!-- Header -->
    <div class="bg-[#00b900] px-4 py-3 flex items-center justify-between shadow-[0_2px_4px_rgba(0,0,0,0.2)] shrink-0">
      <span class="text-white text-lg font-bold tracking-wide">聊天室</span>
      <div class="flex items-center gap-1.5">
        <span class="text-white/90 text-[13px]">名稱：</span>
        <input
          v-model="currentUser"
          class="bg-white/25 border border-white/50 rounded text-white text-[13px] px-2 py-0.5 w-[90px] outline-none placeholder:text-white/70"
          placeholder="輸入名稱"
          maxlength="20"
        />
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto px-3 pt-3 pb-2 flex flex-col gap-2" ref="messageListRef">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="msg.username === currentUser ? 'flex flex-col items-end' : 'flex flex-col items-start'"
      >
        <div v-if="msg.username !== currentUser" class="text-[12px] text-[#666] mb-0.5 ml-1">
          {{ msg.username }}
        </div>
        <div :class="msg.username === currentUser ? 'flex items-end gap-1.5 flex-row-reverse' : 'flex items-end gap-1.5'">
          <div
            :class="msg.username === currentUser
              ? 'max-w-[220px] px-[13px] py-[9px] rounded-[18px] rounded-br text-sm leading-[1.45] break-words shadow-sm bg-[#4cd964] text-black'
              : 'max-w-[220px] px-[13px] py-[9px] rounded-[18px] rounded-bl text-sm leading-[1.45] break-words shadow-sm bg-white text-black'"
          >
            {{ msg.message }}
          </div>
          <span class="text-[10px] text-[#999] whitespace-nowrap mb-0.5">{{ msg.timestamp }}</span>
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="bg-white border-t border-[#ddd] px-2.5 py-2 flex gap-2 items-center shrink-0">
      <input
        v-model="inputMessage"
        class="flex-1 border border-[#ddd] rounded-full px-4 py-2 text-sm outline-none bg-[#f8f8f8] focus:border-[#00b900] focus:bg-white"
        placeholder="輸入訊息..."
        @keydown.enter.prevent="sendMessage"
      />
      <button
        class="bg-[#00b900] text-white border-none rounded-full px-[18px] py-2 text-sm font-bold cursor-pointer shrink-0 hover:bg-[#009900] active:bg-[#007700] transition-colors duration-150"
        @click="sendMessage"
      >發送</button>
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
