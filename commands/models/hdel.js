
const redis = require('redis')
const client = redis.createClient()

module.exports = (...keyField) => {
  return new Promise((resolve, reject) => {
    client.hdel(keyField, (err, res) => err ? reject(err) : resolve(res))
  })
}
