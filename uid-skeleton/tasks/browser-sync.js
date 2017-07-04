const gulp = require('gulp');
const browserSync = require('browser-sync');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init({
    proxy: 'http://localhost:3000',
    files: [
      `${config.directories.dist}/js/**/*.js`,
      `${config.directories.dist}/css/**/*.css`,
      `${config.directories.src}/views/**/*`,
    ],
    port: 3001,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false,
    },
    logLevel: 'silent',
  });
});
