const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'linter.js',
  },
  node: {
    global: true,
    __filename: 'mock',
    __dirname: 'mock',
    fs: 'empty',
  },
  externals: {
    fs: "require('fs')",
    path: "require('path')",
  },
};
