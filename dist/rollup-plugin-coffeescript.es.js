const { compile } = require('coffeescript');
const { createFilter } = require('@rollup/pluginutils');
const { extname } = require('path');

const DEFAULTS = {
  bare: true,
  extensions: [ '.coffee', '.litcoffee' ],
  literateExtensions: [ '.litcoffee', '.md' ],
  sourceMap: true
};

function buildOptions(ext, base) {
  const { literateExtensions: lit } = base;

  delete base.exclude;
  delete base.extensions;
  delete base.include;
  delete base.literateExtensions;

  return lit?.includes(ext) ? { ...base, literate: true } : base
}

function grind(options) {
  options = { ...DEFAULTS, ...options };
  const { exclude, extensions, include } = options;
  const filter = createFilter(include, exclude);
  
  const transform = (coffee, id) => {
    const ext = extname(id);
    if (!filter(id) || !extensions.includes(ext)) return null
    const { js: code, v3SourceMap } = compile(coffee, buildOptions(ext, options));

    if (v3SourceMap) return { code, map: JSON.parse(v3SourceMap) }
    return { code }
  };
  
  return { transform }
}

module.exports = grind;
