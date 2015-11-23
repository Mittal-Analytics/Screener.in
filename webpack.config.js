"use strict";
/* global process */
var path = require("path");
var webpack = require('webpack');

var isProduction = process.env.NODE_ENV == 'production';

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

  var plugins = [uglyWarnings];
  if(isProduction)
    plugins.push(setProductionEnv);

  var babel = 'babel?presets[]=react,presets[]=es2015';
  var loader = [babel];
	var loaders = [
    {test: /\.jsx$/, loaders: loader, exclude: /(node_modules)/},
    {test: /\.js$/, loaders: loader, exclude: /(node_modules)/}
  ];

  return {
    entry: entry,
    output: output,
    plugins: plugins,
    module: {
			loaders: loaders
    }
  };
}();
