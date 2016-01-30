
'use strict' ;
// 解构赋值
let a = '蛤蛤' , b = '祖英' ;
let obj = {a , b} ;
console.log( obj );


let { c, d } = {c:a , d:b } ; // node 5.0版本还不支持
console.log(c , d );
