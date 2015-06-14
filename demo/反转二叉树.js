/*反转二叉树
哈哈，凑个热闹*/
function inserve(node){
    console.log('进来了',node.children.length>0)
    if(node.children.length !== 0){
        console.log('什么情况')
        var sd = node.firstElementChild
        node.removeChild(node.firstElementChild);
        node.appendChild(sd);
    }else{
        return 
    }
    var node = node.firstElementChild
    while(node){
        inserve(node);
        node = node.nextElementSibling
    }
}
// 局部变量
function iii(a){
    'use strict'
    var a ; // 变量提升
    console.log(a)
    var a = 1 ; // 这说名形参a其实是iii的一个局部变量
    var a ;
    console.log(a)
}

function sort(){
    var arr = [12,55,4,1,2,78,156,54,11] ;
    // 所谓快速排序，抽取第一个元素
}