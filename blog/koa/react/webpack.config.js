

var webpack = require('webpack')
var WebpackOnBuildPlugin = require('on-build-webpack');
// 使用ExtractTextPlugin把css抽出来
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var WebpackPathOrderPlugin = require('path-order-webpack-plugin');
var notifier = require('node-notifier');

var path = require('path')

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

module.exports = {
    // 是否缓存
    cache: true ,
    // 是否监听文件变化
    watch: true ,
    // 是否在每次打包之前将之前的打包文件
    // 删除
    clearBeforeBuild: true,
    // 入口配置
    entry: {
        'app': './pages/index.js',
    },
    // 输出配置
    output: {
        // 输出路径
        path: './../static/js/',
        filename: "[name].js",
        // 块文件名称？
        chunkFilename: "[name].js",
    },
    module:{
        // 用来处理文件
        loaders: [
            // 对js/jsx文件的处理
            { test: /\.(js|jsx)$/ , loader: 'babel-loader' },
            // 对less的处理
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style','css!sass!autoprefixer','sass-loader','autoprefixer-loader') },
            // { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader' }
            // { test: /\.css$/, loaders: ['style','css','scss','autoprefixer'] }
        ]
    },
    // babel需要的 presets / plugins 预设或者插件
    babel: {
        presets: ['react','es2015'] // 把es2015转译成es5，这么做的弊端在于有些浏览器已经支持了新特性，却不能使用
    },
    // postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    // 不需要webpack打包的文件，key: require('key') , value: 全局对象名
    externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'react/addons': 'window.React',
        'react-router': 'window.ReactRouter',
        'lodash': 'window._',
        'jQuery': 'window.$',
    },
    resolve:{
        alias:{},
        unsafeCache: true,
        extensions: ['','js','jsx','scss']
    },
    // 插件
    plugins: [
        new WebpackPathOrderPlugin(),
        new ExtractTextPlugin("./../css/app.css"),
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
    ]
}
