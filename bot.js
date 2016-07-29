
const Botkit = require('botkit')

const controller = Botkit.slackbot({
  debug: process.env.NODE_ENV ? true : false
})

const bot = controller.spawn({
  token: process.env.VUEBRASIL || 'INSERT API_TOKEN'
}).startRTM()

controller.hears([/(help|ajuda)/i], 'direct_message,direct_mention,mention', (bot, message) => {
  bot.reply(message, 'Eu posso ajudar!')
})
