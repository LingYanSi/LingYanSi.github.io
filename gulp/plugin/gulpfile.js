let gulp = require('gulp')
let rename = require('gulp-rename')
let fuck = require('./plugin.js')

gulp.task('p', ()=>{
    return gulp.src('./plugin.js')
        .pipe(rename('fuck.you'))
        .pipe(fuck())
})
