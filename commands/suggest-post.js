
const util = require('./utils')
const suggest = require('./messages/suggest')
const set = require('./models/set')

module.exports = controller => {
  controller.hears(['^sugerir-post*','^sugerir-posts*','^suggest-post*'], 'direct_message,direct_mention,mention', (bot, message) => {
    let { text } = message

    // Test if syntax is true
    if (/:+/.test(text) && !util.checkSyntax(text.split(/\s:/)[1], 'suggest')) {
      text = text.split(/\s:/)[1]

      set(`suggest:${text}:theme`, 'em análise')
        .then( data => {
          bot.reply(message, suggest(util.replace(text)))
        })
        .catch( err => {
          bot.reply(message, `Deu ruim xD dá um confere no erro: ${JSON.stringify(err)}`)
        })
    } else {
      bot.reply(message, 'Syntax errada! Dá um confere aí *`<:meu-titulo>`*')
    }


  })
}
