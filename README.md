# rollup-plugin-coffeescript

![rollup + coffeescript](https://repository-images.githubusercontent.com/513663406/fa56f07a-86ee-4a11-932e-ed1d8016c1de)

Modern rollup with coffeescript. Sourced from [lautis/rollup-plugin-coffee-script](https://github.com/lautis/rollup-plugin-coffee-script), refactored and updated libraries.

## Why?

Allow CoffeeScript code to be included in Rollup bundles without introducing an additional build step.

## Installation

```bash
npm install --save-dev @bkuri/rollup-plugin-coffeescript
# or
yarn add -D @bkuri/rollup-plugin-coffeescript
# or
pnpm add -D @bkuri/rollup-plugin-coffeescript
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
