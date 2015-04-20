const transform  = require('../transform')
const browserify = require('browserify')
const test       = require('tape')
const path       = require('path')
const glslify    = require('../')
const fs         = require('fs')
const vm         = require('vm')

test('transform: simple test', function(t) {
  const glslSource = path.join(__dirname, 'fixtures', 'basic.glsl')
  const nodeSource = path.join(__dirname, 'fixtures', 'basic.js')

  browserify(nodeSource)
    .transform(transform)
    .bundle(bundled)

  function bundled(err, bundle) {
    if (err) return t.ifError(err)

    bundle = 'Promise = require("es6-promise").Promise;' + bundle

    vm.runInNewContext(bundle, {
      require: require,
      console: {
        error: function(err) { t.fail(err.stack || err) },
        log: receivedOutput
      }
    })
  }

  function receivedOutput(output) {
    t.ok(output, 'output provided')
    t.equal(typeof output, 'string', 'output is a string')
    t.notEqual(output.indexOf('snoise'), -1, 'output contains imported noise function')

    glslify(glslSource, {}).then(function(output2) {
      t.equal(output2, output, 'outputs are equivalent')
      t.end()
    }).catch(function(err) {
      t.fail(err.stack || err)
    })
  }
})
