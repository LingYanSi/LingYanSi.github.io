let gulp = require('gulp')
let sass = require('gulp-sass')
let rename = require('gulp-rename')

const sass_config = {
    src: './sass/index.scss',
    watchSrc: './sass/*'
}
gulp.task('sass', ()=>{
    return gulp.src([sass_config.src])
        .pipe(sass().on('error', sass.logError))
        // .pipe(rename('sass.css'))
        .pipe(
            gulp.dest('./')
        )
})

gulp.task('default', ['sass'],()=>{
    gulp.watch(sass_config.watchSrc, ['sass'])
})
