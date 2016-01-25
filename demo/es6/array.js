/*
 * @Author: Administrator
 * @Date:   2015-08-18 09:35:17
 * @Last Modified by:   Administrator
 * @Last Modified time: 2015-08-20 13:17:37
 */

'use strict';

// Array 数组
(function() {
    console.log('----------------------Array----------------------')

/* 1
 * Array.from用于将一切含有length的对象，转换为数组，chrome暂不支持
 * 比如Set、Map、String、arguments等
 */
/*var fromStr = '123张三赵四';
var arr1 = Array.from(fromStr);
console.log('字符串转数组',arr1);

// Array.from还可以接受第二个参数，相当于map方法，使用如下
var arr2 = Array.from(fromStr,x=>x+1);
console.log('Array.from第二个参数',arr2);*/

/* 2
 * Array.of用于将一组数值转换为数组，chrome现在不支持
 * 这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
 */
/*var arr3 = Array.of(1,12,23);
console.log('Array.of:',arr3);*/

console.log('构造函数Array()的不足:Array(3)会构建一个长度为3的空数组', new Array(3));
console.log('构造函数Array()的不足:Array(1,23)', new Array(1, 23));

/* 3
 * Array.prototype.find、Array.prototype.findIndex、Array.prototype.includes
 * Array.prototype.includes属于ES7中的规范，和String.prototype.includes的用法一样，用于判断一个数组中是否包含一个值
 * Array.protptype.find 数组实例的find方法，用于找出第一个符合条件的数组成员。
     它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
     如果没有符合条件的成员，则返回undefined。
 * Array.prototype.findIndex
    数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
    这里有一个和indexOf的对比，indexOf无法发现NaN，但是findIndex可以借助Object.is来实现
 */

var arr31 = [1, 2, 3];
if (Array.prototype.includes) {
    console.log('Array.prototype.includes:', arr31.includes(1));
}
if (Array.prototype.find) {
    let arr = arr31.find(function(ele, index, arr) {
        return ele == 3
    });
    console.log('Array.prototype.find:', arr);
}
if (Array.prototype.find) {
    let arr = arr31.find(function(ele, index, arr) {
        return ele == 3
    });
    console.log('Array.prototype.find:', arr);
}

/* 4
 * Array.prototype.fill(value,indexStart,indexEnd) chrome不支持
 * indexStart,indexEnd设置起始位置，可省略，默认全部替换
*/
if(Array.prototype.fill){
   let arr = [1,2,3,4,5].fill('周芷若'); // ['周芷若','周芷若','周芷若','周芷若','周芷若']
   console.log(arr);
}

/* 5
 * Array.prototype.keys、Array.prototype.values、Array.prototype.entries chrome暂不支持values
 * 顾名思义，keys表示键、values表示值、entries表示键值对
*/
if(Array.prototype.keys){
    for(let index of ['周芷若','陈莹','赵敏'].entries()){
        console.log(index)
    }
}

/*
 * Array.observe()，Array.unobserve()
 * 这两个方法用于监听（取消监听）数组的变化，指定回调函数。
 * 它们的用法与Object.observe和Object.unobserve方法完全一致，也属于ES7的一部分。
 * 对象可监听的变化一共有六种，而数组只有四种：add、update、delete、splice（数组的length属性发生变化）。
 */
})();
