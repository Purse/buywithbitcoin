const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './src/content/index.js',
    index_purse: './src/content/index_purse.js',
    event: './src/event/index.js',
    popup: './src/popup/index.js',
  },

  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
    modules: ['node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.js|jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        'manifest.json',
        {
          from: 'src/popup/index.html',
          to: 'popup.html',
        },
        {
          from: 'src/scripts',
          to: 'scripts',
        },
        {
          from: 'src/styles',
          to: 'styles',
        },
        {
          from: 'icons',
          to: 'icons',
        },
      ],
    }),
  ],
};
