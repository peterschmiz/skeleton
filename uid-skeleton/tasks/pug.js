const gulp = require('gulp');
const cache = require('gulp-cached');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const pug = require('gulp-pug');
const minimist = require('minimist');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const data = require('gulp-data');
const fs = require('fs');

const mainConfig = JSON.parse(fs.readFileSync('./package.json'));
const config = mainConfig.siteConfig;
const localData = JSON.parse(fs.readFileSync(config.directories.views.localData)) || {};
const pugData = Object.assign({}, localData, { config: mainConfig.siteConfig });

const knownOptions = {
  default: {
    production: 'false',
  },
};

const options = minimist(process.argv.slice(2), knownOptions);

gulp.task('pug', () =>
  gulp.src(`${config.directories.src}/views/*.pug`)
    .pipe(plumber({
      errorHandler: function onError(err) {
        gutil.log(err);
        this.emit('end');
      },
    }))
    .pipe(gulpif(options.production === 'false', cache('pug-compile')))
    .pipe(data(pugData))
    .pipe(pug({
      pretty: true,
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(config.directories.dist))
);
