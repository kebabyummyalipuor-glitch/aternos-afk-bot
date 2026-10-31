const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Bot protocol engine is fully active.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[WEB] Keepalive server active on port ${PORT}`);
});

const mineflayer = require('mineflayer');

const botOptions = {
  host: 'giganeega-dcQ2.aternos.me', 
  username: 'AFK_slave',
  
  // 🔄 THE FIX: ADJUST PROTOCOL HEADERS
  version: '1.21.1',               // Upgrades the base packet structures to bridge perfectly into 1.21.3
  auth: 'offline',                 
  checkTimeoutInterval: 120000,    // Maximizes network stability padding for cloud hosting
  hideErrors: true                 // Silences internal node network warnings
};

let bot;

function startBot() {
  console.log("[MINECRAFT] Auto-resolving network address and linking packet tunnels...");
  
  if (bot) {
    bot.removeAllListeners();
  }

  bot = mineflayer.createBot(botOptions);

  bot.once('login', () => {
    console.log("[MINECRAFT] Packet sync approved! Authenticating entity variables...");
  });

  bot.on('spawn', () => {
    console.log(`[MINECRAFT SUCCESS] ${bot.username} has stabilized inside the world!`);
  });

  bot.on('end', (reason) => {
    console.log(`[MINECRAFT] Closed (${reason}). Initializing dynamic reboot loop in 25s...`);
    setTimeout(startBot, 25500); 
  });
}

// 5-second initial delay allows the container infrastructure to fully wake up before launching the socket
setTimeout(startBot, 5000);

