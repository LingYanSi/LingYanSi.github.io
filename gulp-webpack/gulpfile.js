/*
* @Author: zikong
* @Date:   2015-09-13 02:00:20
* @Last Modified by:   zikong
* @Last Modified time: 2015-09-13 02:25:40
*/

'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    clean = require("gulp-clean"),//清理目录
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify');

gulp.task('css', function() {
  return gulp.src(['build/css/*.css','build/css/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'firefox 20', 'ie 8', 'chrome 20', 'ios 7', 'android 4'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('js', function() {   // *表示任意的js文件
  return gulp.src(['build/js/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// gulp.task('clean', function() {  // 先清除目标文件夹
//   return gulp.src(['dist/css', 'dist/js' ], {read: false}).pipe(clean());
// });

gulp.task('default',['watch'], function() {  // 配置默认任务
    gulp.start('css', 'js');
});

gulp.task('watch', function() {

  // 看守所有.scss档
  gulp.watch('build/css/*.scss', ['css']);

  // 看守所有.js档
  gulp.watch('build/js/*.js', ['js']);

  // 看守所有图片档
  // gulp.watch('src/images/**/*', ['images']);

  // // 建立即时重整伺服器
  // var server = livereload();

  // // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
  // gulp.watch(['dist/**']).on('change', function(file) {
  //   server.changed(file.path);
  // });

});
