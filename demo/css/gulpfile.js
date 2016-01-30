
'use strict' ;

var gulp = require('gulp');

var less = require('gulp-less');
var sass = require('gulp-sass');
var stylus = require('gulp-stylus');

var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('less', ()=>{
    gulp.src('./less/*.less')
        .pipe(sourcemaps.init()) // sourcemaps
        .pipe( less() )
        .pipe( postcss([require('autoprefixer')]) )
        .pipe( minify() )
        .pipe(sourcemaps.write())
        .pipe( gulp.dest('./less/') )
});

gulp.task('sass', ()=>{
    gulp.src('./sass/*.scss')
        .pipe( sass() )
        .pipe( postcss([require('autoprefixer')]) )
        .pipe( minify() )
        .pipe( gulp.dest('./sass/') )
})

gulp.task('stylus', ()=>{
    gulp.src('./stylus/*.styl')
        .pipe( sass() )
        .pipe( postcss([require('autoprefixer')]) )
        .pipe( minify() )
        .pipe( gulp.dest('./stylus/') )
})
