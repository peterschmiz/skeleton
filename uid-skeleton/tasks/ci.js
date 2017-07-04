const gulp = require('gulp');
const fs = require('fs');
const replace = require('gulp-replace');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;

gulp.task('ci-deploy-replace-path', () => {
  gulp.src(`${config.directories.ci}/**/*.html`)
    .pipe(replace(/(\/css\/|\/images\/|\/js\/)/g, `${config.directories.ciPath}$1`))
    .pipe(gulp.dest(`${config.directories.ci}/`));
});

gulp.task('ci-deploy-assets', () => {
  gulp.src(`${config.directories.dist}/**/*.*`)
    .pipe(gulp.dest(`${config.directories.ci}/`));
});
