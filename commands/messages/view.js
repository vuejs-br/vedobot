
// Return message
// ==============
// register, title, author {String}
module.exports = (register, title, author) => {
  return `\n
:metal: *${register}*
\t\t*Titulo*: ${title}
\t\t*Autor*: ${author}\n`
}
