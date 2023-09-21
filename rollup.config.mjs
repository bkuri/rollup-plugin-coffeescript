import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import pkg from './package.json' assert { type: 'json' }

const globals = {
  coffeescript: 'coffeescript',
  path: 'path',
  picomatch: 'pm'
}

export default [
  {
    external: [ 'coffeescript' ],
    input: 'src/index.js',
    output: [
      { file: pkg.main  , format: 'cjs' },
      { file: pkg.module, format: 'esm' }
    ],
    plugins: [
      nodeResolve({ resolveOnly: [ '@rollup/pluginutils' ] })
    ]
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.browser, format: 'umd', globals, name: 'rollup-plugin-coffeescript' }
    ],
    plugins: [
      commonjs(),
      nodePolyfills({ include: [ 'path' ] }),
      nodeResolve()
    ]
  }
]