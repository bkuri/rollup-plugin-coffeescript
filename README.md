# rollup-plugin-coffeescript

![rollup + coffeescript](https://repository-images.githubusercontent.com/513663406/c38d39b9-8103-45f9-a24e-e389cd5ec6c9)

Modern rollup with coffeescript. Sourced from [lautis/rollup-plugin-coffee-script](https://github.com/lautis/rollup-plugin-coffee-script), refactored and updated libraries.

## Why?

Allow CoffeeScript code to be included in Rollup bundles without introducing an additional build step.

## Installation

```bash
npm install --save-dev @bkuri/rollup-plugin-coffeescript
# or
yarn add -D @bkuri/rollup-plugin-coffeescript
# or
pnpm install -D @bkuri/rollup-plugin-coffeescript
```

## Usage

```js
// rollup.config.js
import coffee from '@bkuri/rollup-plugin-coffeescript'

export default {
  input: 'main.coffee',
  plugins: [
    coffee()
  ]
}
```

CoffeeScript plugin accepts `options.include` and `options.exclude` (each a minimatch pattern, or array of minimatch  patterns) to determine which files are compiled by CoffeeScript. By default, all files are transpiled.

## Integration with CommonJS modules

The CoffeeScript plugin doesn't resolve requires. Instead,
use `rollup-plugin-commonjs` and add `.coffee` (and optionally `.litcoffee` and `.md`) to `extensions`.

```js
import coffee from '@bkuri/rollup-plugin-coffeescript'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'

const extensions = [ '.coffee', '.js', '.litcoffee', '.md' ]

export default {
  input: 'main.coffee',
  plugins: [
    coffee(),
    commonjs({ extensions }),
    nodeResolve({ extensions })
  ]
}
```
