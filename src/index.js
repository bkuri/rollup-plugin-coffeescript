import { compile } from 'coffeescript'
import { createFilter } from '@rollup/pluginutils'
import { extname } from 'path'

const DEFAULTS = {
  bare: true,
  header: false,
  extensions: [ '.coffee', '.litcoffee' ],
  literateExtensions: [ '.litcoffee', '.md' ]
}

function buildOptions(ext, base) {
  const { literateExtensions: lit } = base

  delete base.exclude
  delete base.extensions
  delete base.include
  delete base.literateExtensions

  return lit?.includes(ext) ? { ...base, literate: true } : base
}

export default function coffee(options) {
  options = { ...DEFAULTS, ...options, sourceMap: true }
  const { exclude, extensions, include } = options
  const filter = createFilter(include, exclude)
  
  const transform = (coffee, id) => {
    const ext = extname(id)
    if (!filter(id) || !extensions.includes(ext)) return null
    const { js: code, v3SourceMap: map } = compile(coffee, buildOptions(ext, options))
    return { code, map }
  }
  
  return { transform }
}