'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let babel = require('gulp-babel');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer')
let concat = require('gulp-concat')
let rename = require('gulp-rename')
let md5 = require('gulp-md5')


let sourcemaps = require('gulp-sourcemaps');
let uglify = require('gulp-uglify')

const SASS_PATH = './koa/react/sass/base.scss'
gulp.task('sass::base', ()=>{
    return gulp.src([SASS_PATH])
        .pipe(sass())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe( gulp.dest('./koa/static/css') )
})


gulp.task('default',[], ()=>{
    gulp.start('watch::sass')
    gulp.start('watch::js')
})

gulp.task('js::router', ()=>{
    return gulp.src('./build/js/router.js')
        .pipe(sourcemaps.init())
        .pipe( babel({
            presets: ['es2015']
        }) )
        .pipe( uglify() )
        .pipe(sourcemaps.write())
        .pipe( gulp.dest('./basejs/') )
})

gulp.task('watch::js', ['js::router'], ()=>{
    gulp.watch('./build/js/*.js', ['js::router'])
    gulp.watch('./koa/react/util/index.js', ['js::util'])
})

// util
gulp.task('js::util', ()=>{
    return gulp.src(['./koa/react/util/index.js'])
            .pipe( babel({
                presets: ['es2015']
            }) )
            .pipe( rename('util.js') )
            .pipe( gulp.dest('./koa/static/js/') )
})

// 先压缩，后获取md5
gulp.task('minify::app', ['minify::css'], ()=>{
    return gulp.src(['./static/js/*'])
            .pipe( uglify() )
            .pipe( rename(function(path) {
                path.basename += ".min";
            }) )
            .pipe( md5() )
            .pipe( gulp.dest('./static/js/min/') )
})

// 压缩 md5 css文件
gulp.task('minify::css', ()=>{
    return gulp.src(['./static/css/*'])
        .pipe( rename(function(path) {
            path.basename += ".min";
        }) )
        .pipe( md5() )
        .pipe( gulp.dest('./static/css/min/') )
})
