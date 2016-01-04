/*
* @Author: zikong
* @Date:   2015-12-05 20:14:29
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-06 16:53:25
*/

'use strict';

var http = require('http') ;

http.createServer(function( request , response){
    // console.log( request );
    response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
    response.end('我爱你宋小帆' );

}).listen(9876);


