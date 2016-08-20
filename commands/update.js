
const util = require('./utils')
const spawn = require('child_process').spawn

// Start command
// ==============
// controller {Object}
module.exports = controller => {
  controller.hears(['^upgrade*', '^update*'], 'direct_message,direct_mention,mention', (bot, message) => {
    let { text } = message

    // Test channel, blog or vedobot-test
    // ==================================
    if (message.channel === 'G1WJJJ48N' || message.channel === 'G1LTWEVMW') {

      let pull = spawn('git', ['pull', 'origin', 'master'])

      // Pull new version
      // ===============
      pull.stdout.on('data', data => {
        bot.reply(message, data.toString())
      })

      // Error handler
      // ============
      pull.on('error', data => {
        bot.reply(message, util.errorHandler(err))
      })

      // If pull finished restart
      // =======================
      pull.on('close', code => {
        let pm2 = spawn('pm2', ['restart', 'bot'])

        // Restart bot
        // ===========
        pm2.stdout.on('data', data => {
          bot.reply(message, data.toString())
          bot.reply(message, '*Tudo atualizado!*')
        })

        // Error handler
        // ============
        pm2.on('error', data => {
          bot.reply(message, util.errorHandler(err))
        })

      })

    } else {
      bot.reply(message, 'Você precisa ser um autor!\nQuer escrever para o blog? fale com *@vedovelli*')
    }
  })
}
