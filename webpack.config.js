const path = require('path');

module.exports = {
  entry: './src/Main.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
     {
       test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
       type: 'asset/resource',
     },
    ],
  },
};