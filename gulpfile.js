'use strict';

let gulp          = require('gulp');
let browserSync   = require('browser-sync');
let sass          = require('gulp-sass');
let plumber       = require('gulp-plumber');
let autoprefixer  = require('gulp-autoprefixer');
let concat        = require('gulp-concat');
let uglify        = require('gulp-uglify');

gulp.task('serve', ['watch', 'sass', 'js'], () => {
  browserSync.init({
     server: {
         baseDir: './'
     }
  });
});

gulp.task('watch', () => {
  gulp.watch('./*.html', () => { browserSync.reload() });
  gulp.watch('./css/scss/*.scss', ['sass']);
  gulp.watch('./js/files/*.js', ['js']);
});

gulp.task('sass', () => {
    return gulp.src('./css/scss/styles.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src('./js/files/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
    // .pipe(browserSync.reload());
});

gulp.task('default', ['serve']);
