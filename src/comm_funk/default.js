
module.exports = {
  run: async(client, msg, args) => {
    let respArr = [`I don\'t know what to do with \"${args}.\"`, `I\'m not sure how to \"${args}.\"`, `\"${args}\" means nothing to me.`, `Maybe one day I\'ll be able to \"${args}.\"`, `Maybe you could \"${args}\" yourself.`];
    let resp = respArr[Math.floor(Math.random()*respArr.length)];
    msg.channel.send(resp);
  },
  aliases: [],
  description: 'The default \"unknown\" response randomizer'
}
