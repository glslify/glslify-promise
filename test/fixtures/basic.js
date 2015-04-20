const glslify = require('glslify-promise')

glslify('./basic.glsl', {}).then(function(source) {
  console.log(source)
}).catch(function(err) {
  console.error(err)
})
