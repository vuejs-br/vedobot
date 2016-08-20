
const redis = require('redis')
const client = redis.createClient()

// Get hash fields
// ===============
// hashKeyFields {Array}
module.exports = (...hashKeyFields) => {
  return new Promise((resolve, reject) => {
    client.hmget(hashKeyFields, (err, res) => err ? reject(err) : resolve(res))
  })
}
