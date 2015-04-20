# glslify-promise

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A Promise wrapper for glslify, providing a consistent interface between both [Node.js](http://nodejs.org/) and
[browserify](http://browserify.org/).

Intended for use with [Pex](http://github.com/vorg/pex).

## Usage

[![NPM](https://nodei.co/npm/glslify-promise.png)](https://nodei.co/npm/glslify-promise/)

### `promise = glslify(file, [options])`

Where `file` and `options` accept the same arguments as
the [glslify](http://github.com/stackgl/glslify) package.

For example, the following should work out of the box with Node:

``` javascript
var glslify = require('glslify-promise')
var promise = glslify(__dirname + '/shader.glsl')

promise.then(function(source) {
  console.log(source) // your glslified GLSL source!
})
```

By adding `glslify-promise/transform` to your `package.json`
file, you should be able to do the same in browserify too:

``` json
{
  "browserify": {
    "transform": [
      "glslify-pex/transform"
    ]
  }
}
```

Note that like [glslify](http://github.com/stackgl/glslify)
and [brfs](http://github.com/substack/brfs) file paths need
to be statically determinable, meaning that you can't use
variables in your require statements. The
following script would produce an error when running with
browserify:

``` javascript
var glslify  = require('glslify')
var filename = __dirname + '/shader.glsl'

var promise = glslify(filename)
```

Whereas the following is still valid:

``` javascript
var glslify = require('glslify')
var promise = glslify(__dirname + '/shader.glsl')
```

Also note that this package is using the native `Promise` global.
For cross-browser compatibility you'll want to include the
[es6-promise](http://ghub.io/es6-promise) polyfill.

## Contributing

See [stackgl/contributing](https://github.com/stackgl/contributing) for details.

## License

MIT. See [LICENSE.md](http://github.com/stackgl/glslify-promise/blob/master/LICENSE.md) for details.
