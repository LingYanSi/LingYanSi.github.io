function Tap($ele, callback, NUM, TIME ){
    $ele.addEventListener('touchstart', touchstart)
    $ele.addEventListener('touchmove', touchmove)
    $ele.addEventListener('touchend', touchend)

    var state = {
        times: [],
        recording: false,
        first: false,
        reset(){
            this.times = []
            this.recording = false
            this.first = false
        }
    }
    // 时间间隔的计算应该是 第一次touchstart -> touchend -> touchend
    // 我们会在每一次touchstart 时候，进行时间间隔校验，如果超出时长，就从新计数

    function touchstart(event){
        if(event.touches.length == 1){

            var time = new Date().getTime()

            // 时间太久，重置
            if(time - (state.times[state.times.length - 1] || 0)> TIME){
                state.reset()
                state.times.push(time)
                state.recording = true
                state.first = true
            }
        } else {
            state.reset()
        }
    }

    function touchmove(){
        state.reset()
    }

    function touchend(event){
        if(state.recording && !state.first) {
            var time = new Date().getTime()
            if (time - (state.times[state.times.length - 1] || 0) <= TIME){
                state.times.push(time)
                if(state.times.length == NUM){
                    state.reset()
                    callback && callback(event)
                }
            } else {
                state.reset()
            }
        }

        state.first = false
    }

    return {
        // 销毁
        destory(){
            $ele.removeEventListener('touchstart', touchstart)
            $ele.removeEventListener('touchmove', touchmove)
            $ele.removeEventListener('touchend', touchend)
        }
    }
}
