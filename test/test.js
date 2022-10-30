import { compile } from 'coffeescript'
import { equal, ok } from 'assert'
import { readFileSync } from 'fs'
import { rollup } from 'rollup'
import coffee from '../dist/rollup-plugin-coffeescript.mjs'

const OPTIONS = { format: 'es' }
const RESULT = 'answer = 42'

const bundle = ({ generate }) => generate(OPTIONS)
const extensions = [ '.coffee', '.js' ]
const test = (input, ...plugins) => rollup({ input, plugins }).then(bundle).then(verify)

function verify ({ output }, result=RESULT) {
  const { code } = output[0]
  ok(code.includes(result))
}

// change current path
process.chdir('test/sample')

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
