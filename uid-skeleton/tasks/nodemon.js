const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');

const reload = browserSync.reload;

gulp.task('nodemon', () => {
  let called = false;

  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: [
      '*/**',
    ],
    delay: 2000,
    stdout: true,
  }).on('start', () => {
    if (!called) {
      called = true;
    }
  }).on('restart', () => {
    setTimeout(() => {
      reload({ stream: false });
    }, 1000);
  });
});
