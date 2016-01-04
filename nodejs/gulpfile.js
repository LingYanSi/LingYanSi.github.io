/*
* @Author: zikong
* @Date:   2015-12-30 13:55:40
* @Last Modified by:   zikong
* @Last Modified time: 2016-01-03 12:57:22
*/

'use strict';

var gulp = require('gulp') ,
    less = require('gulp-less') ,
    babel = require('gulp-babel');

var CSS_PATH = './static/css/' ;

gulp.task('css', function(){
    // console.log('wtf')
    gulp.src(CSS_PATH+'*.less')
        .pipe(less())
        .pipe( gulp.dest(CSS_PATH) )
});

gulp.task('js', function(){
    // console.log('wtf')
    gulp.src('./static/build/*.js')
        .pipe(babel())
        .pipe( gulp.dest('./static/js/') )
});

gulp.task('watch', function(){
    gulp.watch('./static/css/*.less',['css']);
    gulp.watch('./static/build/*.js',['js']);
})

gulp.task('default',['watch'],function(){
    gulp.start('css');
    gulp.start('js');
})
