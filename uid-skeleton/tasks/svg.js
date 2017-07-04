const gulp = require('gulp');
const path = require('path');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const cheerio = require('gulp-cheerio');
const svgstore = require('gulp-svgstore');
const gutil = require('gulp-util');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;

gulp.task('svg', () =>
  gulp.src(`${config.directories.src}/images/svg/**/*`)
    .pipe(cheerio({
      run($, file) {
        const filename = path.basename(file.path);

        if (filename.match(/-keepfill/ig) === null) {
          $('[fill]').removeAttr('fill');
        }

        if ($('[viewBox]').attr('viewBox') !== '0 0 256 256') {
          gutil.log(
            gutil.colors.red(`!!! Source SVG (${filename}) viewBox is not 0 0 256 256! Please fix !!!`)
          );
        }

        if ($('clipPath').length > 0) {
          gutil.log(
            gutil.colors.red(`!!! Source SVG (${filename}) has clipping paths! Please fix !!!`)
          );
        }
      },
      parserOptions: { xmlMode: true },
    }))
    .pipe(imagemin(
      [
        imagemin.svgo({
          plugins: [
            { convertStyleToAttrs: true },
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
    .pipe(rename((file) => {
      /* eslint-disable no-param-reassign */
      file.basename = `icon-${file.basename.replace('-keepfill', '')}`;
      /* eslint-enable no-param-reassign */
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename({ basename: 'svg-sprite' }))
    .pipe(gulp.dest(`${config.directories.dist}/images`))
);
