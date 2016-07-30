
const Botkit = require('botkit')
const commands = require('./commands')

const controller = Botkit.slackbot({
  debug: process.env.NODE_ENV ? true : false
})

const bot = controller.spawn({
  token: process.env.VUEBRASIL || 'INSERT API_TOKEN'
}).startRTM()

commands(controller)
