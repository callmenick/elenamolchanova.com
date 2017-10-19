'use strict';

var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');

/* styles tasks */

gulp.task('styles:dev', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('./css'));
});

gulp.task('styles:prod', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(gulp.dest('./css'));
});

/* build tasks */

gulp.task('build:dev', ['styles:dev']);

gulp.task('build:prod', ['styles:prod']);

/* server tasks */

gulp.task('serve:dev', function() {
  browserSync.init({
    server: './'
  });

  gulp.watch('./sass/**/*.scss', ['styles:dev']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

/* default tasks */

gulp.task('default', ['build:dev']);
