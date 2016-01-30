
/*
 * @Author: zikong
 * @Date:   2015-10-17 23:48:15
 * @Last Modified by:   zikong
 * @Last Modified time: 2015-11-09 16:30:00
 */

'use strict';

var fs = require('fs') ;
var path = require('path') ;

// 读取文件夹内定的文件名，将特定文件名称的文件路径，添加到数组中，然后转换文件名称
// 比如说对于所有以 View.jsx 结尾的文件 appView.jsx 转为 app: app.js

var entry = {};
function pipe(dir){
    var dirList = fs.readdirSync(dir);
    dirList.forEach(function(pathName){
        if(fs.statSync(dir+pathName).isDirectory()){
            // 假如是文件夹就递归
            pipe(dir+pathName+'/');
        }else{
            // 不是是文件，就判断是不是以.jsx结尾的文件，如果是就替换文件路径str的 ./webpack/app .jsx .js
            var path = dir+pathName ;
            if(path.indexOf('View.jsx')>0){

                var path1 = pathName.replace(/View\.jsx/g,'');
                // 把AaaaBbbbCcc 转换成 aaa/bbb/ccc
                var entry_path =  path1.match(/[A-Z][^A-Z]+/g).map(function(ele){
                    return ele.toLowerCase()
                }).join('/') ;

                entry[entry_path] = path ;
            }
        }
    })
}
pipe('./webpack/app/');
console.log( entry );

var DEV_PATH = './app/'
var autoprefixer = require('autoprefixer');

// entry = { index: 'index.jsx' , 'index/abb': 'index/abb.jsx'}
// 输出的时候会 path/ ==> index.js  path/index/ ==> abb.js

module.exports = {
    cache: true,
    watch: true ,
    entry: entry,
    output: {
        path: './webpack/dist/', // 目标路径
        filename: '[name].js' // Template based on keys in entry above
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)$/ , loader:'babel-loader'},
            { test: /\.less$/ , loader:'style-loader!css-loader!less-loader!postcss-loader'}
        ]
    },
    postcss: function () {
        return {
            defaults: [autoprefixer],
            cleaner:  [autoprefixer({ browsers: [] })]
        };
    }
}
