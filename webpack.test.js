const path = require('path');

module.exports = {
  entry: 'mocha-loader!./test.js',
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'bundle.test.js',
    publicPath: 'http://localhost:3000/build',
  },
  devServer: {
    port: 3000,
  },
};
