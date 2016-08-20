
const redis = require('redis')
const client = redis.createClient()

// Get some hash
// =============
// hashKey {Array}
module.exports = (...hashKey) => {
  return new Promise((resolve, reject) => {
    client.hget(hashKey, (err, res) => err ? reject(err) : resolve(res))
  })
}
