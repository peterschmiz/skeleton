const gulp = require('gulp');
const cache = require('gulp-cached');
const gulpif = require('gulp-if');
const webpack = require('webpack-stream');
const minimist = require('minimist');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;

const knownOptions = {
  default: {
    lint: 'true',
    production: 'false',
  },
};

const options = minimist(process.argv.slice(2), knownOptions);

const webpackConfig = options.production === 'false' ?
  require('../webpack.config.js') :
  require('../webpack.production.config.js');

if (options.lint === 'false') {
  webpackConfig.module.loaders.pop();
}

gulp.task('webpack', () =>
  gulp.src(`${config.directories.src}/js/app.js`)
    .pipe(plumber({
      errorHandler: function onError(err) {
        gutil.log(err);
        this.emit('end');
      },
    }))
    .pipe(gulpif(options.production === 'false', cache('webpack-compile')))
    .pipe(webpack(webpackConfig))
    .on('error', function onError() {
      this.emit('end');
    })
    .pipe(gulp.dest(`${config.directories.dist}/js`))
);

