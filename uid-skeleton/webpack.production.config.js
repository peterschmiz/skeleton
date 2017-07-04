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
          ignorePattern: '**/*.js',
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
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        dead_code: true,
        conditionals: true,
        comparisons: true,
        unused: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
