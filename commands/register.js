
const util = require('./utils')
const register = require('./messages/register')
const hset = require('./models/hset')
const hexists = require('./models/hexists')
const expire = require('./models/expire')

// Start command
// ==============
// controller {Object}
module.exports = controller => {
  controller.hears(['^registrar-post*', '^register-post*', '^regitra-post*'], 'direct_message,direct_mention,mention', (bot, message) => {
    let { text } = message

    // Test channel, blog or vedobot-test
    // ==================================
    if (message.channel === 'G1WJJJ48N' || message.channel === 'G1LTWEVMW') {

      // Test if syntax is true
      // ======================
      if (util.checkSyntax(text.split(' ')[1])) {
        text = text.split(' ')[1].split(':')

        // Check if hash exists
        // ====================
        hexists(`register:${text[0]}:date`, util.replace(text[2]))
          .then(result => {
            // Feedback if exists
            // ==================
            if (result === 1) return bot.reply(message, `O post *${util.replace(text[1])}* já tá registrado\nou você já *tem um post agendado para o dia*!`)

            // if not exists, create a new
            // ===========================
            hset(`register:${text[0]}:date`, util.replace(text[2]), util.replace(text[1]))
              .then(data => {

                // Set date to expire
                // ==================
                expire(`register:${text[0]}:date`, text[0].split('-').reverse().join('/'))
                  .then(ok => {
                    bot.reply(message, register(util.replace(text[1]), util.replace(text[2]), text[0].replace(/-/g, '/')))
                  })
                  .catch(err => {
                    bot.reply(message, util.errorHandler(err))
                  })
              })
              .catch(err => {
                bot.reply(message, util.errorHandler(err))
              })
          })
          .catch(err => {
            bot.reply(message, util.errorHandler(err))
          })
      } else {
        bot.reply(message, 'Syntax errada! Dá um confere aí *`<dd-mm-yyyy:meu-titulo:username-autor>`*')
      }
    } else {
      bot.reply(message, 'Você precisa ser um autor!\nQuer escrever para o blog? fale com *@vedovelli*')
    }
  })
}
