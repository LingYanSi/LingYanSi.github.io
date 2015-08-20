/*
* @Author: Administrator
* @Date:   2015-08-20 11:01:36
* @Last Modified by:   Administrator
* @Last Modified time: 2015-08-20 13:38:28
*/

'use strict';

// proxy代理 chrome暂不支持
(function(){
    console.log('----------------------proxy----------------------');

/*
 * proxy的作用和Object.defineProperty(obj,name,description)有点像
*/
var dp = {};
var value = 38;
Object.defineProperty(dp, 'name', {
    get:function(){
        console.log('get获取值')
        return 1222 ;
    },
    set: function(newValue){
        console.log('set设置值')
        value = newValue ;
    },
    enumberable:true,
    configurable:true,
});
dp.name ;
dp.name = 100 ;


/*
var pro = new Proxy({},{
    get:function(target, key, receiver){
        console.log('已被拦截');
        return Reflect(target, key, receiver);
    }
});
console.log( pro.name );*/




})();
