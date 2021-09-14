
const PREFIX = process.env.PREFIX;
const expl = `\"${PREFIX}roll 4d6\"`;
const results = [];

function calc(numb, size){
  results = [];
  for(let i=0;i<numb;i++){
    results.push(Math.ceil(Math.random()*size));
  }
}

module.exports = {
  run: async(client, msg, args) => {
    if(!args[0]){
      msg.channel.send(`Incorrect input. E.g. \"${PREFIX}roll 10d6\"`);
      return;
    } else {
      let values = args[0].split('d');
      let nod = values[0];
      let sod = values[1];
      //Check for bad input
      if(values.some(isNaN)){
        msg.channel.send(`Incorrect input. E.g. \"${PREFIX}roll 10d6\"`);
        return;
      } else {
        switch(true){
          case nod >= 26 && sod >= 3://Dice pool limiter
          msg.channel.send('I\'m sorry, I don\'t roll more than 25 dice.');
          break
          case sod >= 9001://Dice size limiter
          msg.channel.send({files: ['./media/over_9000.png']});
          break
          case nod >= 3 && sod >= 20:
          calc(nod, sod);
          msg.channel.send(`Results are ${results}.`);
          break
          case nod == 2 && sod == 20://Advantage handler
          calc(nod, sod);
          let big = results.reduce((a,b) => b>a ? b:a);
          let lit = results.reduce((a,b) => b<a ? b:a);
          msg.channel.send(`Advantage: ${big}, disadvantage: ${lit}`);
          break
          case nod >= 2 && sod >= 3 && sod <= 19://Results and total for small dice
          calc(nod, sod);
          let sum = results.reduce((a,b) => a+b);
          msg.channel.send(`Results are ${results}. Totalling ${sum}.`);
          break
          case nod == 1 && sod >= 3://Single die natting
          calc(nod, sod);
          switch(true){
            case results == sod:
            msg.channel.send(`Nat ${results}!!!`);
            break
            case results == 1:
            msg.channel.send('Oh no...')
            setTimeout(() => { msg.channel.send('You\'ve rolled a 1.'); }, 1000);
            break
            default:
            msg.channel.send(`That\'s a ${results}!`);
            break
          }
          break
          case sod == 2://Unlimited coin flip counter
          calc(nod, sod);
          let deuces = results.reduce((x,y) => x + (y === 2), 0);
          let uns = results.length-deuces;
          msg.channel.send(`${deuces} heads and ${uns} tails.`);
          break
          case sod == 1://Joke for d1
          msg.channel.send(`Wow you got ${nod} whole 1s!🙄`);
          break
          default:
          msg.channel.send('Your dice fell of the table!');
          break
        }
      }
    }
  },
  aliases: ['r','roll','toss'],
  description: `Versitile dice roller.\nExample: ${expl}`
}
