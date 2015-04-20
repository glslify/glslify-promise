const Promise = global.Promise || require('es6-promise').Promise
const glslify = require('glslify')

module.exports = createPromise

function createPromise(filename, options) {
  return new Promise(function(resolve, reject) {
    glslify.bundle(filename, options || {}, function(err, result) {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
