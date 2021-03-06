const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'js/app.js': [
      'babel-polyfill',
      './src/js/app.js'
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/app.css'
    }),
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: 'assets'
    }, {
      from: './src/modules',
      to: 'modules'
    }]),
    new HtmlWebpackPlugin({
      hash: true,
      minify: {
        collapseWhitespace: true,
      },
      template: './src/index.html',
      filename: 'index.html'
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]'
  },

  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [{
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              minimize: true
            }
          }]
        }),
        test: /(\.css|\.scss)$/,
      }
    ]
  },
  devServer: {
    port: 3000,
    contentBase: './dist',
    inline: true
  }
};
