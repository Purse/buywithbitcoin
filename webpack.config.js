const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './content/src/scripts/index.js',
    index_purse: './content/src/scripts/index_purse.js',
    event: './event/src/index.js',
    popup: './popup/src/scripts/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
    modules: ['node_modules']
  },

  module: {
    rules: [
      {
        test: /\.js|jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.css?$/,
        use: [ 'style-loader', 'css-loader' ],
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      'manifest.json',
    {
      from: 'popup/src/index.html',
      to: 'popup.html'
    },{
      from: 'scripts',
      to: 'scripts'
    },{
      from: 'styles',
      to: 'styles'
    },{
      from: 'icons',
      to: 'icons'
    }])
  ]
};
