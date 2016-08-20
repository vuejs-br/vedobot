
const view = require('./messages/view')
const keys = require('./models/keys')
const hgetall = require('./models/hgetall')

// Start command
// ==============
// controller {Object}
module.exports = controller => {
  controller.hears(['^ver-posts*', '^see-posts*'], 'direct_message,direct_mention,mention', (bot, message) => {

    // Get all results
    // ===============
    keys('register:*')
      .then(data => {
        if (data.length === 0) return bot.reply(message, 'Nenhum post agendado!')
        data.map(hash => {

          // Get all fields for these keys
          // =============================
          hgetall(hash)
            .then(data => {
              for (let key in data) {
                bot.reply(message, view(hash.split(':')[1].replace(/-/g, '/'), data[key], key))
              }
            })
            .catch(err => {
              bot.reply(message, util.errorHandler(err))
            })
        })
      })
      .catch(err => {
        bot.reply(message, util.errorHandler(err))
      })
  })
}
