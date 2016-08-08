let gulp = require('gulp')
let sass = require('gulp-sass')

gulp.task('percent', ()=>{
    return gulp.src('*.scss')
        .pipe(sass())
        .pipe(
            gulp.dest('')
        )
})

gulp.task('default',['percent'], ()=>{
    gulp.watch('*.scss', ['percent'])
})
