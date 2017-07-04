const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const newer = require('gulp-newer');
const gulpif = require('gulp-if');

const filter = require('gulp-filter');
const postcssImport = require('postcss-import');
const customProperties = require('postcss-custom-properties');
const willChange = require('postcss-will-change');
const stylelint = require('stylelint');
const cssMqPacker = require('css-mqpacker');
const browserSync = require('browser-sync');
const precss = require('precss');
const postcssUtilities = require('postcss-utilities');
const postcssCssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');
const responsiveType = require('postcss-responsive-type');
const cssnano = require('cssnano');
const lost = require('lost');
const minimist = require('minimist');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const fs = require('fs');
const postcssEach = require('postcss-each');
const postcssAtRulesVars = require('postcss-at-rules-variables');

const config = JSON.parse(fs.readFileSync('./package.json')).siteConfig;

const knownOptions = {
  default: {
    lint: 'true',
    production: 'false',
  },
};

const options = minimist(process.argv.slice(2), knownOptions);

const plugins = [
  stylelint,
  postcssImport,
  willChange,
  postcssAtRulesVars,
  postcssEach,
  customProperties,
  postcssCssnext({
    features: {
      customProperties: false,
    },
  }),
  precss({
    properties: {
      disable: true,
    },
  }),
  postcssUtilities,
  responsiveType,
  lost,
  cssMqPacker,
  postcssReporter({
    plugins: ['stylelint'],
    clearReportedMessages: true,
  }),
];

if (options.production === 'true') {
  plugins.push(cssnano({
    autoprefixer: false,
    discardUnused: {
      fontFace: false,
    },
    discardComments: {
      removeAll: true,
    },
  }));
}

gulp.task('postcss', () => {
  const f = filter(['**', '!**/_*.pcss'], { restore: false });

  return gulp.src([`${config.directories.src}/css/**/*.pcss`])
    .pipe(plumber({
      errorHandler: function onError(err) {
        gutil.log(err);
        this.emit('end');
      },
    }))
    .pipe(gulpif(options.production === 'false', newer(`${config.directories.dist}/css`)))
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(f)
    .pipe(rename({ extname: '.css' }))
    .pipe(sourcemaps.write('./maps', {
      mapFile: mapFilePath => (
        mapFilePath.replace('.pcss', '.map')
      ),
    }))
    .pipe(gulp.dest(`${config.directories.dist}/css`))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});
