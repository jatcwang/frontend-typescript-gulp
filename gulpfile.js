var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var ts          = require('gulp-typescript');
var concat      = require('gulp-concat');
// var expect = require('gulp-expect-file');

var tsFilePath = 'src/ts/**/*.ts';
var tsxFilePath = 'src/ts/**/*.tsx';
var scssFilePath = 'src/scss/**/*.scss';
var outputDirectory = 'out';
var jsOutputPath = outputDirectory + '/js';
var jsOutFileName = 'output.js';
var cssOutputPath = outputDirectory + '/css';

var tsProject = ts.createProject('tsconfig.json', {
  module: 'amd',
  target: 'ES5',
  jsx: 'react',
  typescript: require('typescript'), //use our own version of typescript
  // out: jsOutFileName,
})

gulp.task('typescript', function() {
  console.log('Compiling Typescript');
  var jsOutput = gulp.src([tsFilePath,tsxFilePath])
    // .pipe(expect(tsFilePath))
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .js; //get the js output, not the definition file
  return jsOutput
    .pipe(concat(jsOutFileName))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(jsOutputPath))
    .pipe(reload({stream: true}));
});

gulp.task('sass', function () {
  return gulp.src(scssFilePath)
    // .expect(scssFilePath)
    .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['.']}))
    .pipe(sourcemaps.write())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(cssOutputPath))
    .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./" + outputDirectory
    },
    // browser: "google-chrome-stable"
    open: false,
  });
});

// Default task to be run with `gulp`
gulp.task('default', ['typescript', 'sass', 'browser-sync'], function () {
   //watch ts/scss files and compile when any of them changes
  gulp.watch([tsFilePath, tsxFilePath], ['typescript']);
  gulp.watch(scssFilePath, ['sass']);
});
