function Touch($ele) {
    $ele.addEventListener('touchstart', touchstart)
    $ele.addEventListener('touchmove', touchmove)
    $ele.addEventListener('touchend', touchend)

    var state = {
        prev: {
            x: 0,
            y: 0,
            x1: 0,
            y1: 0
        },
        current: {
            x: 0,
            y: 0,
            x1: 0,
            y1: 0
        },
        getLen(prev){
            return Math.pow(prev.x - prev.x1, 2) +  Math.pow(prev.y - prev.y1, 2)
        },
        getData(){
            var len1 = this.getLen(this.prev)
            var len2 = this.getLen(this.current)

            return Math.pow(len2/len1, 1/2)
        },
        getCenter(prev, arr){

            var xCenter = (prev.x + prev.x1)/2 + arr[12] + 'px'
            var yCenter = (prev.y + prev.y1)/2 + arr[13]+ 'px'
            return  xCenter + ' ' + yCenter
        },
        queue: [],
        render(){
            var queue = this.queue
            if(queue.length) {
                queue[queue.length - 1]()
                queue.splice(0)
            }
        }
    }

    function touchstart(event){
        var touches = event.touches
        var touch1 = touches[0]
        var touch2 = touches[1] || {}

        state.current = state.prev = {
            x: touch1.screenX,
            y: touch1.screenY,
            x1: touch2.screenX,
            y1: touch2.screenY
        }

    }

    function touchmove(event){
        event.preventDefault()
        event.stopPropagation()
        var touches = event.touches
        var touch1 = touches[0]
        var touch2 = touches[1] || {}

        state.current =  {
            x: touch1.screenX,
            y: touch1.screenY,
            x1: touch2.screenX,
            y1: touch2.screenY
        }

        // state.queue.push(function(){

            if(touches.length == 2) {
                var BILI = state.getData()

                var m = [
                    BILI, 0, 0, 0,
                    0, BILI, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1,
                ]
            } else {
                var BILI = init[0]
                var m = [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    (state.current.x - state.prev.x)/BILI, (state.current.y - state.prev.y)/BILI, 0, 1,
                ]
            }

            // 获取transform-origin 通过init获取到偏移位置
            this.style.transformOrigin = state.getCenter(state.prev, init)
            init = mm(init, m)

            console.log(state.prev, state.current, state.getCenter(state.prev, init))
            // 其实就是元素在这里放大

            state.prev = state.current
            setMatrix(init)


        // }.bind(this))
        //
        // requestAnimationFrame(function(){
        //     state.render()
        // })
    }

    function touchend(){

    }

}

Touch(document.querySelector('img'))

function setMatrix(matrix){
    document.querySelector('img').style.cssText += `;transform: matrix3d(
        ${matrix.join(',')}
    );
    `
}
console.log('-------------------');

var x = [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
       0, 0, 0, 1]

var y = [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1]

var z = [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1]

var h = [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1]

var w = [
    Math.cos(-Math.PI/4), Math.sin(-Math.PI/4), 0, 0,
    -Math.sin(-Math.PI/4), Math.cos(-Math.PI/4), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
    ]

var init = mm(x, y, z, h )

setMatrix(init)

// 矩阵连续变换
function mm(){
    // 因为
    return [].slice.call(arguments).reverse().reduce(function(prev, current){
        return matrix(prev, current)
    })
}

// 正方形矩阵计算
function matrix(x, y) {
    var xx = Math.sqrt(x.length)
    var yy = Math.sqrt(y.length)

    var m = []
    for (var i = 0; i < xx; i++) {

        for (var j = 0; j < xx; j++) {
            var ele = 0
            for (var z = 0; z < xx; z++) {
                ele += x[i*xx + z] * y[j + z*xx]
            }
            m.push(ele)
        }

    }

    return m
}
