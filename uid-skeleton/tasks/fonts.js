const gulp = require('gulp');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;

gulp.task('fonts', () => {
  gulp.src(`${config.directories.src}/fonts/**/*.{ttf,woff,woff2,eof,svg}`)
    .pipe(gulp.dest(`${config.directories.dist}/fonts`));
});
