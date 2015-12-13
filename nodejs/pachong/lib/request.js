/*
* @Author: zikong
* @Date:   2015-12-05 22:13:15
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-07 19:50:04
*/

'use strict';


var http = require('http') ,
    cheerio = require('cheerio') ,
    colors = require('colors') ,
    iconv = require('iconv-lite');

module.exports = function(host, path , resStore , index  ,callback ){
    var option = {
        hostname: host,
        path: path,
        method: 'GET',
        Connection: 'keep-alive',
        timeout: 4000,
        headers: {
            'Content-Type': 'text/html' ,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36',
            'cookie': '_za=4e69cc93-7965-48b4-b3bc-45e9dadaf632; q_c1=369402d3f54a40d88eebb2095b7a25a5|1447818832000|1447818832000; cap_id="MGQwNjA5MWI4OTE4NDM0Y2I5NzE1MTZlNmExYjBmMzc=|1447821651|063fe1f8596ed82ccb9ff3d501245cb679c62c92"; z_c0="QUFCQWtlSWVBQUFYQUFBQVlRSlZUVjJPYzFiMUJWaHZGeXF2WEIwSEhFdzMtN2RjT01Jd2RnPT0=|1447821661|e9250e51b555b1a26d2454a522e1c8ddacd508ed"; _xsrf=474beae6754f84a24173bc9d84ed6b8a; __utma=51854390.710265126.1448735164.1449325348.1449325348.8; __utmb=51854390.2.9.1449329049003; __utmc=51854390; __utmz=51854390.1449325348.7.7.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmv=51854390.100-1|2=registration_date=20131008=1^3=entry_date=20131008=1'
        }
    }

    var handle = function( store){
        resStore[index].imgs = store ;

        resStore.currentIndex++ ;

        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        var msg = '已完成'+Math.round(resStore.currentIndex/resStore.length*100)+'%' ;
        if(resStore.currentIndex == resStore.length){
            msg +='\n'
        }
        process.stdout.write( msg );

        callback();
    }

    var request = http.request(option , function( response){

        var arr = [] ;
        response.on( 'data' , function( chunck){
            arr.push( chunck);
        });

        response.on( 'end' , function(){
            arr = Buffer.concat( arr);

            var str = iconv.decode(arr ,'gb2312');

            var $ = cheerio.load( str );
            var store = [] ;
            $('input[type="image"]').each(function(i ,ele ){
                store.push( $(this).attr('src') );
            });

            handle( store)

            // console.log( index, store);
        });

    });

    // 设置 timeout
    request.setTimeout(3000, function(e) {
            console.warn('请求超时'.red);
            request.abort();
    });
    // 错误处理
    request.on('error', function(e) {
            console.log('出错了+——+')
            handle( [] );
    });

    request.write('hello world');

    request.end();
}
