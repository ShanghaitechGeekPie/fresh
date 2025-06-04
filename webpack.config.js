// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('atool-build/lib/webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const subscript = require('markdown-it-sub');
const superscript = require('markdown-it-sup');
const MarkdownIt = require('markdown-it');

module.exports = function (webpackConfig) {
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['antd', {
    style: 'css',  // if true, use less
  }]);

  // Enable this if you have to support IE8.
  // webpackConfig.module.loaders.unshift({
  //   test: /\.jsx?$/,
  //   loader: 'es3ify-loader',
  // });

  // Markdown files will be loaded dynamically via fetch
  // No need for webpack to process them

  // Fix UglifyJS error with ES6 code in node_modules/punycode
  webpackConfig.module.loaders.push({
    test: /\.js$/,
    include: /node_modules\/punycode/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      presets: ['es2015']
    }
  });



  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function(loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.test = /\.dont\.exist\.file/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.test = /\.less$/;
    }
  });

  // Load src/entries/*.js as entry automatically.
  const files = glob.sync('./src/entries/*.js');
  const newEntries = files.reduce(function(memo, file) {
    const name = path.basename(file, '.js');
    memo[name] = file;
    return memo;
  }, {});
  webpackConfig.entry = Object.assign({}, webpackConfig.entry, newEntries);

  
  webpackConfig['output'] = {
    path:  'dist/assets/',
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/assets/",
  };

  return webpackConfig;
};
