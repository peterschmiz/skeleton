const gulp = require('gulp');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;

gulp.task('deploy', () => {
  gulp.src(`${config.directories.dist}/**/*.*`)
    .pipe(gulp.dest(`${config.directories.deploy}/`));
});
