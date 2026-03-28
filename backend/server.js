const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const requiredEnvVars = [
  'VITE_PUSHER_APP_ID',
  'VITE_PUSHER_KEY',
  'VITE_PUSHER_SECRET',
  'VITE_PUSHER_CLUSTER',
];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.VITE_PUSHER_APP_ID,
  key: process.env.VITE_PUSHER_KEY,
  secret: process.env.VITE_PUSHER_SECRET,
  cluster: process.env.VITE_PUSHER_CLUSTER,
  useTLS: true,
});

const app = express();

app.use(cors({ origin: /^http:\/\/localhost:\d+$/ }));
app.use(express.json());

app.post('/api/messages', async (req, res) => {
  const { username, message, timestamp } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: 'username and message are required' });
  }

  try {
    await pusher.trigger('chat-room', 'new-message', { username, message, timestamp });
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('Pusher error:', err.message);
    res.status(500).json({ error: 'Failed to trigger event' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
