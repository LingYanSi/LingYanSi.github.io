/*
* @Author: zikong
* @Date:   2015-10-27 17:31:49
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-01 18:53:35
*/

'use strict';

var PubSub = (function(){
    // 事件存储
    var cache = {};

    // 把内部工具隐藏起来，不要暴露到API中
    var util = {
        handleKey: function(key){
            // 判断是不是字符串类型
            if( Object.prototype.toString.call(key).indexOf('String')<0 ){
                console.warn('PubSub.pub 的第一参数不能为空或者空白符')
                return
            }
            // 去除空白字符
            return key.replace(/\s+/g,'')
        }
    }

    return {
        // 获取所有时间
        getAllSub: cache,
        // 注册事件
        sub: function(key,fun){
            if( !( key = util.handleKey(key) ) ) return

            if(fun instanceof Function){
                cache[key] = fun;
            }else{
                console.warn('The arguments\'s type of PubSub.sub must be [String, Function]')
            }
        },
        // 派发事件
        pub: function(key,data){
            if( !( key = util.handleKey(key) ) ) return

           cache[key] ? cache[key](key,data) : console.warn('没有在PubSub中注册过',key)
        },
        // 删除事件
        removeSub: function(key){
            if( !( key = util.handleKey(key) ) ) return
            delete cache[key]
        },
        // 删除全部事件
        removeAllSub: function(){
            for(key in cache){
                delete cache[key]
            }
        }
    }
})();

// 实例

var obj = {
    heihei(msg , data){
        console.log('我想和你嘿嘿', msg , data)
        this.haha()
    },
    haha(){
        console.log('你这是想笑死我')
    }
}

PubSub.sub('你大爷', obj.heihei.bind(obj) )
PubSub.pub('你大爷', '无语~')
 
// 从分支上过来的
// master
// hei怎么回事儿
