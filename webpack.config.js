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
    alias: {
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",     // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },

  module: {
    rules: [
      {
        test: /\.js|jsx?$/,
        loader: 'babel-loader',
        options: {
          "presets": [
            [
              "@babel/preset-env",
              {
                "targets": {
                  "node": "10"
                }
              }
            ],
            "@babel/preset-react"
          ]
        },
        exclude: /(node_modules)/,
      },
      {
        test: /\.css?$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "pio_[local]",
              },
            },
          }
        ],
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
          from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
        },
        // {
        //   from: 'src/scripts',
        //   to: 'scripts',
        // },
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
