
const util = require('./utils')
const hget = require('./models/hget')
const hdel = require('./models/hdel')

module.exports = controller => {
  controller.hears(['^remover-post*', '^remove-post*'], 'direct_message,direct_mention,mention', (bot, message) => {
    let { text } = message

    // Test channel, blog or vedobot-test
    if (message.channel === 'G1WJJJ48N' || message.channel === 'G1LTWEVMW') {
      // Test if syntax is true
      if (util.checkSyntax(text.split(' ')[1], 'remove')) {
        text = text.split(' ')[1].split(':')

        hget(`register:${text[0]}:date`, text[1])
          .then(hash => {
            // Feedback if not exists
            if (hash === null) return bot.reply(message, 'Ou esse *post não existe*, ou você *escreveu errado*.')

            hdel(`register:${text[0]}:date`, text[1])
              .then(res => {
                bot.reply(message, `Post do *${util.replace(text[1])}* do dia *${text[0].replace(/-/g, '/')}* removido!`)
              })
              .catch(err => {
                bot.reply(message, `Deu ruim xD dá um confere no erro: ${JSON.stringify(err)}`)
              })
          })
          .catch(err => {
            bot.reply(message, `Deu ruim xD dá um confere no erro: ${JSON.stringify(err)}`)
          })
      } else {
        bot.reply(message, 'Syntax errada! Dá um confere aí *`<dd-mm-yyyy:username-autor>`*')
      }
    } else {
      bot.reply(message, 'Você precisa ser um autor!\nQuer escrever para o blog? fale com *@vedovelli*')
    }
  })
}
