import { createRequire } from 'node:module'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'rollup-plugin-coffeescript'
    },
		plugins: [
			resolve(),
			commonjs()
		]
  },
  {
    external: [ 'coffeescript' ],
    input: 'src/index.js',
    output: [
      { file: pkg.main  , format: 'cjs' },
      { file: pkg.module, format: 'es'  }
    ]
  }
]