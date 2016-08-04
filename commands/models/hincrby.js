
const redis = require('redis')
const client = redis.createClient()

module.exports = (...hashValue) => {
  return new Promise( (resolve, reject) => {
    client.hincrby(hashValue, (err, res) => err ? reject(err) : resolve(res))
  })
}
