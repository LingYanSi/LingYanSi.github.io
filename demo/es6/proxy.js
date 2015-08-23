/*
* @Author: Administrator
* @Date:   2015-08-20 11:01:36
* @Last Modified by:   灵岩寺
* @Last Modified time: 2015-08-22 17:50:35
*/

'use strict';

// proxy代理 chrome暂不支持
(function(){
    console.log('----------------------proxy----------------------');

/*
 * proxy的作用和Object.defineProperty(obj,name,description)有点像
*/


/*
 * 再继续，objec.defineProperty提供了监听数据变化的骨架，也就是初步做到了数据驱动
 * 如果需要绑定dom，也就是再需要传递dom元素
 * 还需要在是视图层，监听数据的变化，也就是为其添加一些比如 onkeydown onchange 等事件的监听
 * 组件化，什么算是组件化
 * 组件化，类似于web component ，组建的内部不受外部影响，但是可以接受一些参数，以此来改变组建的状态。
 * 那么就需要组件 可以监听到其状态的变化
 * <ly-nav color="red"></ly-nav>
 * $('ly-nav').state({'color','blue'});
*/

/*
var pro = new Proxy({},{
    get:function(target, key, receiver){
        console.log('已被拦截');
        return Reflect(target, key, receiver);
    }
});
console.log( pro.name );*/




})();
