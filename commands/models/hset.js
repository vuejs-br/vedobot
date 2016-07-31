
const redis = require('redis')
const client = redis.createClient()

module.exports = (...hashKeyValues) => {
  return new Promise( (resolve, reject) => {
    client.hset(hashKeyValues, (err, res) => err ? reject(err) : resolve(res))
  })
}
