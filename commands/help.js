
const help = require('./messages/help')

module.exports = controller => {
  controller.hears(['^help*', '^ajuda*'], 'direct_message,direct_mention,mention', (bot, message) => {
    bot.reply(message, help)
  })
}
