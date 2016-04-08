const Promise = global.Promise || require('es6-promise').Promise
const glslify = require('glslify')
var path = require('path')
var callsite = require('callsite')

module.exports = createPromise

function createPromise(filename, options) {
  if (!filename) return '';

  if (!path.isAbsolute(filename)) {
    var stack = callsite();
    var caller = stack[1].getFileName();
    filename = path.resolve(path.dirname(caller), filename)
  }

  return new Promise(function(resolve, reject) {
    glslify.bundle(filename, options || {}, function(err, result) {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
