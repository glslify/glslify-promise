const test    = require('tape')
const path    = require('path')
const glslify = require('../')

test('node: simple test', function(t) {
  const source  = path.join(__dirname, 'fixtures', 'basic.glsl')
  const promise = glslify(source, {})

  promise.then(function(output) {
    t.ok(output, 'output provided')
    t.equal(typeof output, 'string', 'output is a string')
    t.notEqual(output.indexOf('snoise'), -1, 'output contains imported noise function')
    t.end()
  }).catch(function(err) {
    t.fail(err.message || err)
  })
})
