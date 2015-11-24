/*
* @Author: zikong
* @Date:   2015-10-27 17:31:49
* @Last Modified by:   zikong
* @Last Modified time: 2015-11-01 18:53:35
*/

'use strict';

var PubSub = (function(){
    var cache = {};
    return {
        sub: function(key,fun){
            cache[key] = fun;
        },
        removeSub: function(key){
            delete cache[key]
        },
        removeAllSub: function(){
            for(key in cache){
                delete cache[key]
            }
        },
        pub: function(key,data){
           cache[key] && cache[key](key,data);
        }
    }
})();
