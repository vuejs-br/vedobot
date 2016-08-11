
const util = require('./utils')
const hincrby = require('./models/hincrby')
const exists = require('./models/exists')

module.exports = controller => {
  controller.hears(['^votar*', '^vote*'], 'direct_message,direct_mention,mention', (bot, message) => {
    let {text} = message

    // Test if syntax is true
    if (/\s:+[^\s]/.test(text) && !util.checkSyntax(text.split(/\s:/)[1], 'suggest')) {
      text = text.split(/\s:/)[1]

      // Check out if exists
      exists(`suggest:${text}:theme`)
        .then(result => {
          if (result === 0) return bot.reply(message, `A sugestão *${text}* não existe`)

          // Vote
          hincrby(`suggest:${text}:theme`, 'em análise', '1')
          .then(res => {
            bot.reply(message, `Voto para *${text}* confirmado!`)
          })
          .catch(err => {
            bot.reply(message, `Deu ruim xD dá um confere no erro: ${JSON.stringify(err)}`)
          })
        })
        .catch(err => {
          bot.reply(message, `Deu ruim xD dá um confere no erro: ${JSON.stringify(err)}`)
        })
    } else {
      bot.reply(message, 'Syntax errada! Dá um confere aí *`<:meu-titulo>`*')
    }
  })
}
