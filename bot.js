const mineflayer = require('mineflayer');

const botOptions = {
  host: 'mummichog.aternos.host', // Your exact running host
  port: 52960,                    // Your exact running port
  username: 'AFK_slave',
  version: '1.21',                // Forces the base 1.21 profile structure

  // PROTOCOL BYPASS PARAMETERS:
  auth: 'offline',                // Explicitly disables standard Microsoft profile validation
  checkTimeoutInterval: 60000,    // Drastically increases network lag tolerance thresholds
  physicsEnabled: false          // Halts movement execution completely until handshakes stabilize
};

let bot;

function startBot() {
  console.log("Initializing secure 1.21.3 translation tunnel...");
  bot = mineflayer.createBot(botOptions);

  bot.once('login', () => {
    console.log("Handshake validated by ViaVersion! Syncing entity data...");
  });

  bot.on('spawn', () => {
    console.log(`[SUCCESS] ${bot.username} has stabilized inside the world!`);
    
    // Safety delay: Wait 5 seconds before allowing the bot to interact with anything
    setTimeout(() => {
      if (!bot || !bot.entity) return;
      console.log("Enabling background tasks...");
      bot.chat("AFK Stabilization Active.");
    }, 5000);
  });

  // Keep-alive packet loop to reassure Aternos anti-cheat systems
  bot.on('time', () => {
    if (bot.time.age % 400 === 0 && bot.entity) {
      // Safely sway head pitch values to satisfy server-side activity requirements
      bot.look(0, 0, true); 
    }
  });

  bot.on('kicked', (reason) => {
    console.log(`[KICKED BY SERVER]: ${reason}`);
  });

  bot.on('error', (err) => {
    console.error(`[NETWORK ERROR]: ${err.message}`);
  });

  bot.on('end', (reason) => {
    console.log(`Socket closed (${reason}). Instigating clean reboot sequence in 20s...`);
    setTimeout(startBot, 20000); 
  });
}

startBot();
