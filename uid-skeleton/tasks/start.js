const gulp = require('gulp');
const browserSync = require('browser-sync');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;
const reload = browserSync.reload;

gulp.task('start', ['browser-sync'], () => {
  gulp.watch(path.join(`${config.directories.src}/css/**/*.pcss`), ['postcss']);
  gulp.watch(path.join(`${config.directories.src}/js/**/*.js`), ['webpack', reload]);
  gulp.watch(path.join(`${config.directories.src}/images/assets/**/*`), ['imagemin', reload]);
  gulp.watch(path.join(`${config.directories.src}/images/svg/**/*.svg`), ['svg', reload]);
  gulp.watch(path.join(`${config.directories.src}/fonts/**/*.{ttf,woff,woff2,eof,svg}`), ['fonts', reload]);
});
