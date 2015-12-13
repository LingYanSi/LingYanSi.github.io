/*
* @Author: zikong
* @Date:   2015-12-08 10:41:39
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-08 12:03:45
*/

'use strict';

var gulp = require('gulp') ,
    minify = require('gulp-uglyfly')  ;

gulp.task('js', function(){
    gulp.src('./*.js')
        .pipe( minify() )
        .pipe( gulp.dest('min') );
});

gulp.task('default', function(){
    gulp.start(['js']) ;
})
