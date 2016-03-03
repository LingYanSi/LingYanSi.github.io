// 我日你大爷
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const child_process = require('child_process')
const shell = require('gulp-shell')
const min_jpg = require('imagemin-jpegoptim')
// npm install --save imagemin-jpegoptim

// 需要在研究一下png压缩比配置
gulp.task('png', () => {
	return gulp.src('img/**/*.png')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('img-dist'))
});

gulp.task('jpg', () => {
	return gulp.src('img/**/*.jpg')
		.pipe(min_jpg({
			progressive: true,
			max: 80 // 0-100 图片质量
		})())
		.pipe(gulp.dest('img-dist'))
});

gulp.task('default',['png','jpg'], ()=>{
	// 显示文件大小
	shell.task(['du -ks img-dist/**/*'])()
})

// 测试啊 branch sb
