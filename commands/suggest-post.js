
const util = require('./utils')
const suggest = require('./messages/suggest')
const hset = require('./models/hset')

// Start command
// ==============
// controller {Object}
module.exports = controller => {
  controller.hears(['^sugerir-post*', '^sugerir-posts*', '^suggest-post*'], 'direct_message,direct_mention,mention', (bot, message) => {
    let { text } = message

    // Test if syntax is true
    // =====================
    if (/\s:+[^\s]/.test(text) && !util.checkSyntax(text.split(/\s:/)[1], 'suggest')) {
      text = text.split(/\s:/)[1]

      // Create new suggest
      // ==================
      hset(`suggest:${text}:theme`, 'em análise', '0')
        .then(data => {
          bot.reply(message, suggest(util.replace(text)))
        })
        .catch(err => {
          bot.reply(message, util.errorHandler(err))
        })
    } else {
      bot.reply(message, 'Syntax errada! Dá um confere aí *`<:meu-titulo>`*')
    }
  })
}
