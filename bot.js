javascript
// --- 1. LIGHTWEIGHT WEB SERVER FOR UPTIMEROBOT KEEPALIVE ---
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot connection engine is running perfectly!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[WEB] Keepalive server listening on port ${PORT}`);
});

// --- 2. MINECRAFT BOT LAYOUT ---
const mineflayer = require('mineflayer');

const botOptions = {
  host: 'slimehead.aternos.host', 
  port: 52960,                    
  username: 'AFK_slave',
  version: '1.21',                
  auth: 'offline',                
  checkTimeoutInterval: 90000,    // Increased tolerance for cloud hosting lag
  physicsEnabled: false          
};

let bot;

function startBot() {
  console.log("[MINECRAFT] Initializing connection to Aternos host...");
  
  // Clean up any old existing bot instance memory links before running
  if (bot) {
    bot.removeAllListeners();
  }

  bot = mineflayer.createBot(botOptions);

  bot.once('login', () => {
    console.log("[MINECRAFT] Handshake validated by ViaVersion! Syncing entity data...");
  });

  bot.on('spawn', () => {
    console.log(`[MINECRAFT SUCCESS] ${bot.username} has stabilized inside the world!`);
  });

  bot.on('kicked', (reason) => {
    console.log(`[MINECRAFT KICKED]: ${reason}`);
  });

  bot.on('error', (err) => {
    console.error(`[MINECRAFT NETWORK ERROR]: ${err.message}`);
  });

  bot.on('end', (reason) => {
    console.log(`[MINECRAFT] Socket closed (${reason}). Instigating clean reboot sequence in 25s...`);
    setTimeout(startBot, 25000); 
  });
}

// Start the Minecraft connection routine after a brief 5-second cloud boot delay
setTimeout(startBot, 5000);
