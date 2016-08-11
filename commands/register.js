
const util = require('./utils')
const register = require('./messages/register')
const hset = require('./models/hset')
const hexists = require('./models/hexists')

module.exports = controller => {
  controller.hears(['^registrar-post*', '^register-post*', '^regitra-post*'], 'direct_message,direct_mention,mention', (bot, message) => {
    let { text } = message
    // Test channel, blog or vedobot-test
    if (message.channel === 'G1WJJJ48N' || message.channel === 'G1LTWEVMW') {
      // Test if syntax is true
      if (util.checkSyntax(text.split(' ')[1])) {
        text = text.split(' ')[1].split(':')

        hexists(`register:${text[0]}:date`, util.replace(text[2]))
          .then(result => {
            if (result === 1) return bot.reply(message, `O post *${util.replace(text[1])}* já tá registrado\nou você já *tem um post agendado para o dia*!`)

            hset(`register:${text[0]}:date`, util.replace(text[2]), util.replace(text[1]))
              .then(data => {
                bot.reply(message, register(util.replace(text[1]), util.replace(text[2])))
              })
              .catch(err => {
                bot.reply(message, `Deu ruim xD dá um confere no erro: ${JSON.stringify(err)}`)
              })
          })
          .catch(err => {
            bot.reply(message, `Deu ruim xD dá um confere no erro: ${JSON.stringify(err)}`)
          })
      } else {
        bot.reply(message, 'Syntax errada! Dá um confere aí *`<dd-mm-yyyy:meu-titulo:username-autor>`*')
      }
    } else {
      bot.reply(message, 'Você precisa ser um autor!\nQuer escrever para o blog? fale com *@vedovelli*')
    }
  })
}
