// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'index.js',
  output: {
    file: 'fancy-modal.js',
    format: 'umd',
    globals: {
      'dom': 'dom',
      'Modal': 'modal',
      '$': 'jquery'
    },
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),

  ]
};