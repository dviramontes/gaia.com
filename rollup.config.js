import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);
const isProd = process.env.BUILD === 'production';

const plugins = [
  eslint(),
  babel({
    exclude: 'node_modules/**',
  }),
];

if (isProd) {
  plugins.push(istanbul({
    exclude: ['test/**/*', 'node_modules/**/*']
  }));
}

export default {
  entry: 'src/server.js',
  format: 'cjs',
  external,
  plugins,
  dest: 'dist/server.js',
  targets: [
    {
      dest: pkg.main,
      format: 'cjs',
      moduleName: 'server',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true
    }
  ]
}