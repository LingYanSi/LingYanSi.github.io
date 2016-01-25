/*
* @Author: zikong
* @Date:   2015-12-28 16:59:39
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-28 17:07:07
*/

'use strict';

var a = 100 ;

function test(){
    console.log( this===global ,  global.a , global.hasOwnProperty('a'), a );
}

test();
