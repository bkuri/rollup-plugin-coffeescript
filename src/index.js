import { compile } from 'coffeescript'
import { createFilter } from '@rollup/pluginutils'

const DEFAULTS = {
  bare: true,
  header: false,
  extensions: [ '.coffee', '.litcoffee' ],
  literateExtensions: [ '.litcoffee', '.md' ]
}

function buildOptions(ext, base) {
  const { literateExtensions } = base

  delete base.exclude
  delete base.extensions
  delete base.include
  delete base.literateExtensions

  return literateExtensions?.includes(ext) ? { ...base, literate: true } : base
}

export default function coffee(options) {
  options = { ...DEFAULTS, ...options, sourceMap: true }

  const { exclude, extensions, include } = options
  const filter = createFilter(include, exclude)
  
  const transform = (coffee, id) => {
    const dot = '.'
    const ext = id.slice(1).includes(dot)? dot + id.split(dot).pop() : ''

    if (!filter(id) || !extensions.includes(ext)) return null
    const { js: code, v3SourceMap: map } = compile(coffee, buildOptions(ext, options))
    return { code, map }
  }
  
  return { transform }
}