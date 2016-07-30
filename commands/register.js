
const fs = require('fs')
const register = require('./messages/register')

module.exports = controller => {
  controller.hears(['^registrar*','^register*','^regitra*'], 'direct_message,direct_mention,mention', (bot, message) => {
    let { text } = message
    let json = {}

    // Test if syntax is true
    if (/^\d{4}-\d{2}-\d{2}:\w+-?\w+:\w+-?\w+$/.test(text.split(' ')[1])) {
      text = text.split(' ')[1].split(':')
      json[text[0]] = {
        title: text[1].replace(/-/g, ' '),
        author: text[2].replace(/-/g, ' ')
      }

      // Read file
      fs.readFile('./list.json', 'utf8', (err, list) => {
        if (err) {
          bot.reply(message, `Deu ruim xD olha o erro: ${JSON.stringify(err)}`)
          return
        }

        list = JSON.parse(list)
        list.push(json)

        // After add new post, write again
        fs.writeFile('./list.json', JSON.stringify(list, null, 2), err => {
          if (err) {
            bot.reply(message, `Deu ruim xD olha o erro: ${JSON.stringify(err)}`)
            return
          }

          bot.reply(message, register(json[text[0]].title, json[text[0]].author))
        })
      })
    } else {
      bot.reply(message, 'Syntax errada! Dá um confere aí *`<yyyy-mm-dd:titulo:autor>`*')
    }

  })
}
