const path = require('path');

module.exports = {
  entry: './src/Main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};