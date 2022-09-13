import { compile } from 'coffeescript'
import { dirname } from 'path'
import { equal, ok } from 'assert'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { rollup } from 'rollup'

import coffee from '../index.js'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'

const OPTIONS = { format: 'es' }
const RESULT = 'answer = 42'

const bundle = ({ generate }) => generate(OPTIONS)
const extensions = [ '.coffee', '.js' ]
const test = (input, ...plugins) => rollup({ input, plugins }).then(bundle).then(verify)

function verify ({ output }, result=RESULT) {
  const { code } = output[0]
  ok(code.includes(result))
}

// change current path to samples directory
process.chdir(`${ dirname(fileURLToPath(import.meta.url)) }/sample`)

describe('@rollup/plugin-coffeescript', function() {
  this.timeout(5000)

  it('runs code through coffeescript', () => {
    const input = 'basic/main.coffee'
    const source = readFileSync(input).toString()

    return rollup({ input, plugins: [ coffee() ]})
      .then(bundle)
      .then(({ output }) => {
        const { code } = output[0]
        equal(code.trim(), compile(source, { bare: true }).trim())
      })
  })

  it('only runs code with defined extensions through coffeescript', () => {
    return test('invalid-coffee.js', coffee(), nodeResolve({ extensions }))
  })

  it('works with requires when used with commonjs plugin', () => {
    const input = 'import-class/main.coffee'

    return rollup({ input, plugins: [ coffee(), commonjs({ extensions }) ]})
      .then(bundle)
      .then(result => verify(result, 'A$1 = class A'))
  })

  it('allows overriding default options', () => {
    const options = { extensions: [ '.md' ], literate: true }
    return test('litcoffee/example.coffee.md', coffee(options))
  })

  it('compiles .litcoffee', () => {
    return test('litcoffee/main.litcoffee', coffee({}))
  })

  it('passes proper source map to rollup', () => {
    const input = 'import-class/main.coffee'

    return rollup({ input, plugins: [ coffee() ]})
      .then(({ generate }) => generate({ ...OPTIONS, sourcemap: true }))
      .then(({ output }) => {
        const { map } = output[0]
        ok(map.sources.includes(input))
      })
  })
})
