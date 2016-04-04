const staticModule = require('static-module')
const through      = require('through2')
const glslify      = require('glslify')
const nodeResolve  = require('resolve')
const path         = require('path')

module.exports = glslifyPromiseTransform

function glslifyPromiseTransform(filename, opts) {
  if (path.extname(filename) === '.json') return through()

  const transformer = staticModule({
    'glslify-promise': glslifyReplace
  }, {
    vars: {
      __dirname: path.dirname(filename),
      __filename: filename,
      require: {
        resolve: nodeResolve
      }
    }
  })

  return transformer

  function glslifyReplace(glslFile, opts) {
    const origin = require.resolve('./wrapper')
    const stream = through()

    opts = opts || {}
    opts.basedir = opts.basedir || path.dirname(filename)

    glslify.bundle(glslFile, opts, function(err, source) {
      if (err) return transformer.emit('error', err)

      stream.push('require("'+origin+'")(')
      stream.push(JSON.stringify(source))
      stream.push(')')
      stream.push(null)

    }).on('file', function(file) {
      transformer.emit('file', file)
    })

    return stream
  }
}
