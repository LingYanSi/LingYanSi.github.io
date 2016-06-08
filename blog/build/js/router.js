'use strict';
var Router = (function(){
    window.onpopstate = function(){
        event_hostory_change.forEach(item => item())
    }
    var event_hostory_change = [];
    console.log(1111)
    return {
        push: function(title,url){
            history.pushState(null, title, url);
            document.title = title ;
            window.onpopstate()
        },
        replace: function(title,url){
            history.replaceState(null, title, url);
            document.title = title ;
            window.onpopstate()
        },
        addChangeListener: function(fun){
            fun instanceof Function &&  event_hostory_change.push(fun)
        },
        removeChangeListener: function(fun){
            if ( fun instanceof Function ){
                event_hostory_change.forEach(function(item, index , arr){
                    item===fun && arr.splice(index, 1)
                })
            }
        }
    }
})();

// var a = function(){ console.log('我是傻逼') }
// Router.addChangeListener(a)
// Router.push('sb','?heihie');
// history.back();
// console.log('你才是')
// // 要注意的是：时间触发是异步的，大概是在下一帧被触发16.67ms
// setTimeout(function(){
//     console.log('将军')
// })
// setTimeout(function(){
//     console.log('将军，并在性')
// },16)
// Router.removeChangeListener(a)
