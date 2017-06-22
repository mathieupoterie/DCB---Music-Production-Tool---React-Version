const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './App/index',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?plugins=react-hot-loader/babel',
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'App'),
      ],
    }, {
      test: /\.css$/,
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'App'),
      ],
      loader: 'style!css!postcss',
    }],
  },
};
