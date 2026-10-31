const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Bot permanent tracking engine is active.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[WEB] Keepalive active on port ${PORT}`);
});

const mineflayer = require('mineflayer');

const botOptions = {
  // 🔄 FIX: Use your PERMANENT main address here! Do NOT use a port number anymore.
  host: 'giganeega-dcQ2.aternos.me', 
  username: 'AFK_slave',
  version: '1.21',                
  auth: 'offline',                
  checkTimeoutInterval: 90000    
};

let bot;

function startBot() {
  console.log("[MINECRAFT] Auto-resolving Aternos SRV address and connecting...");
  if (bot) bot.removeAllListeners();
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log(`[SUCCESS] ${bot.username} spawned safely inside the world!`);
  });

  bot.on('time', () => {
    if (bot.time.age % 200 === 0 && bot.entity) {
      bot.look(bot.entity.yaw + 0.1, 0, true);
    }
  });

  bot.on('error', (err) => {
    console.error(`[CONNECTION ERROR]: ${err.message}`);
  });

  bot.on('end', (reason) => {
    console.log(`[DISCONNECTED] Reason: ${reason}. Auto-reconnecting via SRV check in 20s...`);
    setTimeout(startBot, 20000); 
  });
}

setTimeout(startBot, 5000);
