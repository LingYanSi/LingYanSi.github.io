/*
* @Author: zikong
* @Date:   2015-12-06 23:02:50
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-06 23:05:07
*/

'use strict';

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function( cmd){
    console.log('你刚才输入了:', cmd )
})
