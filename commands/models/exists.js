
const redis = require('redis')
const client = redis.createClient()


// Check if property exists
// ========================
// key {String}
module.exports = key => {
  return new Promise((resolve, reject) => {
    client.exists(key, (err, res) => err ? reject(err) : resolve(res))
  })
}
