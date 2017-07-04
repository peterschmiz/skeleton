const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    `${config.directories.src}/js/app`,
  ],
  output: {
    path: path.resolve(__dirname, `${config.directories.dist}/js`),
    filename: 'app.bundle.js',
  },
  devtool: 'source-map',
  node: {
    fs: 'empty',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'es2016'],
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
        options: {
          rules: { semi: 0 },
          configFile: path.resolve(__dirname, '.eslintrc.json'),
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
