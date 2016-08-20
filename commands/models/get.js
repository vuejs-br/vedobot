
const redis = require('redis')
const client = redis.createClient()


// Get some property
// =================
// key {String}
module.exports = key => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => err ? reject(err) : resolve(res))
  })
}
