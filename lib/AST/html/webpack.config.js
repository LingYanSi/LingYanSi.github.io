
let webpack = require('webpack')
let WebpackOnBuildPlugin = require('on-build-webpack');
// 使用ExtractTextPlugin把css抽出来
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let WebpackPathOrderPlugin = require('path-order-webpack-plugin');
let notifier = require('node-notifier');

let path = require('path')
let fs = require('fs')

function webpackDone(title, message, sound){
    notifier.notify({
        title: title,
        message: message,
        sound: sound,
        icon: path.resolve(__dirname, '/Users/zikong/LingYanSi.github.io/images/wangsitu.jpg')
    }, function (err, respond) {
        if (err) console.error(err);
    });
}

let entry = {
    '/rv': './Rv/index.js',
    '/app': './test/app.js',
}

module.exports = {
    // 是否缓存
    cache: true ,
    // 是否监听文件变化
    watch: false ,
    // 入口配置
    entry,
    // 输出配置
    output: {
        // 输出路径
        path: 'dist',
        // chunckhash 是指文件最终的md5
        filename: "[name].js",
        // 块文件名称？
        chunkFilename: "[name].js",
    },
    module:{
        // 用来处理文件
        loaders: [
            // 对js/jsx文件的处理
            { test: /\.(js|jsx)$/ , loader: 'babel-loader' },
        ]
    },
    // babel需要的 presets / plugins 预设或者插件
    babel: {
        presets: ['es2015'], // 把es2015转译成es5，这么做的弊端在于有些浏览器已经支持了新特性，却不能使用
        plugins: ['transform-object-rest-spread', 'transform-class-properties', 'transform-decorators-legacy']
    },

    // 使用postcss来解决prefixer问题，根据需要填写相关浏览器/系统版本号
    // postcss:  [ autoprefixer({ browsers: ['last 4 versions', 'IOS 7', 'Android 4.3'] }) ],
    // 不需要webpack打包的文件，key: require('key') , value: 全局对象名
    externals: {
    },
    resolve:{
        alias:{
        },
        unsafeCache: true,
        // 扩展名，按先后顺序尝试查找
        extensions: ['','.js','.jsx','.scss','.css']
    },
    // 插件
    plugins: [
        new WebpackPathOrderPlugin(),
        // new ExtractTextPlugin("./../css/app.css"),
        // 压缩js文本
        0 && new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
       // 打印日志
        new WebpackOnBuildPlugin(function(stats) {
            var compilation = stats.compilation;
            var errors = compilation.errors;

            if (errors.length > 0) {
                var error = errors[0];
                webpackDone(error.name, error.message, 'Glass');
            }
            else {
                var message = 'takes ' + (stats.endTime - stats.startTime) + 'ms';

                var warningNumber = compilation.warnings.length;
                if (warningNumber > 0) {
                    message += ', with ' + warningNumber + ' warning(s)';
                }

                webpackDone('webpack building done', message);
            }
        })


    ].filter(i => i)
}
