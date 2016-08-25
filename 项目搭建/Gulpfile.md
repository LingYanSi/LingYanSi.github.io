# Gulp
基于文件流的前端构建工具

[api在此](http://www.gulpjs.com.cn/docs/api/)

## 核心API
- task 任务
- src 输入文件
- dest 输出文件
- pipe 文件流

```js
gulp.task('sass', ()=>{
    gulp.src('./sass/**/*.scss')
        .pipe( sass() )
        .pipe( postcss([require('autoprefixer')]) )
        .pipe( minify() )
        .pipe( gulp.dest(function(file){
            // 可以接受一个函数，返回一个输出文件夹路径
            // 修改文件路径
            let p = file.path.replace(file.base, '')
            p = p.split(/\/|\\/g).join('_')
            file.path = file.base + p

            console.log(file.path);
            return 'you'
        }) )
})

// stylus任务 gulp stylus会执行
gulp.task('stylus', ()=>{
    gulp.src('./stylus/*.styl')
        .pipe( sass() )
        .pipe( postcss([require('autoprefixer')]) )
        .pipe( minify() )
        .pipe( gulp.dest('./stylus/') )
})

gulp.task('watch::sass',['sass'], ()=>{
    gulp.watch('./sass/**/*.scss',['sass'])
})

// 默认任务 gulp
gulp.task('default', ()=>{
    gulp.start('watch::sass')
})
```
