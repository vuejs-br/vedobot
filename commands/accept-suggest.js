
const util = require('./utils')
const keys = require('./models/keys')
const del = require('./models/del')
const hset = require('./models/hset')


// Start command
// ==============
// controller {Object}
module.exports = controller => {
  controller.hears(['^aceitar-sugestão*', '^accept-suggest*', '^aceitar-sugestao*'], 'direct_message,direct_mention,mention', (bot, message) => {
    let { text } = message

    // Test channel, blog or vedobot-test
    // ==================================
    if (message.channel === 'G1WJJJ48N' || message.channel === 'G1LTWEVMW') {

      // Test if syntax is true
      // ======================
      if (/:+[^\s]/.test(text) && !util.checkSyntax(text.split(/\s:/)[1], 'suggest')) {
        text = text.split(/\s:/)

        keys(`suggest:${text[1]}:theme`)
          .then(key => {

            // Delete
            // ======
            del(`suggest:${text[1]}:theme`)
              .then(res => {

                // Set again
                // =========
                hset(`suggest:${text[1]}:theme`, 'produção', '∞')
                  .then(suggest => {
                    bot.reply(message, `*${util.replace(text[1])}* alterado!`)
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
        bot.reply(message, 'Syntax errada! Dá um confere aí *`<:meu-titulo>`*')
      }
    } else {
      bot.reply(message, 'Você precisa ser um autor!\nQuer escrever para o blog? fale com *@vedovelli*')
    }
  })
}
