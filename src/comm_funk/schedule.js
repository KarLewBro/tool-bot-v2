
const PREFIX = process.env.PREFIX;
const expl = `\"${PREFIX}schedule 4/20/2020 -mo -we -fr\"`
const sun = '☀️:Sunday';
const mon = '🌕:Monday';
const tue = '🌮:Tuesday';
const wed = '🐸:Wednesday';
const thu = '🍺:Thursday';
const fri = '🥡:Friday';
const sat = '🪐:Saturday';

module.exports = {
  run: async(client, msg, args) => {
    let week = [mon, tue, wed, thu, fri, sat, sun];
    if(!args[0] || !args[0].split('').some(Number)) {
      msg.channel.send(`Please provide a date within the week in question. E.g. ${expl}`);
    } else {
      if(msg.content.toLowerCase().includes('-')) {
        if(msg.content.toLowerCase().includes('-mo')) {remove(mon, week)}
        if(msg.content.toLowerCase().includes('-tu')) {remove(tue, week)}
        if(msg.content.toLowerCase().includes('-we')) {remove(wed, week)}
        if(msg.content.toLowerCase().includes('-th')) {remove(thu, week)}
        if(msg.content.toLowerCase().includes('-fr')) {remove(fri, week)}
        if(msg.content.toLowerCase().includes('-sa')) {remove(sat, week)}
        if(msg.content.toLowerCase().includes('-su')) {remove(sun, week)}
      }
      msg.channel.send(`️️️🗓️**What day(s) are you available during the week of ${args[0]}?**\n${week.join(' ')}`).then(messageReaction => {
        if(!msg.content.toLowerCase().includes('-mo')) {messageReaction.react('🌕')}
        if(!msg.content.toLowerCase().includes('-tu')) {messageReaction.react('🌮')}
        if(!msg.content.toLowerCase().includes('-we')) {messageReaction.react('🐸')}
        if(!msg.content.toLowerCase().includes('-th')) {messageReaction.react('🍺')}
        if(!msg.content.toLowerCase().includes('-fr')) {messageReaction.react('🥡')}
        if(!msg.content.toLowerCase().includes('-sa')) {messageReaction.react('🪐')}
        if(!msg.content.toLowerCase().includes('-su')) {messageReaction.react('☀️')}
        msg.delete(5000);
      });
    }
  },
  aliases: ['schedule', 'doodle', 'strawpoll'],
  description: `Doodle like poll for availability.\nExample: ${expl}`
}

function remove(x, arr){
  let i = arr.indexOf(x);
  arr.splice(i,1);
}
