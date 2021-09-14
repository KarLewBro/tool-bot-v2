
const { helpEmbed } = require('../util_funk/registry');

module.exports = {
  run: async(client, msg, args) => {
    msg.channel.send(helpEmbed);
  },
  aliases: ['h', 'help'],
  description: 'This list of accessible commands'
}
