
const util = require('./utils')
const view = require('./messages/view')
const keys = require('./models/keys')
const get = require('./models/get')

module.exports = controller => {
  controller.hears(['^ver-sugeridos*','^view-suggests*'], 'direct_message,direct_mention,mention', (bot, message) => {

    // Get all results
    keys('suggest:*:theme')
      .then( themes => {
        if (themes.length == 0) return bot.reply(message, 'Nenhuma sugestão registrada!')
        themes.map( theme => {

          // Get all suggests
          get(theme)
            .then( status => {
              theme = util.replace(theme.split(':')[1])
              if (status == 'produção') {
                bot.reply(message, `:zap: ${theme} - *${status}*`)
              } else {
                bot.reply(message, `:zap: ${theme} - _${status}_`)
              }
            })
            .catch( err => {
              bot.reply(message, `Deu ruim xD dá um confere no erro: ${JSON.stringify(err)}`)
            })
        })
      })
      .catch( err => {
        bot.reply(message, `Deu ruim xD dá um confere no erro: ${JSON.stringify(err)}`)
      })

  })
}
