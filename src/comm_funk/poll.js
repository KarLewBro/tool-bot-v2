
const PREFIX = process.env.PREFIX;
const expl = `\"${PREFIX}poll Do you pee in the shower?\"`;

module.exports = {
  run: async(client, msg, args) => {
    if(!args[0]) {
      msg.channel.send('To start a poll use \"!poll\" followed by a yes or no question');
    } else {
      let question = args.join(' ');
      msg.channel.send(`📋**${question}**`).then(messageReaction => {
        messageReaction.react('👍');
        messageReaction.react('👎');
        msg.delete(5000);
      });
    }
  },
  aliases: ['p','poll'],
  description: `A simple yes or no poll.\nExample: ${expl}`
}
