// 双指缩放
// transform-origin: x y ;
// transform: translate3d(x,y,0) scale3d(x,x,1) ;
var $console = document.querySelector('#console')
    //
function scale($ele, $scaleEle) {
    var state = {
        o: {
            x: 0,
            y: 0
        },
        translate: {
            x: 0,
            y: 0
        },
        bili: 1,
        width: $scaleEle.clientWidth,
        height: $scaleEle.clientHeight,
        previous: {
            t1: {
                x: 0,
                y: 0
            },
            t2: {
                x: 0,
                y: 0
            }
        }
    }
    var stateCache = {}
    var TRANSITION_CLASS = 'transition'
    var SCALE_STATE = ['2', '1', '0']

    var math_util = {
            getLength: function(x1, y1, x2, y2) {
                return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
            },
            getO: function(p1, p2, P1, P2) {

                var bili = this.getLength(P1.x, P1.y, P2.x, P2.y) / this.getLength(p1.x, p1.y, p2.x, p2.y)
                bili = Math.pow(bili, .5)

                var newBili = state.bili * bili

                newBili = newBili < .4 ? .4 : newBili
                newBili = newBili > 4 ? 4 : newBili

                var transformOrigin = newBili > 1 ? (P1.x + P2.x) / 2 + 'px ' + (P1.y + P2.y) / 2 + 'px' : 'center'
                state.transformCache = transformOrigin

                return {
                    bili: newBili,
                    transformOrigin: transformOrigin,
                    O: {
                        x: newBili > 1 ? (newBili * state.o.x + (1 - newBili) * (p1.x + p2.x) / 2) : 0,
                        y: newBili > 1 ? (newBili * state.o.y + (1 - newBili) * (p1.y + p2.y) / 2) : 0
                    }
                }
            }
        }
        // math_util.getO({x:0,y:0},{x:1,y:0},{x:0,y:1},{x:2,y:0},{x:0,y:2})
    var time1 = 0,
        time2 = 0
    var scale = {
        touchstart: function(event) {
            var t1 = event.touches[0]
            var t2 = event.touches[1]

            stateCache = ''
            state.touchend = false
            state.t1 = {
                x: t1.clientX,
                y: t1.clientY
            }
            if (!t2) return
                //
            time2 = time1 = 0
            state.t2 = {
                    x: t2.clientX,
                    y: t2.clientY
                }
                // state.len = math_util.getLength(t1.clientX, t1.clientY,t2.clientX, t2.clientY )
        },
        touchmove: function(event) {
            var t1 = event.touches[0]
            var t2 = event.touches[1]
                // 阻止浏览器默认滑动，可以避免很多操蛋的情况
            event.preventDefault()
            time2 = time1 = 0

            if (t2 && !state.single) {
                state.double = true
                state.T1 = {
                    x: t1.clientX,
                    y: t1.clientY
                }
                state.T2 = {
                    x: t2.clientX,
                    y: t2.clientY
                }

                if (!scale.isPinVilda()) return
                state.previous.t1 = state.T1
                state.previous.t2 = state.T2
                    // requestAnimationFrame(function(){
                stateCache = math_util.getO(state.t1, state.t2, state.T1, state.T2)
                    // 还需要控制灵敏度

                requestAnimationFrame(function() {
                    $scaleEle.style.cssText += ';transform-origin:' + stateCache.transformOrigin + ' ;transform:  scale(' + stateCache.bili + ',' + stateCache.bili + ');'
                })

            }
            if (!t2 && !state.double) {
                var obj = scale.translate_pipe(t1.clientX - state.t1.x, t1.clientY - state.t1.y)
                $console.textContent = JSON.stringify(stateCache) + JSON.stringify(obj)
                state.single = true
                $scaleEle.style.cssText += ';transform-origin:' + state.transformOrigin + ' ;transform: translate3d(' + (obj.x) + 'px,' + (obj.y) + 'px,0)  scale3d(' + state.bili + ',' + state.bili + ',1)  ;'
            }

            // })
        },
        isPinVilda: function() {
            var currentLen = Math.pow(math_util.getLength(state.T1.x, state.T1.y, state.T2.x, state.T1.y), .5)
            var prevLen = Math.pow(math_util.getLength(state.previous.t1.x, state.previous.t1.y, state.previous.t2.x, state.previous.t1.y), .5)

            $console.textContent = '' + Math.abs(currentLen - prevLen) + ',' + currentLen + ',' + prevLen
            return Math.abs(currentLen - prevLen) > .5
        },
        translate_pipe: function(x, y) {
            // 对值进行处理
            // 边界校验失败，不会校验，无法判断原点在哪里
            var obj = {
                x: x,
                y: y
            }

            // 需要知道原点的相对位置

            var X_MAX = state.width * (state.bili - 1),
                Y_MAX = state.height * (state.bili - 1)

            if (state.o.x + x > 0) {
                obj.x = -state.o.x
                obj.overflow_x = x - state.o.x
            } else if (state.o.x + x < -X_MAX) {
                obj.x = -X_MAX - state.o.x
                obj.overflow_x = x - X_MAX - state.o.x
            }

            if (state.o.y + y > 0) {
                obj.y = -state.o.y
                obj.overflow_y = y - state.o.y
            } else if (state.o.y + y < -Y_MAX) {
                obj.y = -Y_MAX - state.o.y
                obj.overflow_y = y - Y_MAX - state.o.y
            }

            obj.bili = state.bili


            return {
                x: x + state.o.x,
                y: y + state.o.y 
            }
        },
        touchend: function(event) {

            if (state.double) {
                stateCache && (state.bili = stateCache.bili, state.transformOrigin = stateCache.transformOrigin, state.o = stateCache.O)

                scale.dataScale(SCALE_STATE[0])
                if (state.bili < 1) {
                    $scaleEle.classList.add(TRANSITION_CLASS);
                    $scaleEle.clientHeight

                    $scaleEle.style.cssText += '; transform: scale3d(1,1,1);'
                    state.bili = 1

                } else if (state.bili == 1) {
                    scale.dataScale(SCALE_STATE[1])
                }
            }
            if (state.single) {
                // state.single = false
            }
            if (!event.touches.length) {
                if (!state.single && !state.double) {
                    if (time2 != time1) {
                        time2 = new Date().getTime()
                        scale.doubleClick(time1, time2)
                    } else {
                        time1 = new Date().getTime()
                    }
                }
                state.double = false
                state.single = false
            }
        },
        doubleClick: function(t1, t2) {
            if (t2 - t1 < 250) {
                $scaleEle.classList.add(TRANSITION_CLASS)
                $scaleEle.clientHeight

                switch (this.dataScale()) {
                    case SCALE_STATE[1]:
                        console.log('放大')
                        this.dataScale(SCALE_STATE[0])
                        $scaleEle.style.cssText += ';transform: scale3d(4,4,1);'
                        state.bili = 4
                        state.transformOrigin = 'center'
                        break
                    case SCALE_STATE[0]:
                        console.log('复原')
                        this.dataScale(SCALE_STATE[1])
                        $scaleEle.style.cssText += ';transform: scale3d(1,1,1);'
                        state.bili = 1
                        state.transformOrigin = 'center'
                        state.o = {
                            x: 0,
                            y: 0
                        }
                        break
                    default:
                        console.log('放大')
                        this.dataScale(SCALE_STATE[0])
                        $scaleEle.style.cssText += ';transform: scale3d(4,4,1);'
                        state.bili = 4
                        state.transformOrigin = 'center'
                }
            }
            time1 = time2 = 0
        },
        dataScale: function(num) {
            if (num) {
                $scaleEle.dataset['scale'] = num
            } else {
                return $scaleEle.dataset['scale']
            }
        },
        transitionend: function() {
            $scaleEle.classList.remove(TRANSITION_CLASS)
        },
        events: function() {
            $ele.addEventListener('touchstart', this.touchstart)
            $ele.addEventListener('touchmove', this.touchmove)
            $ele.addEventListener('touchend', this.touchend)
            $ele.addEventListener('touchleave', this.touchend)
            $ele.addEventListener('touchcancel', this.touchend)

            $scaleEle.addEventListener('transitionend', this.transitionend)
        },
        init: function() {
            this.events()
        }
    }
    scale.init()
}
