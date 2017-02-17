// 监听数据变化
// vue会追踪数据变化，react不会，react在setState的时候，就会更新页面，
// 我们可以通过componentShouldUpdate方法来决定，是否更新组件
// 本着自动化的目标，我们也期望对数据依赖做出追踪，然后当state变化的时候，自动更新

// let obj = {name: 1}
//
// let value = '111'
// Object.defineProperty(obj , 'name', {
//     get(){
//         return value
//     },
//     set(newValue){
//         console.log('设置新值', newValue)
//         value = newValue
//     }
// })

let util = {
    isFunction(arg){
        return !!Object.prototype.toString.call(arg).match('Function')
    },
    isObject(arg){
        return !!Object.prototype.toString.call(arg).match('Object')
    },
    isArray(arg){
        return !!Object.prototype.toString.call(arg).match('Array')
    },
    isBoolean(arg){
        return !!Object.prototype.toString.call(arg).match('Boolean')
    },
}

// 监听数据
/**
 * [observe description]
 * @param  {[type]}   data                [需要监听的对象]
 * @param  {Boolean}  [deepObserve=false] [是否深度监听]
 * @param  {Function} callback            [数据变化后，的毁掉函数]
 * @param  {String}   [prevKey='']        [传递完整的key->key->key]
 * @return {[type]}                       [返回observe data]
 */
function observe(data, deepObserve = false, callback, prevKey = '') {
    let newData = {}
    Object.keys(data).forEach(key => {
        if (data.hasOwnProperty(key)) {
            let value = data[key]

            let itemPrevKey = prevKey + key + ','
            // 深度监听
            if (deepObserve) {
                if (util.isObject(value)) {
                    value = observe(value, deepObserve, callback, itemPrevKey)
                } else if (util.isArray(value)) {
                    value = observeArray(value, deepObserve, callback, itemPrevKey)
                }
            }

            Object.defineProperty(newData , key, {
                get(){
                    return value
                },
                set(newValue){

                    let oldValue = value
                    value = newValue

                    // 如果新值还是obj，那就继续监听
                    if (deepObserve) {
                        if (util.isObject(value)) {
                            value = observe(value, deepObserve, callback, itemPrevKey)
                        } else if (util.isArray(value)) {
                            value = observeArray(value, deepObserve, callback, itemPrevKey)
                        }
                    }

                    // 回调函数
                    callback && callback(itemPrevKey, newValue, oldValue )
                }
            })
        }
    })

    return newData
}

// 监听数组变化
function observeArray(array, deepObserve, callback, itemPrevKey) {
    array = [...array]
    // 监听数组push,pop,splice,reverse,shift,unshift
    ['push', 'pop', 'splice', 'reverse', 'shift', 'unshift'].forEach(key =>{
        Object.defineProperty(array, key, {
            get(){
                return function(...args){
                    console.log('数组变化', key)
                    let oldValue = [...array]
                    let result = Array.prototype[key].call(array, ...args)
                    callback && callback(itemPrevKey, array, oldValue)
                    return result
                }
            }
        })
    })

    return array
}


let obj = {user: {name: '猪八戒'} }
let xx = observe(obj, true, (...args)=> {
    console.log(...args)
})
