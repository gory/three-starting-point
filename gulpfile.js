var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var sass = require('gulp-sass');

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('images/'));
});

gulp.task('styles', function(){
  gulp.src(['src/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('styles/'))
});

gulp.task('scripts', function(){
  return gulp.src('src/scripts/main.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('scripts/'))
});

gulp.task('default', function(){
  gulp.watch("src/styles/**/*.scss", ['styles']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
});

gulp.task('all', ['images', 'styles', 'scripts']);