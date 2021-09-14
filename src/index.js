
require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client({partials: ['MESSAGE', 'REACTION']});
const { registerCommands, registerEvents } = require('./util_funk/registry');

(async () => {
  client.login(process.env.BOT_TOKEN);
  client.commands = new Map();
  await registerEvents(client, '../event_funk');
  await registerCommands(client, '../comm_funk');
})();
