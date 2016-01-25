/*
* @Author: Administrator
* @Date:   2015-08-18 11:05:08
* @Last Modified by:   Administrator
* @Last Modified time: 2015-08-20 13:17:28
*/

'use strict';

// Function函数
(function(){

    console.log('----------------------function----------------------')

/* 1------------------------------------------------------------------------------
 * 默认参数 chrome暂不支持
 * 定义了默认值的参数，必须是函数的尾部参数，其后不能再有其他无默认值的参数。
 * 这是因为有了默认值以后，该参数可以省略，只有位于尾部，才可能判断出到底省略了哪些参数。
*/

/*
function fun(x='你是',y='默认参数'){
    console.log(x,y)
}
fun();
*/

/* 2----------------------------------------------------------------
 * rest参数 chrome暂不支持
 * rest参数是一个数组，可用来替换arguments
 * rest参数之后不能再有其他参数（即只能是最后一个参数），前面可以有其它参数
*/
/*
function rest(...values){
    console.log(values)
};
rest(123,45);
*/

/* 3 -----------------------------------------------------------------------------
 * 扩展运算符...
 * 扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符，比如Map结构。
 * 其实通过rest参数的例子，可大致明白，...是把含有Iterator的对象给解析成 ele1,ele2,ele3 这样的形式
*/

/*var arr31 = [1,2,3];
console.log([...arr31])

var arr32 = [1,23,...arr31,23,...arr31];*/

/* 4 --------------------------------------------------------------------------------------
 * => 箭头函数
*/
/*
var f = n=>n*n ;
等同于
var f = function(n){
    return n*n ;
}

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
var f = ()=>100 ;
var f = (arg1,arg2)=>arg1+arg2 ;

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。
var f = n=>(return { result:n+1} );

箭头函数可以与变量解构结合使用。
var f = ({x ,y ,z})=> x+y+z ;

也可使用rest参数
var f =(...values)=> values ;

箭头函数有几个使用注意点。
    1.函数体内的this对象，绑定定义时所在的对象，而不是使用时所在的对象。
    2.不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
    3.不可以使用arguments对象，该对象在函数体内不存在。*/

/* 5 ---------------------------------------------------------------------------------------------------
 * Generator函数
 * 调用Generator函数，返回一个部署了Iterator接口的遍历器对象，用来操作内部指针。
 * 以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
 * value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
*/

var f = function*(){
    console.log('generator:我还没有开始第一个yield') // 会在第一次 iterator.next()的时候打印
    yield 'hello' ;
    yield 'world' ;
    return '你大爷' ;
}
var iterator = f(); // 函数不会执行
console.log( 'generator:',iterator.next() ); // {value: "hello", done: false} 返回值和状态 状态表示yield是否完成
console.log( 'generator:',iterator.next() ); // {value: "world", done: false}
console.log( 'generator:',iterator.next() ); // {value: "你大爷", done: true} 最后一步的值表示return的值 如果函数没有return则返回undefined
console.log( 'generator:',iterator.next() ); // {value: undfined, done: true} 如果yield已经完成，返回值为undefined

// 于Generator函数返回的遍历器，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield语句就是暂停标志。
// 遍历器next方法的运行逻辑如下。
// （1）遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
// （2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。
// （3）如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
// （4）如果该函数没有return语句，则返回的对象的value属性值为undefined。
// 需要注意的是，yield语句后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为JavaScript提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

/*
 * 其他 ---------------------------------------------------------------------------------------------------
*/
// function函数的优先级要比变量高
var aaa
console.log(aaa) // function aaa(){}
function aaa(){};
aaa = 11 ;

console.log( [1]+[2,3] ); // 12,3 会先将数组转化成字符串，然后相加

// ccc.length表示函数形参的长度，arguments.length表示实参的长度
var ccc = function(a,b){
    arguments.length = 0 ;
    console.log(a,b,arguments,ccc.length,arguments.length)//111,222,[111,222]arguments可读不可写
}
ccc(111,222,22222222);

})();
