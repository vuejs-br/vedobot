

module.exports = controller => {

  // Show message on joined
  controller.on('channel_joined', (bot, message) => {
    bot.reply(message, 'Tava sofrendo com Angular e React né rapa? Bem Vindo! Aqui quem manda é eu porquê meu poder é mais de 8000 :P')
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

      const {text} = message

      // Angular
      if (/.*(angular).*/.test(text)) return bot.reply(message, 'Angular serio? hahahha')

      // Angular
      if (/.*(vedobot).*/.test(text)) return bot.reply(message, 'Fuck yeah!!!')

      // React
      if (/.*(react).*/.test(text)) return bot.reply(message, 'Já disse que eu adoro o JSX, syntax linda!')

      // Windows
      if (/.*(windows).*/i.test(text)) return bot.reply(message, 'Já desinstalou o baidu desse windows ae?')

      // Hehe
      if (/.*(hehe|kkk|haha|hihi).*/i.test(text)) return bot.reply(message, 'Hahahahaha, esse cara é mó engraçado! deve ser programador Java.')

      // Jaba
      if (/.*(livro)+.*(vue)+/i.test(text)) return bot.reply(message, 'Um livro sobre Vue loko que tem o selo bot de aprovação é esse aqui: https://leanpub.com/livro-vue')

  });

  controller.hears(['keyword','^pattern$'],['message_received'],function(bot,message) {

    // do something to respond to message
    bot.reply(message,'You used a keyword!')

  })

}
