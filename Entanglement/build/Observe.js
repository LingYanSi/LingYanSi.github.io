/*
* 数据监听
*/
var testType = function(data){
    return Object.prototype.toString.call(data).split(' ')[1].slice(0,-1).toLowerCase()
}

var isCanObserve = function(data){
    // 只有对象和数组可以被监听
    var type = testType(data)
    return type == 'object' || type == 'array'
}

// 监听
var Observe = function( data, onchange){
    // 判断是对象，还是数组
    var type = testType(data)
    var newData
    if( type == 'object'){
        newData = observeObejct(data, onchange)
    }else if( type == 'array'){
        newData = observeArray(data, onchange)
    }

    // 换回新对象
    return newData
}

// 监听对象对象变化
function observeObejct( obj , fun){
    // 遍历一发，返回一个新对象【添加了get,set】
    // 原型链上的数据不会被追踪
    var keys = Object.keys( obj )
    var newData = {}

    // 遍历一层
    keys.forEach(function(item){
        (function(){
            var value = obj[item]

            // 如果value是对象，返回一个监听key变化的新对象
            // 如果是数组呢
            var type = testType(value)
            if( isCanObserve(value) ){
                value = Observe(value, fun)
            }

            Object.defineProperty(newData, item, {
                set: function(newValue){
                    var oldValue = value

                    // 如果newValue对象，也添加监听事件
                    if( isCanObserve(newValue) ){
                        newValue = Observe(newValue, fun)
                    }

                    value = newValue

                    fun && fun(newValue, oldValue)
                    // 如果属性变化了，newValue是一个对象，那就跟踪他的变化
                },
                get: function(){
                    return value
                }
            })

        })();
    })

    return newData
}

// 监听数组变化
function observeArray( arr, func ){

    // 重新定义push/shift
    ['push','shift','unshift','slice','splice','reverse','pop']
    .forEach(function(item){
        Object.defineProperty(arr, item, {
            get: function(){
                return function(){
                    var args = [].slice.call(arguments);
                    Array.prototype[item].apply(arr, args)
                    func && func()
                }
            }
        })
    })

    // 遍历数组，对于大数组的监听呢？
    return arr
}
