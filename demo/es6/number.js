/*
* @Author: Administrator
* @Date:   2015-08-17 11:08:48
* @Last Modified by:   Administrator
* @Last Modified time: 2015-08-17 13:17:58
*/

'use strict';

// Number
// 在es5中isNaN、parseInt、parseFloat都是全局函数，
// 在es6中Number也提供了这些方法，为的是减少全局对象，加强模块化
Number.isNaN(NaN);
Number.parseInt('100',8);
Number.parseFloat('100.23');

Number.isFinite(100); // 判断是不是有限值
Number.isInteger(10.2); // 判断是不是整型
// 这是因为js可以正确显示2的-32次方 —— 2的32次方之间的数值
// The safe integers consist of all integers from -(2的53次方 - 1) inclusive to (2的53次方 - 1) inclusive.
Number.isSafeInteger(10.2);

var ccc = new Number(1000);
Number.prototype.valueOf = function(){
    return '这时候什么呢'
}
var aaa = new Number(100);
console.log( 'aaa的valueof()--',aaa.valueOf() );
console.log( 'ccc的valueof()--',ccc.valueOf() );
