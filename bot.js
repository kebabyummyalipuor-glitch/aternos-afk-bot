const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Bot configuration engine is active.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[WEB] Keepalive server listening on port ${PORT}`);
});

const mineflayer = require('mineflayer');

const botOptions = {
  host: 'chion.aternos.host', 
  port: 52960,                    
  username: 'AFK_slave',
  version: '1.21',                
  auth: 'offline',                
  checkTimeoutInterval: 90000,    
  physicsEnabled: false          
};

let bot;

function startBot() {
  console.log("[MINECRAFT] Connecting bot to aternos...");
  
  if (bot) {
    bot.removeAllListeners();
  }

  bot = mineflayer.createBot(botOptions);

  bot.once('login', () => {
    console.log("[MINECRAFT] Handshake validated! Syncing data...");
  });

  bot.on('spawn', () => {
    console.log(`[MINECRAFT SUCCESS] ${bot.username} spawned inside world!`);
  });

  bot.on('error', (err) => {
    console.error(`[MINECRAFT NETWORK ERROR]: ${err.message}`);
  });

  bot.on('end', (reason) => {
    console.log(`[MINECRAFT] Closed (${reason}). Reconnecting in 25s...`);
    setTimeout(startBot, 25000); 
  });
}

setTimeout(startBot, 5000);
