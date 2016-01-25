/*
 * @Author: 灵岩寺
 * @Date:   2015-08-16 22:41:53
 * @Last Modified by:   Administrator
 * @Last Modified time: 2015-08-20 13:18:13
 */

'use strict';
//es6全称ecmascript6或者ecmascript2015
// 想了解完整的es6的，两个去处：一是阮一峰的es6教程，二是MDN
// 查看api的话，MDN是更好的去处

// string对象新增了一下方法 startsWith,endsWith,repeat,includes
(function() {
    console.log('----------------------String----------------------');

    var str = 'i\'m string ';
    str = str.trim();
    console.log(str.startsWith('i')); // 以i开头
    console.log(str.endsWith('g')); // 以g结尾
    console.log(str.includes('ing')); // 是否包含ing
    console.log(str.repeat(3)); // 重复三遍

    // 可使用``来表示字符串，省去了+号连接，更直观
    var instr = `not ${str}`;
    var str = `you are ${instr} alone`;
    console.log(str)
})();
