export default {
	external: [ 'coffeescript' ],
  input: 'src/index.js',
  output: [{
    file: 'dist/rollup-plugin-coffeescript.mjs',
    format: 'es'
  }]
}
