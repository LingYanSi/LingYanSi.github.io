/**
 * system modules
 * @type {[type]}
 */
var path = require('path');
var exec = require('child_process').exec;

/**
 * gulp node modules
 * @type {[type]}
 */
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var less = require('gulp-less');
var tap = require('gulp-tap');
var _ = require('underscore');

var rootPath = './dist/src';

var svnPath = '/data/app/mogujie/public/xd'; // 这里是本地的 svn 地址

gulp.task('commit', function () {
    var argv = process.argv.slice(0);
    argv = argv.slice(_.indexOf(argv, 'commit') + 1);
    var params = {};
    for (var i = 0, len = argv.length; i < len; i++) {
        if (argv[i + 1].indexOf('-') === 0) {
            params[argv[i]] = true;
        }
        else {
            params[argv[i]] = argv[i + 1];
            i++;
        }
    }
    var filePath = params['-f'] || params['--file'];

    if (filePath) {
        var relative = path.relative('dist/src', path.dirname(filePath));
        var destMin = path.join(svnPath, 'js', relative),
            destSrc = path.join(destMin, 'src');
        gulp.src(filePath)
            .pipe(tap(function (file, t) {
                return gulp.src(filePath)
                    .pipe(gulp.dest(destSrc))
                    .pipe(streamify(uglify()))
                    .pipe(gulp.dest(destMin));
            }))
            .on('end', function () {
                var fileSrc = path.join(destSrc, path.basename(filePath)),
                    fileMin = path.join(destMin, path.basename(filePath));
                var t = new Date().getTime();
                console.log('======= svn up ======');
                exec(['svn up', fileSrc].join(' '), function(err, stdout, stderr) {
                    console.log(stdout);
                    stderr && console.error(stderr);

                    exec(['svn st', fileSrc].join(' '), function(err, stdout, stderr) {
                        // 如果有需要 svn add 的文件
                        var addFiles = stdout.match(/\?.*/g);

                        if (addFiles) {
                            exec(['svn add', fileSrc].join(' '), function(err, stdout, stderr) {
                                console.log(stdout);
                                stderr && console.error(stderr);
                            });
                        }

                        // 如果有需要 svn commit 的文件
                        console.log('======= svn commit ======');
                        exec(['svn ci -m "update', path.basename(fileSrc), '"', fileSrc].join(' ') , function (err, stdout, stderr) {
                            console.log(stdout);
                            stderr && console.error(stderr);

                            console.log('time cost: ' + (new Date().getTime() - t) / 1000 + 's =======' );
                        });
                    });
                });
            });
    }

    var dirPath = params['-d'] || params['--dir'];

    if (dirPath) {
        console.log(path.join(dirPath, '**'));
        gulp.src(path.join(dirPath, '**'))
            .pipe(tap(function (file, t) {
                var relative = path.relative(rootPath, file.path);
                return gulp.src(path.join(file.path, '*.js'))
                    .pipe(gulp.dest(path.join(svnPath, 'js', relative, 'src')));
            }));
    }
});

gulp.task('js', function() {
    // gulp.src(rootPath + '/goods/list/sale.js')
    //     .pipe(gulp.dest(svnPath + 'js/goods/list/src'))
    //     .pipe(streamify(uglify()))
    //     .pipe(gulp.dest(svnPath + 'js/goods/list'));
    //gulp.src(rootPath + '/goods/list/house.js')
    //    .pipe(gulp.dest(svnPath + 'js/goods/list/src'))
    //    .pipe(streamify(uglify()))
    //    .pipe(gulp.dest(svnPath + 'js/goods'));
    // gulp.src(rootPath + '/goods/edit.js')
    // .pipe(gulp.dest(svnPath + 'js/goods/src'))
    // .pipe(streamify(uglify()))
    // .pipe(gulp.dest(svnPath + 'js/goods'));
    // gulp.src('./dist/src/goods/*')
    //     .pipe(tap(function (file, t) {
    //         return gulp.src(file.path + '/*.js')
    //         .pipe(gulp.dest(svnPath + 'js/' +file.relative + '/src'))
    //         .pipe(streamify(uglify()))
    //         .pipe(gulp.dest(svnPath + 'js/' + file.relative ));
    //     }));
});

gulp.task('baseless', function() {
    gulp.src('./app/base/less/base.less')
        .pipe(less())
        .pipe(gulp.dest(svnPath + 'css/src'))
        .pipe(minify())
        .pipe(gulp.dest(svnPath + 'css'))
});

gulp.task('svn', ['js'], function() {

    var t = new Date().getTime();
    console.log('======= svn up ======');
    console.log(svnPath);
    exec('svn up ' + svnPath, function(err, stdout, stderr) {
        console.log(stdout);
        if(stderr) {
            console.log(stderr);
        }

        exec('svn st ' + svnPath, function(err, stdout, stderr) {
            // 如果有需要 svn add 的文件
            var addFiles = stdout.match(/\?.*/g);
            if (addFiles) {
                for (var i = 0; i < addFiles.length; i++) {
                    var file = addFiles[i].replace('\?', '').trim();
                    console.log('add file : ' + file);
                    exec('svn add ' + file, function(err, stdout, stderr) {
                        console.log(stdout);
                        console.log(stderr);
                    });
                };
            }

            // 如果有需要 svn add 的文件
            var commitFiles = stdout.match(/(A|M).*/g);
            if (commitFiles) {
                console.log('======= svn commit ======');
                exec('svn ci -m"beile: file ' + '" ' + svnPath , function (err, stdout, stderr) {
                    console.log(stdout);
                    console.log(stderr);

                    console.log('time cost: ' + (new Date().getTime() - t) / 1000 + 's =======' );
                });
            };

            console.log('=======  time cost: ' + (new Date().getTime() - t) / 1000 + 's =======');
            // console.log(stderr);
        });
    });
});

gulp.task('default', ['svn']);
