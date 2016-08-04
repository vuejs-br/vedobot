
module.exports = controller => {
  // Show message on joined
  controller.on('channel_joined', (bot, message) => {
    bot.reply(message, 'Bem Vindo! Aqui quem manda é eu porquê meu poder é mais de 8000 :P')
  })

  // Quention about angular
  controller.hears('.*(angular).*', 'direct_message,direct_mention,mention', (bot, message) => {
    const answers = [
      'Angular? Você sabe que meu poder é mais de 8000 neh?',
      'Tá falando de angular lek! *Aqui é Vuejs poha!* ele tem poder para derrubar todas as árvores do parque Ibirapuera!'
    ]
    bot.reply(message, answers[Math.random().toFixed(0)])
  })

  controller.on('ambient', (bot, message) => {
    // if added more automatic messages,
    // must be follow this standard

    const {text} = message

    // Jaba
    if (/.*(livro)+.*(vue)+/i.test(text)) return bot.reply(message, 'Um livro sobre Vue loko que tem o selo bot de aprovação é esse aqui: https://leanpub.com/livro-vue')
  })
}
