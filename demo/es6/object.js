/*
* @Author: Administrator
* @Date:   2015-08-17 14:40:52
* @Last Modified by:   Administrator
* @Last Modified time: 2015-08-17 18:21:11
*/

'use strict';
// Object主要增加了 observe、unobserve、watch、unwatch

var obj = {};

function abs(change){
    console.log(change);
}

Object.observe(obj,abs);

obj.name = "heihie" ;
Object.unobserve(obj,abs);

// getPrototypeOf,setPrototypeOf获取原型，设置原型
var a = {};
var pro = {dula:'杜拉拉升职记'} ;
Object.setPrototypeOf(a,pro);
console.log( '对象Object.getPrototypeOf', Object.getPrototypeOf(a) );

// es5中可以通过 obj.__proto__ 来get,set

// Object.is()用来判断两个属性是否严格相等
Object.is(false,true);

/*
* Object.assign
* Object.assign方法用来将源对象（source）的所有可枚举属性，复制到目标对象（target）。
* 它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。只要有一个参数不是对象，就会抛出TypeError错误。
*/

var target = {};
var source1 = {x:1} ;
var source2 = {y:2} ;
var source3 = {z:3} ;
// Object.assign(target,source1,source2,source3);

/*
* ES6允许直接写入变量和函数，作为对象的属性和方法。
*/
function xy(x,y){
    return {x,y}
};
console.log( '对象简写', xy('周',11) );

// ------------ES5回顾----------------
/*
* Object.freeze()
* 冻结对象，对象属性不会再被改变
*/

/*
* Object.create()
* 新创建一个对象，和new字符作用一样
*/

/*
* Object.getOwnPropertyNames(obj)
* 获取对象所有可枚举与不可枚举的属性。枚举enumerable
*/

/*
* Object.keys(obj)
* The object whose enumerable own properties are to be returned
*/

/*
* Object.defineProperty(obj, prop, descriptor)
* 定义一个对象属性
*/

/*
* obj.hasOwnProperty(prop)
* The name of the property to test.
*/

/*
* Object.prototype.isPrototypeOf()
*
*/

function aaa(){};
aaa.prototype = xy ;
var bbb = new aaa();
console.log( '继承', bbb ,'xy在bbb的原型链上', xy.isPrototypeOf(bbb) );
