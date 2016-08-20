
// Check syntax
// ============
// value, pattern {String}
module.exports = (value, pattern) => {
  switch (pattern) {
    case 'remove':
      return /^\d{2}-\d{2}-\d{4}:\S+$/.test(value)
    case 'suggest':
      return /\s/.test(value)
    default:
      return /^\d{2}-\d{2}-\d{4}:\S+:\S+$/.test(value)
  }
}
