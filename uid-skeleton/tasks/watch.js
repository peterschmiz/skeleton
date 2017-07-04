const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;

gulp.task('watch', () => {
  gulp.watch(path.join(`${config.directories.src}/css/**/*.pcss`), ['postcss']);
  gulp.watch(path.join(`${config.directories.src}/js/**/*.js`), ['webpack']);
  gulp.watch(path.join(`${config.directories.src}/images/assets/**/*`), ['imagemin']);
  gulp.watch(path.join(`${config.directories.src}/images/svg/**/*.svg`), ['svg']);
  gulp.watch(path.join(`${config.directories.src}/fonts/**/*.{ttf,woff,woff2,eof,svg}`), ['fonts']);
});
