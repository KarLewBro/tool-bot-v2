
module.exports = {
  run: async(client, msg, args) => {
    let respArr = 'You are very welcome, You\'re welcome, You bet, I\'m happy to help, No problem, No sweat, Think nothing of it, My pleasure, No thank you, Anytime'.split(',');
    let resp = respArr[Math.floor(Math.random()*respArr.length)];
    msg.channel.send(resp);
  },
  aliases: ['thank', 'thanks', 'appreciated'],
  description: 'You\'re welcome response randimizer'
}
