/*
* @Author: zikong
* @Date:   2015-09-13 02:00:20
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-17 21:12:57
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
    notify = require('gulp-notify'),
    babel = require('gulp-babel');
/*
gulp.task('css', function() {
  return gulp.src(['build/css/*.css','build/css/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'firefox 20', 'ie 8', 'chrome 20', 'ios 7', 'android 4'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});*/

gulp.task('js', function() {   // *表示任意的js文件
  return gulp.src(['build/*.js'])
    .pipe(babel())
    .pipe(concat('LYTools.js'))
    .pipe(gulp.dest('./'))
    .pipe(notify({ message: '灵岩-tools.js任务完成' }));

    console.log('js打包合并完成');
});

gulp.task('index', function(){
  return gulp.src(['./index/index-build.js'])
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('./index/'));

    console.log('首页js编译完');
})


gulp.task('default',['watch'], function() {  // 配置默认任务
    gulp.start('js','index');
});

gulp.task('watch', function() {


  // 看守所有.js档
  gulp.watch('build/*.js', ['js']);
  gulp.watch('build/index-build.js', ['index']);


});
