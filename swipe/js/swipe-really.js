
function swipeReal(selector, direction, CLASSNAME){
    // 父元素,父元素的宽度应要比子元素的宽度小
    var $parent = document.querySelector(selector)
    // 子元素
    var $dom = $parent.firstElementChild

    // 判断是左右滑动，还是上下滑动
    var DIR = direction=='left' || direction===undefined

    var state = {
        canSwipe: true , // 是否可以滑动
        swiping: false , // 滑动中中
        swipeX: true , // 是否可以左右滑动
        swipeY: true , // 是否可以上下滑动
        sXing: false, // 左右滑动
        sYing: false , // 上下滑动中
        time: {
            s: 0 ,
            e: 0 ,
            PER: 30 // 求瞬时速度的时间差
        },
        position: { // 求瞬时速度的距离差
            s: 0 ,
            e: 0
        },
        v: 0 , // 速度
        SPEED: 200 , // 位移常量
        distance: {
            MAX: 0, // 距离最大值
            MIN: DIR ? $parent.offsetWidth - $dom.offsetWidth : $parent.offsetHeight - $dom.offsetHeight ,
            current: 0 // touchstart时，元素所处位置
        }
    }



    var xx,yy,XX,YY ;

    var handler = {
        touchstart: function(event){
            if(!state.canSwipe) return

            // touchstart事件无法被触发
            state.canSwipe = false
            // 滑动中
            state.swiping = true

            var touch = event.touches[0]
            XX = xx = touch.screenX ,YY = yy = touch.screenY

            state.time.e = state.time.s = new Date().getTime()
            state.position.e = state.position.s = DIR ? xx : yy

        },
        touchmove: function(event){
            // requestAnimationFrame(function(){
            //     console.log(12);
            // })
            if(!state.swiping) return

            var touch = event.touches[0]
            YY = touch.screenY , XX = touch.screenX

            var time = new Date().getTime()
            // 生成瞬时速度
            if( time - state.time.e >= state.time.PER ){

                state.position.s = state.position.e
                state.position.e = DIR ? XX : YY

                state.time.s = state.time.e
                state.time.e = time

                state.v = (state.position.e - state.position.s) / (state.time.e - state.time.s)

                // console.log('速度',state.v,'距离', state.v*state.SPEED, state.position.e - state.position.s )

            }

            // 左右滑动
            if( state.sXing || (state.swipeX && Math.abs(XX-xx)>Math.abs(YY-yy) ) ){
                state.swipeY = false

                if(!DIR) return
                state.sXing = true

                event.stopPropagation()
                event.preventDefault()

                $dom.style.cssText += '-webkit-transform:translate3d('+(XX-xx+ state.distance.current)+'px,0,0)'
            }

            // 上下滑动
            if( state.sYing || (state.swipeY && Math.abs(XX-xx)<Math.abs(YY-yy)) ){
                state.swipeX = false

                if(DIR) return
                state.sYing = true

                event.stopPropagation()
                event.preventDefault()

                $dom.style.cssText += '-webkit-transform:translate3d(0, '+(YY-yy+ state.distance.current)+'px, 0)'

            }
        },
        touchend: function(event){
            // 如果有滑动行为
            if(state.sXing || state.sYing ){
                $dom.classList.add(CLASSNAME)

                $dom.style.cssText +=  DIR ? '-webkit-transform:translate3d('+( handler.getDistance() )+'px,0,0)' :
                    '-webkit-transform:translate3d(0 ,'+( handler.getDistance() )+'px, 0)'
                // 有滑动行为但速度为零
                if( state.v == 0 && ( (DIR && XX == xx) || (!DIR && YY == yy) ) ){
                    handler.reset()
                }
            }else{
                // 无滑动行为
                handler.reset()
            }
            // 有滑动
        },
        // 重置
        reset: function(){
            // 重置
            xx = XX = yy = YY = 0
            $dom.classList.remove(CLASSNAME)
            state.sXing = false , state.sYing = false
            state.canSwipe = true
            state.swipeY = true
            state.swipeX = true
        },
        init: function(){
            // 初始化

        },
        // 根据速度和初始distance生成目标位置
        getDistance: function(){
            var dis = DIR ? (state.v*state.SPEED + XX -xx) : (state.v*state.SPEED + YY -yy)

            state.distance.current = dis + state.distance.current

            return state.distance.current = this.distancePiPe( state.distance.current )
        },
        // 对distance进行边界校验
        distancePiPe: function(dis){
            dis = dis > state.distance.MAX ? state.distance.MAX : dis
            dis = dis < state.distance.MIN ? state.distance.MIN : dis

            return dis
        },
        // 手动改变transform new swipeReal().goto(100)
        goto: function(dis){
            dis = this.distancePiPe(dis)
            if(dis === state.distance.current ) return

            state.distance.current = dis
            state.canSwipe = false

            $dom.classList.add(CLASSNAME)
            $dom.offsetWidth

            $dom.style.cssText += DIR ? ';-webkit-transform:translate3d('+dis+'px, 0 ,0);' : ';-webkit-transform:translate3d(0,'+dis+'px,0);' ;
        }
    }
    $parent.addEventListener('touchstart',  handler.touchstart )
    $parent.addEventListener('touchmove',  handler.touchmove )
    $parent.addEventListener('touchend',  handler.touchend )

    // 监听滚动结束
    $dom.addEventListener('webkitTransitionEnd', handler.reset )

    return handler
}
