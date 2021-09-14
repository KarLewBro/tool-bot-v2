
const discord = require('discord.js');
const startCard = new discord.MessageEmbed()
.setTitle('**The name of the game is Counting!**')
.setColor(0x00ffc8)
.setDescription('Players will take turns counting. The game ends when the count is broken or a single player messages twice.');


//Leaderboard per game + game length

//Top scores all time + longest game footer

const filter = m => !m.author.bot;
let playing = false;

module.exports = {
  run: async(client, msg, args) => {
    //Check if game running
    if(!playing){
      playing = true;
      const players = new Map();
      let c = 0;
      let lm = {};

      //Start embed
      msg.channel.send(startCard);
      //Begin collecting messages
      const coll = new discord.MessageCollector(msg.channel, filter);
      coll.on('collect', m => {
        ++c;
        //Check if game over
        if(/*m.author === lm.author ||*/ parseFloat(m.content) !== c) {
          coll.stop('Game Over!');
        } else {
          //Check if Player exists and score
          if(!players.has(m.author.id)) {
            players.set(m.author.id, {
              name: m.author.username,
              score: 10
            });
          } else {
            players.set(m.author.id, {
              name: m.author.username,
              score: parseFloat(players.get(m.author.id).score) + 10
            });
          }
          console.log(players.get(m.author.id).score);
        }
        lm = m;
      });

      //Finish
      coll.on('end', () => {
        playing = false;
        //Sort scores
        let scoreboard = [];
        players.forEach(a => scoreboard.push(`${a.score} - ${a.name}`));
        let leadboard = scoreboard.sort((a, b) => b.split(' ')[0] - a.split(' ')[0]).slice(0, 10);
        //Game Over with leaderboard
        const endCard = new discord.MessageEmbed()
        .setTitle('**Game Over!**')
        .setColor(0xff0064)
        .setDescription(`We made it to ${c-1} with ${scoreboard.length} players!`)
        .addField('Leaderboard:', leadboard);
        //Send it
        msg.channel.send(endCard)
      });
    } else {
      //Idiot reminder
      msg.channel.send('The game was already going you ass!');
      coll.stop('Game Over!');
    }
  },
  aliases: [ 'count' ],
  description: 'Group counting game'
}
