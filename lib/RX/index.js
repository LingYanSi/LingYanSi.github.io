// 经常面临的一个问题是，点击按钮多次触发同一个事件
// 或者像keydown/scroll等事件被连续触发
//


// 后响应,当事件被连续触发后，只执行最后一次触发的事件
function Debounce(callback, fps = 1000/60){
    let ST = null
    return (...args) => {
        clearTimeout(ST)
        ST = setTimeout(()=>{
            callback(...args)
        }, fps)
    }
}


// 事件被第一次触发后，立即执行，当过了fps后才能再次执行
function Throttle(callback, fps = 1000/60){
    let disabled =  false

    return (...args) => {
        if(!disabled) {
            disabled = true
            callback(...args)

            setTimeout(()=>{
                disabled = false
            }, fps)
        }
    }
}

// 事件第一次被触发后，立即执行，后续事件是否能继续执行，需要callback来决定
function ThrottleByHand(callback){
    let disabled =  false

    function enable(){
        disabled = false
    }
    return (...args) => {
        if(!disabled) {
            disabled = true
            // 做一个回调函数传入，可手动开启
            args.push(enable)
            let a = callback.apply(null, args )

            // 也接受一个Promise对象
            if(Object.prototype.toString.call(a).toLowerCase().match(/promise/)) {
                a.then(msg => {
                    disabled = false
                })
            }
        }
    }
}
