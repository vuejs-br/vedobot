
const redis = require('redis')
const client = redis.createClient()


// Check if property exists
// ========================
// key, date {String}
module.exports = (key, date) => {
  return new Promise((resolve, reject) => {
    client.expire(key, (new Date(date) - new Date().getTime()), (err, res) => err ? reject(err) : resolve(res))
  })
}
