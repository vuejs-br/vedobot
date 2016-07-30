
const help = require('./help')
const register = require('./register')
const view = require('./view')

module.exports = controller => {
  help(controller)
  register(controller)
  view(controller)
}
