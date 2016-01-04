/*
* @Author: zikong
* @Date:   2015-12-05 19:52:22
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-05 19:56:03
*/

'use strict';

var fs = require('fs') ;

function copy(src, dest){
    fs.createReadStream(src).pipe( fs.createWriteStream(dest) );
}

function main( arr ){
    copy(arr[0], arr[1]);
}

main( process.argv.slice(2) );
