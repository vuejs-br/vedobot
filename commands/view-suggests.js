
const util = require('./utils')
const viewSuggest = require('./messages/view-suggest')
const keys = require('./models/keys')
const hgetall = require('./models/hgetall')

module.exports = controller => {
  controller.hears(['^posts-sugeridos*', '^posts-suggests*'], 'direct_message,direct_mention,mention', (bot, message) => {
    // Get all results
    keys('suggest:*:theme')
      .then(themes => {
        if (themes.length === 0) return bot.reply(message, 'Nenhuma sugestão registrada!')
        themes.map(theme => {
          // Get all suggests
          hgetall(theme)
            .then(status => {
              theme = util.replace(theme.split(':')[1])

              for (let key in status) {
                bot.reply(message, viewSuggest(theme, key, status[key]))
              }
            })
            .catch(err => {
              bot.reply(message, `Deu ruim xD dá um confere no erro: ${JSON.stringify(err)}`)
            })
        })
      })
      .catch(err => {
        bot.reply(message, `Deu ruim xD dá um confere no erro: ${JSON.stringify(err)}`)
      })
  })
}
