

const fs = require('fs')
const view = require('./messages/view')

module.exports = controller => {
  controller.hears([/(ver|ve|view|visualizar)/i], 'direct_message,direct_mention,mention', (bot, message) => {
    fs.readFile('./list.json', 'utf8', (err, list) => {
      if (err) {
        bot.reply(message, `Deu ruim xD olha o erro: ${JSON.stringify(err)}`)
        return
      }

      list = JSON.parse(list)
      list.forEach(register => {
        for (let key in register) {
          bot.reply(message, view(Object.keys(register), register[key].title, register[key].author))
        }
      })
    })
  })
}
