#!/usr/bin/env node

'use strict';

var http = require('http') ,
    fs = require('fs') ,
    childprocess = require('child_process')  ,
    cheerio = require('cheerio') , // node端的jquery 用来获取html文件信息
    colors = require('colors') , // 更改node console 出的字符串颜色
    iconv = require('iconv-lite') , // 解码 转码
    async = require('async') , // 按队列执行异步任务
    getimage = require('../lib/request') ; // 获取达盖尔的旗帜单个页面的图片

var option = {
    hostname: 'cl.wocl.me',
    path: '/thread0806.php?fid=16',
    method: 'GET',
    Connection: 'keep-alive',
    headers: {
        'Content-Type': 'text/html' ,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36'
    }
}

var request = http.request(option , function( response){

    var arr = [] ;
    var STARTTIME = new Date().getTime();

    response.on( 'data' , function( chunck){
        console.log('数据接收中·····')
        arr.push( chunck);
    });

    response.on( 'end' , function(){
        arr = Buffer.concat( arr);

        // 按照 gb2312 解码为 utf-8
        var str = iconv.decode(arr ,'gb2312');

        var $ = cheerio.load( str );
        var store = [] ;

        $('font[color="green"]').each(function(i ,ele ){

            store.push({
                title: $(this).parent().text() ,
                content: $(this).parent().attr('href') ,
                imgs: [] ,
                index: i ,
            });
        });
        store.currentIndex = 0 ;
        var currentIndex = 0 ;

        // 按顺序执行异步队列
        // console.log( Promise );
        async.each(store , function(ele , callback){
            // 这里的callback 类似与 promise中 resolve
            // console.log('正在获取', ele.index)
            getimage( option.hostname, '/'+ele.content ,store ,ele.index , callback );

        }, function (error) {
            fs.writeFileSync( '../cl/data.js', 'var newData='+ JSON.stringify( store)  );

            console.log( '用时'.green+(new Date().getTime()-STARTTIME)/1000+'s'.green )
            console.log('已获取***达盖尔的旗帜***最新图片:'.red,'尽情欣赏'.bgBlue.cyan );
            // 执行命令行程序
            childprocess.exec('open ../cl/index.html')
            // body...
        });


    });

});

request.on('error', function( e){
    console.log('出错了', e.message )
});

request.write('hello');

request.end();

