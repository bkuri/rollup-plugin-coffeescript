import { nodeResolve } from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import pkg from './package.json' assert { type: 'json' }
import terser from '@rollup/plugin-terser'

const extensions = [
  '.coffee',
  '.js',
  '.litcoffee'
]

const globals = {
  coffeescript: 'coffeescript',
  picomatch: 'pm'
}

const resolveParams = {
  extensions,
  resolveOnly: [ '@rollup/pluginutils' ]
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
      nodeResolve(resolveParams),
      terser()
    ]
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.browser, format: 'umd', globals, name: 'rollup-plugin-coffeescript' }
    ],
    plugins: [
      nodePolyfills({ include: [ 'path' ] }),
      nodeResolve(resolveParams),
      terser()
    ]
  }
]