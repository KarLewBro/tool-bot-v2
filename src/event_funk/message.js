
const PREFIX = process.env.PREFIX;

module.exports = (client, msg) => {
  if(msg.author.bot) return;
  if(!msg.content.startsWith(PREFIX)) return;
  let cmdArgs = msg.content.substring(msg.content.indexOf(PREFIX)+1).split(/\s+/);
  let cmdName = cmdArgs.shift();
  if(client.commands.get(cmdName))
    client.commands.get(cmdName)(client, msg, cmdArgs);
  else
    client.commands.get('default')(client, msg, cmdArgs);
}
