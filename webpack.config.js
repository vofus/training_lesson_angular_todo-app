"use strict";

var webpack = require('webpack');
var path    = require('path');

module.exports = {
  context: __dirname + '/app',
  entry: './index.js',
  devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
  output: {
    path: __dirname + '/app',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      // {test: /\.js$/, loader: 'babel'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.scss$/, loader: 'style!css!sass'}
    ]
  }
};