
module.exports = (value, pattern) => {
  switch (pattern) {
    case 'remove':
      return /^\d{2}-\d{2}-\d{4}:\w+-?\w+$/.test(value)
      break;
    default:
      return /^\d{2}-\d{2}-\d{4}:\w+-?\w+:\w+-?\w+$/.test(value)
  }
}
