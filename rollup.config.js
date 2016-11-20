import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourcemaps from 'rollup-plugin-sourcemaps'

// Tiny shim to handle sourcemaps for dev instead of prod
const shouldUseSourcemaps = process.env.NODE_ENV !== 'production'
const guardedSourcemaps = () => {
  if (shouldUseSourcemaps) return sourcemaps()
  return (f) => f
}

export default {
  entry: '/var/tmp/ts/app.js',
  sourceMap: shouldUseSourcemaps,
  plugins: [
    // node-resolve for handling node_modules correctly
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      // Skip listed import and don't bundle them (useful for globals like jquery)
      skip: [],
      browser: true,
      extensions: ['.js', '.json'],
      preferBuiltins: false
    }),

    // Wire in commonjs plugin for node_modules handling
    commonjs(),

    // Source-map ingestion
    guardedSourcemaps()
  ],
  targets: [
    { dest: 'public/js/app.js', format: 'iife', exports: 'none' }
  ]
}
