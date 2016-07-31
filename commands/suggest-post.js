
const util = require('./utils')
const suggest = require('./messages/suggest')
const set = require('./models/set')

module.exports = controller => {
  controller.hears(['^sugerir-post*','^sugerir-posts*','^suggest-post*'], 'direct_message,direct_mention,mention', (bot, message) => {
    let { text } = message

    text = text.split(' ')[1]

    set(`suggest:${text}:theme`, 'em análise')
    .then( data => {
      bot.reply(message, suggest(util.replace(text)))
    })
    .catch( err => {
      bot.reply(message, `Deu ruim xD dá um confere no erro: ${JSON.stringify(err)}`)
    })


  })
}
