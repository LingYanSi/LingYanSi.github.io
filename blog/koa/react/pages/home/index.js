import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import List from 'pages/Article/List'

import Modal from 'module/Modal'
import Tips from 'module/Tips'

import Scroll from 'module/scroll'

import './index.scss'

// lastPosition 记录最后浏览位置
const URL = '/home'

class Home extends Component{
    constructor(){
        super()
        this.state = {
            tips: [{
                content: `硬汉 ⇨ 腰`,
                url: `http://www.xiami.com/song/1772580840?spm=a1z1s.7154410.1996860142.3.7qJGVJ`
            }, {
                content: `Crusade ⇨ Pentatonic`,
                url: `http://www.xiami.com/song/1768980046?spm=a1z1s.7154410.1996860142.1.7qJGVJ`
            }],
            swipe: [1, 2, 3]
        }

    }
    tipsClose(index){
        let tips = this.state.tips
        tips.splice(index, 1)

        this.setState({
            tips: tips
        })
    }
    componentWillUnmount(){
        // this.lastPosition()
        document.body.style.cssText += `;min-height: 0px; `
        Utils.scroll.remove('lastPosition::home')
    }
    lastPosition(){
        const scrollTop = document.body.scrollTop
        const minHeight = scrollTop + window.innerHeight
        // debugger
        console.log('滚动条高度', scrollTop, '页面最低高度', minHeight )
        Utils.lastPosition.set(URL, {scrollTop, minHeight })
    }
    componentDidMount(){

        let data = Utils.lastPosition.get(URL, 'object')
        document.body.style.cssText += `;min-height: ${data.minHeight}px; `
        document.body.scrollTop = data.scrollTop
        // alert(document.body.scrollTop, data.scrollTop)
        console.log('从seesion中拿数据', data);

        // 触发滚动，去加载图片
        Utils.scroll.trigger()

        Utils.scroll.listen('lastPosition::home',()=>{
            this.lastPosition()
        })
    }
    render(){
        let state = this.state

        return <div id="home">
            <div>
                {
                    state.tips.map((item, index) => <Tips key={item.url} {...item} close={this.tipsClose.bind(this, index)}></Tips>)
                }
            </div>
            <Scroll width={140} rowWidth={10} num={10} height={100}>
                {[1,2,3,4,5,6,7,8,9,10].map(item => {
                    return <div className='flex-center' key={item} style={{width: 140, height: 100, 'boxSizing': 'border-box', border: '1px solid red'}}>
                        {item}
                    </div>
                })}
            </Scroll>
            <List len={0}></List>
            <img className='lazy-load-img' src="" data-lazy-img="http://ww4.sinaimg.cn/mw690/699132e6jw1f6mi42zqqtj20gs0b7wfz.jpg" style={{height: 300, width: 400, background: 'red',}} alt=""/>
            <img className='lazy-load-img' src="" data-lazy-img="http://ww4.sinaimg.cn/mw690/699132e6jw1f6mi42zqqtj20gs0b7wfz.jpg" style={{height: 300, width: 400, background: 'red',}} alt=""/>
            <img className='lazy-load-img' src="" data-lazy-img="http://ww4.sinaimg.cn/mw690/699132e6jw1f6mi42zqqtj20gs0b7wfz.jpg" style={{height: 300, width: 400, background: 'red',}} alt=""/>
            <img className='lazy-load-img' src="" data-lazy-img="http://ww4.sinaimg.cn/mw690/699132e6jw1f6mi42zqqtj20gs0b7wfz.jpg" style={{height: 300, width: 400, background: 'red',}} alt=""/>
            <img className='lazy-load-img' src="" data-lazy-bgd="http://ww4.sinaimg.cn/mw690/699132e6jw1f6mi42zqqtj20gs0b7wfz.jpg" style={{height: 300, width: 400, background: 'red',}} alt=""/>
        </div>
    }
}

export default Home
