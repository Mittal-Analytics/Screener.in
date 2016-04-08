"use strict";

const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');
var webpackAlias = require('jest-webpack-alias');

module.exports = {
  process(src, filename) {
    if (filename.indexOf('node_modules') === -1) {
      if (babel.util.canCompile(filename)) {
        src = babel.transform(src, {
          auxiliaryCommentBefore: ' istanbul ignore next ',
          filename,
          presets: [jestPreset],
          retainLines: true
        }).code;
      }
      src = webpackAlias.process(src, filename);
    }
    return src;
  }
};
