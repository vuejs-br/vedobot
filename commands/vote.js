
const util = require('./utils')
const hincrby = require('./models/hincrby')
const exists = require('./models/exists')

// Start command
// ==============
// controller {Object}
module.exports = controller => {
  controller.hears(['^votar*', '^vote*'], 'direct_message,direct_mention,mention', (bot, message) => {
    let {text} = message

    // Test if syntax is true
    // ======================
    if (/\s:+[^\s]/.test(text) && !util.checkSyntax(text.split(/\s:/)[1], 'suggest')) {
      text = text.split(/\s:/)[1]

      // Check out if exists
      // ===================
      exists(`suggest:${text}:theme`)
        .then(result => {
          // Feedback if not exists
          // ======================
          if (result === 0) return bot.reply(message, `A sugestão *${text}* não existe`)

          // Vote
          // ====
          hincrby(`suggest:${text}:theme`, 'em análise', '1')
          .then(res => {
            bot.reply(message, `Voto para *${text}* confirmado!`)
          })
          .catch(err => {
            bot.reply(message, util.errorHandler(err))
          })
        })
        .catch(err => {
          bot.reply(message, util.errorHandler(err))
        })
    } else {
      bot.reply(message, 'Syntax errada! Dá um confere aí *`<:meu-titulo>`*')
    }
  })
}
