import {Component} from 'react'

import './index.scss'

const TRANSTION = 'transition'
// 提供一个可滑动的元素
class Swipe extends Component{
    constructor(props){
        super(props)

        this.state = {
            left: 0, // 起始位置
            top: 0, // 起始位置
            startX: 0, // touchstart 位置
            startY: 0, // touchstart 位置
            offsetX: 0, // 左右偏移量
            maxOffsetX: 0, // 最大偏移
            minOffsetX: (1 - this.props.width)/this.props.width, // 最小偏移
            touching: false, // 滑动中
            swipeX: false, // 左右滑动
            swipeY: false, // 上下滑动
            direactX: 0, // 滑动方向 0表示没有滑动 -1逆向 1顺向
            direactY: 0, // 滑动方向 0表示没有滑动 -1逆向 1顺向
            transitioning: false , // 执行动画中
        }

        this.touchstart = this.touchstart.bind(this)
        this.touchmove = this.touchmove.bind(this)
        this.touchend = this.touchend.bind(this)
        this.transitionend = this.transitionend.bind(this)
    }
    touchstart(event){
        // console.log(`开始滑动`, event);
        let state = this.state
        if(state.transitioning) return

        this.refs.ele.classList.remove(TRANSTION)
        state.width = this.refs.ele.clientWidth

        let touch = event.touches[0]
        state.startX = touch.screenX
        state.startY = touch.screenY
    }
    touchmove(event){
        let state = this.state
        if(state.transitioning) return

        let touch = event.touches[0]

        let {screenX, screenY} = touch
        if (!state.swipeY && (state.swipeX || Math.abs(screenX - state.startX) >= Math.abs(screenY - state.startY)) ) {
            state.swipeX = true
            event.preventDefault()
            state.direactX = screenX - state.startX
            state.offsetX = state.left  + state.direactX
            // requestAnimationFrame(function(){console.log(1)})
            this.setOffset(state.offsetX/state.width, this.refs.ele)
        }
        if (!state.swipeX && (state.swipeY || Math.abs(screenX - state.startX) < Math.abs(screenY - state.startY)) ) {
            state.swipeY = true
        }
 
    }
    setOffset(offset, $ele){
        $ele.style.transform = `translateX(${offset * 100}%)`
        $ele.style.webkitTransform = `translateX(${offset * 100}%)`
    }
    touchend(event){
        let state = this.state
        if(state.transitioning) return

        if(state.direactX == 0){
            this.transitionend()
            return
        }
        let $ele = this.refs.ele
        state.left = state.offsetX
        $ele.classList.add(TRANSTION)

        $ele.clientHeight
        if(state.left/state.width < state.minOffsetX){
            state.left = state.minOffsetX * state.width
        }else if(state.left/state.width > state.maxOffsetX){
            state.left = state.maxOffsetX * state.width
        }else{
            if(state.direactX > 0){
                state.left = state.maxOffsetX * state.width
            }else {
                state.left = state.minOffsetX * state.width
            }
        }


        state.transitioning = true
        this.setOffset(state.left/state.width, $ele)


    }
    transitionend(){
        // alert('fuck you');
        let state = this.state
        state.transitioning = false
        state.swipeX = false
        state.swipeY = false
        state.direactX = 0
    }
    render(){
        const props = this.props

        return <div className={`swipe`}
                    onTouchStart = {this.touchstart}
                    onTouchMove = {this.touchmove}
                    onTouchCancel = {this.touchend}
                    onTouchEnd = {this.touchend}
                    onWebkitTransitionEnd={this.transitionend}
                    onTransitionEnd={this.transitionend}>
            <div style={{width: props.width * 100 + '%' }}
                ref='ele' >
                {props.children}
            </div>
        </div>
    }
}

export default Swipe
