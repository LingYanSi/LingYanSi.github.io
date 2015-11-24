/*
* @Author: zikong
* @Date:   2015-09-13 02:00:20
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-14 02:15:04
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
    babel = require('gulp-babel') ,
    rev = require('gulp-rev') , // 修改文件名称
    revCollector = require('gulp-rev-collector') ;// 替换模板中的引用

gulp.task('css', function() {
  return gulp.src(['build/css/*.css','build/css/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'firefox 20', 'ie 8', 'chrome 20', 'ios 7', 'android 4'))
    .pipe( minifycss())
    .pipe( rev()) // 修改名称
    .pipe( gulp.dest('dist/css'))
    .pipe( rev.manifest()) // 生成json文件
    .pipe( gulp.dest( 'rev/css/')) // 存放json文件
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task( 'rev', ['css', 'js'], function(){
  // 根据manifest文件，去替换模板中的引用
  return gulp.src([ 'rev/**/*.json', 'build/index.html'])
              .pipe( revCollector({
                replaceReved: true
              }) ) // 开启替换
              .pipe( gulp.dest( 'dist/'));
});

gulp.task('js', function() {   // *表示任意的js文件
  return gulp.src(['build/js/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
    .pipe( rev())
    .pipe( gulp.dest('dist/js'))
    .pipe( rev.manifest())
    .pipe( gulp.dest( 'rev/js/'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// gulp.task('clean', function() {  // 先清除目标文件夹
//   return gulp.src(['dist/css', 'dist/js' ], {read: false}).pipe(clean());
// });

gulp.task('default',['watch'], function() {  // 配置默认任务
    gulp.start('rev');
});

gulp.task('watch', function() {

  // 看守所有.scss档
  gulp.watch('build/css/*.scss', ['rev']);

  // 看守所有.js档
  gulp.watch('build/js/*.js', ['rev']);

  // 看守所有图片档
  // gulp.watch('src/images/**/*', ['images']);

  // // 建立即时重整伺服器
  // var server = livereload();

  // // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
  // gulp.watch(['dist/**']).on('change', function(file) {
  //   server.changed(file.path);
  // });

});
