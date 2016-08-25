let gulp = require('gulp')
let babel = require('gulp-babel')
let rename = require('gulp-rename')

gulp.task('default', ()=>{
    gulp.src('./wx.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename('wx-es5.js'))
        .pipe(gulp.dest('./'))
})
