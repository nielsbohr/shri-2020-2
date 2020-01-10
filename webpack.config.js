const { resolve } = require('path');

module.exports = {
  mode: 'production',
  watch: true,
  entry: './src/index.ts',
  output: {
    path: resolve(__dirname, 'build/'),
    filename: 'linter.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  node: {
    global: true,
    __filename: 'mock',
    __dirname: 'mock',
  },
};
