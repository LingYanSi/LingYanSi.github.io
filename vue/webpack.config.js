'use strict';

var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
console.log( ROOT_PATH );

var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')

module.exports = {
    cache: true ,
    watch: true ,
    // 文件入口
    entry:{
        'index': './app/main.js'
    },
    // 文件输出
    output:{
        path: './build',
        filename: '[name].js'
    },
    // 模块
    module: {
        loaders: [{
            test: /\.vue$/,
            loaders: ['vue'],
        }]
    },
     babel: {
        presets: ['es2015']
      },
    //
     // 插件
    plugins: [],
    // 开发服务器配置
    devServe: {

    }
}
