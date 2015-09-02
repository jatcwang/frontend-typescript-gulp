var gulp        = require('gulp');
var _           = require('lodash');
//transformations
var sass        = require('gulp-sass');
var minifyCss   = require('gulp-minify-css');
var uglify      = require('gulp-uglify');
//tools
var browserify  = require('browserify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var sourcemaps  = require('gulp-sourcemaps'); //other tools
var concat      = require('gulp-concat');
var gutil       = require('gulp-util');
var browserSync = require('browser-sync');
//environmental management
var args        = require('yargs').argv;
var gulpif      = require('gulp-if');

var isProduction = args.env === "p" || args.env === "production";

/*
=== CONFIGS ===
*/

var tsFileBase = 'src/ts/';
var mainFileName = tsFileBase + 'DemoProps.tsx';
var tsFilePath = tsFileBase + '**/*.ts';
var tsxFilePath = tsFileBase + '**/*.tsx';
var scssFilePath = 'src/scss/**/*.scss';
var staticFileBase = 'src/static/';
var outputDirectory = isProduction? 'release' : 'out';
var jsOutputPath = outputDirectory + '/js';
var jsOutFileName = 'output.js';
var cssOutputPath = outputDirectory + '/css';

//typescript compiler options
var tsOpts = {
  noImplicitAny: true,
  typescript: require('typescript') //use our own version of typescript compiler
}

//Use watchify's default options for browserify, as well as setting some of our own
var browserifyOpts = _.assign({}, watchify.args, {
  entries: [mainFileName],
  debug: true
});

/*
=== DEFINE OUR GULP TASKS ===
*/

gulp.task('watchAndBuild', function() {
  //setup the watchify/browserify object
  var b = watchify(browserify(browserifyOpts))
    .plugin('tsify', tsOpts); // and add the typescript plugin for TS compilation

  //setup what browserify will do for various events
  b.on('update', bundle);
  b.on('log', gutil.log);

  //define the rebundling function
  function bundle() {
    return b
      .bundle()
      .on('error', function(error) {console.error(error.toString())})
      .pipe(source(jsOutFileName))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulpif(isProduction, uglify())) //only uglify in production
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(jsOutputPath))
      .pipe(browserSync.reload({stream: true}));
  }

  return bundle();
})

//The SASS compilation task
gulp.task('sass', function () {
  return gulp.src(scssFilePath)
    // .expect(scssFilePath)
    .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['.']}))
        .pipe(gulpif(isProduction, minifyCss())) //only minify css in production
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cssOutputPath))
    .pipe(browserSync.reload({stream:true}));
});

//copy files from html folder
gulp.task('copyStatic', function() {
  return gulp.src(staticFileBase + "*")
    .pipe(gulp.dest(outputDirectory));
});

// The browser-sync task will run a local server
// when a reload event is called, it will reload the browser page
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
gulp.task('default', ['copyStatic', 'watchAndBuild', 'sass', 'browser-sync'], function () {
   //watch sass files and compile when any of them changes
  gulp.watch(scssFilePath, ['sass']);
});
