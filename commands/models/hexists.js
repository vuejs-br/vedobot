
const redis = require('redis')
const client = redis.createClient()


// Check if hash exists
// ====================
// hashKey {Array}
module.exports = (...hashKey) => {
  return new Promise((resolve, reject) => {
    client.hexists(hashKey, (err, res) => err ? reject(err) : resolve(res))
  })
}
