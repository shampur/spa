var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var browserify = require('browserify');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

var jsConfig = {
    entry: './js/init.js',
    jsmapsdir: './dist/maps/js/',
    jsbuilddir: './dist/js/',
    cssbuilddir: './dist/css/',
    cssmapsdir: './dist/maps/css/',
    outputfile: 'bundle.js',
    sasssrc: './sass/'
};


gulp.task('serve', function() {
    connect.server({
        livereload: true,
        root: ['.', './dist/']
    });
});

gulp.task('build-js', function() {
    var b = browserify({
        entries: jsConfig.entry,
        debug: true,
        transform: [reactify]
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(rename(jsConfig.outputfile))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write(jsConfig.mapsdir))
        .pipe(gulp.dest(jsConfig.builddir));
});

gulp.task('build-css', function() {
    return gulp.src(jsConfig.sasssrc)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write(jsConfig.cssmapsdir))
        .pipe(gulp.dest(jsConfig.cssbuilddir));
});