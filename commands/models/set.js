
const redis = require('redis')
const client = redis.createClient()


// Set some value
// ==============
// key, value {String}
module.exports = (key, value) => {
  return new Promise((resolve, reject) => {
    client.set(key, value, (err, res) => err ? reject(err) : resolve(res))
  })
}
