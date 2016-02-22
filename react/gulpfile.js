var gulp = require('gulp')
var rename = require('gulp-rename')

// http://www.ydcss.com/archives/424

gulp.task('hey', function(){
    gulp.src('./static/**/*.{css,js}')
        .pipe(rename(function(path){
            path.basename && (path.basename += '-bitch' )
        }))
        .pipe(gulp.dest("./bitch"));
})
