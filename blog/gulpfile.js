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

gulp.task('sass::base', ()=>{
    return gulp.src(['./build/sass/base/index.scss'])
        .pipe(sass())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(concat('sass.css'))
        .pipe(rename('base.css'))
        .pipe( gulp.dest('./base/') )
})

gulp.task('watch::sass', ()=>{
    gulp.watch('./build/sass/base/*.scss', ['sass::base'])
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
})

// 如果要做cdn、md5，那就需要业务文件
// 先压缩，后获取md5
gulp.task('minify::js', ()=>{
    return gulp.src('./js/app.js')
            .pipe( uglify() )
            .pipe( md5() )
            .pipe( gulp.dest('./js') )
})
