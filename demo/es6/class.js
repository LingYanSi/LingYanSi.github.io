
'use strict' ;
// JavaScript语言的传统方法是通过构造函数，定义并生成新对象

function A(x, y){
    this.x = x ,
    this.y = y
}

A.prototype.x = '庆丰帝' ;

A.prototype.toString = function(){
    // 获取this.x 先从A上找，再到原型链上找
    return this.x + ''+ this.y
}

var a = new A(11,22); // new A() 返回的是一个对象
                    // Object.prototype.toString.call(a) => [Object Object]

console.log(Object.prototype.toString.call(a)  ,a.x , a.y , a.toString(),
    '\nA.prototype:',A.prototype )

// es5的继承

// es6 class extends
// 面向对象编程OO，new function() 得到的是一个对象
// 面向对象编程，类class,类可以继承，实例是类的实例，通过new class()得到

class Pointer {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    toString(){
        return this.x+''+this.y
    }
}
var p = new Pointer(11,22);
Pointer.do = '不要做吗';
console.log( Object.prototype.toString.call(Pointer), p , p.toString(), Pointer.name, Pointer.do );

class Circle extends Pointer{
    constructor(x,y){
        super(x,y);
        this.name = 'child' ;
    }
    fuck(){
        return '周瑜'
    }
    // 和es5中的 defineProperties一样使用
    get do(){
        return 'getter'
    }
    set do( value){
        console.log('setter:'+value) ;
    }
}


var cirl = new Circle(11, 3333333333);
console.log( cirl.do );
cirl.do = '个屁' ;

console.log( cirl.fuck() , cirl.toString(), cirl.x, cirl.y
            , '\n cirl instanceof Circle',cirl instanceof Circle
            , '\n cirl instanceof Pointer',cirl instanceof Pointer
            , '\n Circle instanceof Function',Circle instanceof Function
            , '\n cirl instanceof Function',cirl instanceof Function
            , '\n cirl instanceof Object',cirl instanceof Object
            , '\n Circle.__proto__',Circle.__proto__
            , '\n Circle.prototype',Circle.prototype
            , '\n Circle.prototype',Circle.prototype.__proto__
            , '\n Object.getPrototypeOf( Circle )=== Pointer:',Object.getPrototypeOf( Circle )=== Pointer
            , '\n cirl.__proto__===Circle.prototype :',cirl.__proto__===Circle.prototype
            , '\n Circle.__proto__===Pointer:',Circle.__proto__===Pointer
            , '\n Circle.prototype.__proto__ === Pointer.prototype :',Circle.prototype.__proto__ === Pointer.prototype
        )
