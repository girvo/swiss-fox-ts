import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'tmp/app.js',
  plugins: [
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      skip: [],       // Skip listed import and don't bundle them
      browser: true,
      extensions: [ '.js', '.json' ],
      preferBuiltins: false
    }),

    // Wire in commonjs plugin for node_modules handling
    commonjs()
  ],
  targets: [
    { dest: 'public/js/app.js', format: 'iife', exports: 'none' }
  ]
}
