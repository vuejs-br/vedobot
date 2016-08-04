
const redis = require('redis')
const client = redis.createClient()

module.exports = hash => {
  return new Promise((resolve, reject) => {
    client.hgetall(hash, (err, res) => err ? reject(err) : resolve(res))
  })
}
