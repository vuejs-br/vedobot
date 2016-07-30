
const fs = require('fs')
const register = require('./messages/register')

module.exports = controller => {
  controller.hears([/(registrar|register|registar|regitar|regitrar|)/i], 'direct_message,direct_mention,mention', (bot, message) => {
    let { text } = message
    let json = {}

    text = text.split(' ')[1].split(':')
    json[text[0]] = {
      title: text[1].replace(/-/g, ' '),
      author: text[2].replace(/-/g, ' ')
    }

    fs.readFile('./list.json', 'utf8', (err, list) => {
      if (err) {
        bot.reply(message, `Deu ruim xD olha o erro: ${JSON.stringify(err)}`)
        return
      }

      list = JSON.parse(list)
      list.push(json)

      fs.writeFile('./list.json', JSON.stringify(list, null, 2), err => {
        if (err) {
          bot.reply(message, `Deu ruim xD olha o erro: ${JSON.stringify(err)}`)
          return
        }

        bot.reply(message, register(json[text[0]].title, json[text[0]].author))
      })
    })


  })
}
