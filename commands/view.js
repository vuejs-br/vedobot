
const view = require('./messages/view')
const keys = require('./models/keys')
const hgetall = require('./models/hgetall')

module.exports = controller => {
  controller.hears(['^ver-posts*', '^see-posts*'], 'direct_message,direct_mention,mention', (bot, message) => {
    // Get all results
    keys('register:*')
      .then(data => {
        if (data.length === 0) return bot.reply(message, 'Nenhum post agendado!')
        data.map(hash => {
          // Get all fields for these keys
          hgetall(hash)
            .then(data => {
              for (let key in data) {
                bot.reply(message, view(hash.split(':')[1].replace(/-/g, '/'), data[key], key))
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
