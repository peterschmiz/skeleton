const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cached');
const gulpif = require('gulp-if');
const minimist = require('minimist');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;

const knownOptions = {
  default: {
    production: 'false',
  },
};

const options = minimist(process.argv.slice(2), knownOptions);

gulp.task('imagemin', () =>
  gulp.src(`${config.directories.src}/images/assets/**/*`)
    .pipe(gulpif(options.production === 'false', cache('imagemin-compile')))
    .pipe(imagemin(
      [
        imagemin.gifsicle(),
        imagemin.jpegtran({
          progressive: true,
          arithmetic: false,
        }),
        imagemin.optipng({
          optimizationLevel: 3,
          bitDepthReduction: true,
          colorTypeReduction: true,
          paletteReduction: true,
        }),
        imagemin.svgo({
          plugins: [
            { removeUnknownsAndDefaults: true },
            { removeEditorsNSData: true },
            { removeTitle: true },
            { convertColors: true },
            { removeUnusedNS: true },
            { removeComments: true },
            { removeEmptyContainers: true },
            { cleanupEnableBackground: true },
            { minifyStyles: true },
            { removeUselessStrokeAndFill: true },
            { sortAttrs: true },
            { removeStyleElement: false },
            { cleanupIDs: true },
            { removeDoctype: true },
            { removeViewBox: true },
          ],
        }),
      ]
    ))
    .pipe(gulp.dest(`${config.directories.dist}/images`))
);
