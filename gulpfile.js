var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var browserify = require('browserify');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var exec = require('child_process').exec;
var colors = require('colors');

var jsConfig = {
    entry: './js/init.js',
    jssrc: './js/',
    jsmapsdir: './maps/',
    jsbuilddir: './dist/js/',
    cssbuilddir: './dist/css/',
    cssmapsdir: './maps/',
    outputfile: 'bundle.js',
    sasssrc: './sass/',
    builddir: './dist/',
    fontdir: './node_modules/font-awesome/**/*',
    handlebarsdir: './node_modules/handlebars/dist/handlebars.runtime.js',
    fontdistdir: './dist/font-awesome/',
    templatesdir: './templates/'
};


gulp.task('serve', function() {
    connect.server({
        livereload: true,
        root: ['.', './dist/']
    });
});

gulp.task('watch-and-reload', ['build'], function() {
    console.log(colors.green('Server reloading'));
    return watch([jsConfig.cssbuilddir + '**', jsConfig.jsbuilddir + '**', jsConfig.builddir + '**'])
        .pipe(connect.reload());
});

gulp.task('build', ['handlebars', 'build-js', 'build-css', 'fonts', 'html']);

gulp.task('watch', function(){
    gulp.watch(jsConfig.sasssrc + '**', ['build-css']);
    gulp.watch(jsConfig.jssrc + '**', ['build-js']);
    gulp.watch('./index.html', ['html']);
    gulp.watch(jsConfig.templatesdir + '*.handlebars', ['build-js']);

});

gulp.task('build-js', ['templates'], function() {
    var b = browserify({
        entries: jsConfig.entry,
        debug: true,
        transform: [reactify]
    });

    return b.bundle()
        .pipe(source(jsConfig.outputfile))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write(jsConfig.jsmapsdir))
        .pipe(gulp.dest(jsConfig.jsbuilddir));
});

gulp.task('build-css', function() {
    return gulp.src(jsConfig.sasssrc + '**')
        .pipe(concat('app.css'))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write(jsConfig.cssmapsdir))
        .pipe(gulp.dest(jsConfig.cssbuilddir));
});

gulp.task('html', function () {
    gulp.src('./index.html')
        .pipe(gulp.dest(jsConfig.builddir));
});

gulp.task('fonts', function() {
   gulp.src(jsConfig.fontdir)
       .pipe(gulp.dest(jsConfig.fontdistdir));
});

gulp.task('handlebars', function(){
    gulp.src(jsConfig.handlebarsdir)
        .pipe(gulp.dest(jsConfig.builddir));
});

gulp.task('templates', function() {
    exec('npm run compileTemplates', function(err, stdout, stderr){
        if(err) {
            console.log(colors.red(err));
        } else {
            console.log(colors.green('Templates Compiled Successfully!!'));
        }
    });
});

gulp.task('default', ['build', 'serve', 'watch', 'watch-and-reload']);