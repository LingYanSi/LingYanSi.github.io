/*
* 面向切面编程
* 今天看视频，刚接触到的一个概念，立马会联想到面向对象编程
* 按照视频中所讲的含义，面向切面编程是一种无入侵式的编程方式
* 比如说，当我们需要测试一个函数的执行时间，通常的做法是直接在函数的头部、尾部获取时间，然后取差
* 但这样会有一些问题，比如说，难道要在每个函数内部都这么写一遍？会不会污染函数内部变量？
* 其实到这儿应该想到 干嘛不直接在function的原型Function来定义两个方法
* 这也是面向切面编程的基本思想之一
*/

function test(){
	console.log(2);
	return '我被return出来了' ;
}

// 写到第二步的时候，会想到，虽说在原型上给function提供了after、before方法，但是他们这么直接执行呢
// 视频中的做法是直接 test.before() 这样调用
// 所谓before就是先于test执行
// 如果需要链式操作的话，就需要把before执行的东西传递给after，或者是把after执行的东西传递给before
// 到最后一起执行，这样避免了test会执行两边

Function.prototype.before = function(fun){
	var __self = this ; // this指向对象自身
	return function(){
		fun();
		return __self.apply(__self,arguments); // 把test返回的值return出去
	}
}

Function.prototype.after = function(fun) {
	var __self = this ; // this指向对象自身
	return function(){
		var result = __self.apply(__self,arguments); // 接收test的返回值
		fun();
		return result ; // 最后把test的return值再翻回出去
	}
};

test.before(function(){
	console.log(1)
}).after(function(){
	console.log(3)
})();

// 这样不论怎么写都是before先执行，after后执行
var hei = test.after(function(){
	console.log(3)
}).before(function(){
	console.log(1)
})();

console.log(hei); // test的return值没有丢失


// ----------> 单例模式
var Singleton = (function() {
    var instantiated;
    function init() {
        /*这里定义单例代码*/
        return {
            publicMethod: function() {
                console.log('helloworld');
            },
            publicProperty: 'test'
        };
    }
    return {
        getInstance: function() {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})();

/*调用公有的方法来获取实例:*/
Singleton.getInstance().publicMethod();