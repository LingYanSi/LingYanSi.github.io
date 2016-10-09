
// 矩阵连续变换
function matrix(){
    // 反转数组
    return [].slice.call(arguments).reverse().reduce(function(prev, current){
        return matrix.matrixOnce(prev, current)
    })
}

// 正方形矩阵计算
matrix.matrixOnce = function(x, y) {
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

// 初始矩阵
var init = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]

// 图片缩放
function Touch($ele) {
    $ele.addEventListener('touchstart', touchstart)
    $ele.addEventListener('touchmove', touchmove)
    $ele.addEventListener('touchend', touchend)

    // 状态存储
    var state = {
        // 原点位置
        origin: {
            x: $ele.clientWidth/2,
            y: $ele.clientHeight/2,
            width: $ele.clientWidth,
            height: $ele.clientHeight
        },
        // 上一个位置
        prev: {
            x: 0,
            y: 0,
            x1: 0,
            y1: 0
        },
        // 当前位置
        current: {
            x: 0,
            y: 0,
            x1: 0,
            y1: 0
        },
        // 获取两点间距离
        getLen(prev){
            return Math.pow(prev.x - prev.x1, 2) +  Math.pow(prev.y - prev.y1, 2)
        },
        // 获取缩放比例
        getScale(){
            var len1 = this.getLen(this.prev)
            var len2 = this.getLen(this.current)

            return Math.pow(len2/len1, 1/2)
        },
        // touchmove时把渲染任务假如队列，等到requestAnimationFrame时候，合并任务，只渲染一次
        queue: [],
        render(){
            var queue = this.queue
            if(queue.length) {
                queue[queue.length - 1]()
                queue.splice(0)
            }
        }
    }

    // 有效触摸点， 是否在滑动中
    var num = 0 , moving = false

    function touchstart(event){
        event.preventDefault()
        event.stopPropagation()

        var touches = event.touches
        var touch1 = touches[0]
        var touch2 = touches[1] || {}

        if(!moving){
            num = touches.length
        }
        state.current = state.prev = {
            x: touch1.screenX,
            y: touch1.screenY,
            x1: touch2.screenX,
            y1: touch2.screenY
        }

    }

    function touchmove(event){
        moving = true
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

        state.queue.push(function(){
            if(num == 2) {
                // 双指触摸
                var SCALE = state.getScale()
                // x,y轴缩放
                var m = [
                    SCALE, 0, 0, 0,
                    0, SCALE, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1,
                ]
                // 计算位移，然后在弄回来
                var current = state.current
                var prev = state.prev
                // 在这里，我们设置transform-origin: 0 0 0;然后所有的计算以图片的左上角为基准，这样方便计算位置变换后的位移
                var rect = $ele.getBoundingClientRect()
                var fuck = {
                    x: (current.x + current.x1)/2 - rect.left,
                    y: (current.y + current.y1)/2 - rect.top
                }
                // 计算位移
                var fu = {
                    x: - fuck.x * (SCALE - 1),
                    y: - fuck.y * (SCALE - 1)
                }

                // 计算缩放后矩阵
                init = matrix(init, m)
                var S = init[0]
                var m = [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    fu.x/S, fu.y/S, 0, 1,
                ]

                init = matrix(init, m)

                // 保存当前信息
                state.prev = state.current

                setMatrix(init)

            } else if(num == 1) {
                // 单只触摸
                var SCALE = init[0]
                // x,y轴位移
                var m = [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    (state.current.x - state.prev.x)/SCALE, (state.current.y - state.prev.y)/SCALE, 0, 1,
                ]
                // 得到位移后矩阵
                init = matrix(init, m)
                // 保存当前信息
                state.prev = state.current

                setMatrix(init)
            }

        }.bind(this))

        requestAnimationFrame(function(){
            state.render()
        })
    }

    // 滑动结束
    function touchend(event){
        event.preventDefault()
        event.stopPropagation()
        // 结束滑动任务
        if(moving){
            num = 0
            moving = false
        }
    }

}

var $img = document.querySelector('img')
var $log = document.querySelector('#log')

var $body = document.body

$body.addEventListener('touchmove', function(event){
    event.preventDefault()
})

if($img.width || $img.complete) {
    Touch($img)
}else {
    $img.onload = function(){
        Touch($img)
    }
}


// 渲染
function setMatrix(matrix){
    document.querySelector('img').style.cssText += `;transform: matrix3d(
        ${matrix.join(',')}
    );
    `
}


// z轴旋转
// var w = [
//     Math.cos(-Math.PI/4), Math.sin(-Math.PI/4), 0, 0,
//     -Math.sin(-Math.PI/4), Math.cos(-Math.PI/4), 0, 0,
//     0, 0, 1, 0,
//     0, 0, 0, 1
//     ]
