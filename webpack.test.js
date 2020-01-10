const path = require('path');

module.exports = {
  entry: './test.js',
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'bundle.test.js',
    publicPath: 'http://localhost:3000/build',
  },
  module: {
    rules: [
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 3000,
  },
};
