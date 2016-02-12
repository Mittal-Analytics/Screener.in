"use strict";
/* global process, __dirname */
var path = require("path");
var webpack = require('webpack');

var isProduction = process.env.NODE_ENV == 'production';

var polyfills = new webpack.ProvidePlugin({
  'Promise': 'exports?global.Promise!es6-promise',
  'window.fetch': 'exports?self.fetch!whatwg-fetch'
});

var uglyWarnings = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});

var setProductionEnv = new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production'),
     }
});


module.exports = function(){
  var entry = [
    './app/index.js',
  ];

  var output = {
    path: path.resolve('.'),
    filename: 'bundle.js',
  };

  var plugins = [uglyWarnings, polyfills];
  if(isProduction)
    plugins.push(setProductionEnv);

	var loaders = [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
    { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"}
  ];

  return {
    entry: entry,
    output: output,
    plugins: plugins,
    module: {
			loaders: loaders
    },
    resolve: {
      root: path.resolve(__dirname),
      alias: {
        app: "app"
      },
      extensions: ['', '.js', '.jsx']
    }
  };
}();
