var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename')

var fs = require('fs') ;
var path = require('path') ;

var watch = false ;

function watchStart(pathname, taskArr){
    gulp.task('watch', function(){
        gulp.watch(pathname,taskArr )
    })
    gulp.start('watch')
}

gulp.task('babel', function(){
    // 注意，如果想获取命令行参数，第一参数需要 /-\.+/
    if(!watch){
        var args = process.argv.slice(3)
        var filename = args[1] ;

        var dirpath = __dirname ;

        if(!filename || !fs.existsSync(path.resolve( dirpath, filename) ) ){
            console.warn('文件名为空，或者文件不存在')
            return
        }

        watchStart(filename, ['babel']);
    }

    gulp.src(filename)
        .pipe(babel({
            // plugins: ['transform-runtime','syntax-async-functions'],
            // 这里文件内 使用了 babel-polyfill 就不使用plugins了
            // 还应该使用post-css
            presets : ["es2015","stage-3"]
        }))
        .pipe( rename('babel-'+filename) )
        .pipe( gulp.dest('') )
})
