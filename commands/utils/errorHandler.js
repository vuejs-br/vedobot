
// Error handler
// =============
// err {Object}
module.exports = err => {
  err = err.toString()
  return `Aconteceu um erro, olha só: ${err}`
}
