const gulp = require('gulp');
const inject = require('gulp-inject');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;

gulp.task('inject', ['inject-index']);

gulp.task('inject-index', () => {
  const target = gulp.src(`${config.directories.dist}/index.html`);
  const sources = gulp.src([
    './../css/critical/index.css',
  ]);

  return target.pipe(inject(sources, {
    removeTags: true,
    transform: (filePath, file) => (file.contents.toString('utf8')),
  })).pipe(gulp.dest(config.directories.dist));
});
