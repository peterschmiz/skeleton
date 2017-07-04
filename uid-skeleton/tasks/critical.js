const gulp = require('gulp');
const critical = require('critical');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;

gulp.task('critical', ['critical-index']);

gulp.task('critical-index', (cb) => {
  critical.generate({
    base: config.directories.dist,
    src: 'index.html',
    dest: 'css/critical/index.css',
    ignore: ['@font-face',/url\(/],
    dimensions: [{
      width: 1280,
      height: 700,
    }],
    minify: true,
    extract: true,
  }, cb.bind(cb));
});
