
const redis = require('redis')
const client = redis.createClient()

// Return all values
// =================
// pattern {String}
module.exports = pattern => {
  return new Promise((resolve, reject) => {
    client.keys(pattern, (err, res) => err ? reject(err) : resolve(res))
  })
}
