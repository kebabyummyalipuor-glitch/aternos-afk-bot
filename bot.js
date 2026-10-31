const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Bot movement engine is active.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[WEB] Keepalive active on port ${PORT}`);
});

const mineflayer = require('mineflayer');

const botOptions = {
  host: 'nurseryfish.aternos.host', 
  port: 52960,                    
  username: 'AFK_slave',
  version: '1.21',                
  auth: 'offline',                
  checkTimeoutInterval: 90000    
};

let bot;

function startBot() {
  console.log("[MINECRAFT] Connecting bot...");
  if (bot) bot.removeAllListeners();
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log(`[SUCCESS] ${bot.username} spawned!`);
  });

  // 🔄 THE FIX: SAFE MOVEMENT LOOP (Runs every 10 seconds)
  bot.on('time', () => {
    if (bot.time.age % 200 === 0 && bot.entity) {
      // Makes the bot look slightly to the left/right to trick the anti-AFK plugin
      bot.look(bot.entity.yaw + 0.1, 0, true);
    }
  });

  bot.on('end', (reason) => {
    console.log(`[DISCONNECTED] Reason: ${reason}. Auto-reconnecting in 20s...`);
    setTimeout(startBot, 20000); 
  });
}

setTimeout(startBot, 5000);
