/*
* @Author: 灵岩寺
* @Date:   2015-08-22 17:51:26
* @Last Modified by:   灵岩寺
* @Last Modified time: 2015-08-23 18:14:04
*/

'use strict';
/*
 * 这里来思考一个问题，假如说我们要监听一个对象的属性，
 * 我们是需要声明对象，与属性的
 * 还有就是，我们并需要监听get事件，只需set事件
 * 其次，还是分析需求吧，
*/

function lyan(obj,property,fun){
    var dp = obj ;
    var value = dp[property] ;
    Object.defineProperty(dp, 'name', {
        get:function(){
            // console.log('get获取值')
            return value ;
        },
        set: function(newValue){
            if(newValue===value) return ;
            fun && fun(newValue,value);
            value = newValue ;
            /*console.log(this)
            console.log('set设置值')*/
        },
        enumberable:true,
        configurable:true,
    });
}
function lyan_arr(obj,fun){
    var pushValue = function(){
        var arr = [].slice.call(arguments);
        fun(arr);
        return Array.prototype.push.apply(obj,arr);
    }
    Object.defineProperty(obj,'push',{
        get:function(){
            return pushValue ;
        },
        set: function(newValue){

        },
        enumberable:true,
        configurable:true,
    });

    var unshiftValue = function(){
        var arr = [].slice.call(arguments);
        fun(arr);
        return Array.prototype.unshift.apply(obj,arr);
    }
    Object.defineProperty(obj,'unshift',{
        get:function(){
            return unshiftValue ;
        },
        set: function(newValue){

        },
        enumberable:true,
        configurable:true,
    });

    var spliceValue = function(index,howmany){
        var arr = [].slice.call(arguments);
        fun(arr);
        return Array.prototype.splice.apply(obj,arr);
    }
    Object.defineProperty(obj,'splice',{
        get:function(){
            return spliceValue ;
        },
        set:function(){},
        enumberable:true,
        configurable:true,
    });
}

function ly( obj ){
    var data = obj.data ,
        ele = obj.el ,
        template = obj.template ;
    document.querySelector(ele).innerHTML = template ;
    fenxi(template);
}

function fenxi(template){
    // template进来后，需要解析，绑定，简单一点的花就是匹配{{}}
    // 然后将花括号内的变量替换为字符串？
    var arr = template.split(/\{{2}[^\}\{}]+\}{2}/) ;
    console.log(arr)
}

