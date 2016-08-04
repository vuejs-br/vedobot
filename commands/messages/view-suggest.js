
module.exports = (title, status, vote) => {
  if (status == 'produção') {
    return `:zap: *${title}* - *${status}* - :+1: *${vote}*`
  }
  return `:zap: *${title}* - _${status}_ - :+1: *${vote}*`
}
