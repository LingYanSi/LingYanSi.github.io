import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import List from 'pages/Article/List'

import Modal from 'module/Modal'
import Tips from 'module/Tips'

import Scroll from 'module/scroll'
import Upload from 'module/Upload'

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
        // 组建卸载前，移除掉min-height，并移除对scroll事件的监听
        document.body.style.cssText += `;min-height: 0px; `
        Utils.scroll.remove('lastPosition::home')
    }
    lastPosition(){
        // 把当前页面的scrollTop记录下来，存储到sessionStorage中去
        const scrollTop = document.body.scrollTop
        const minHeight = scrollTop + window.innerHeight
        Utils.lastPosition.set(URL, {scrollTop, minHeight })
    }
    componentDidMount(){

        let data = Utils.lastPosition.get(URL, 'object')
        let $body = document.body
        $body.style.cssText += `;min-height: ${data.minHeight}px; `
        $body.scrollTop = data.scrollTop

        // 触发滚动，去加载图片
        Utils.scroll.tick()

        Utils.scroll.listen('lastPosition::home',()=>{
            this.lastPosition()
        })
    }
    render(){
        let state = this.state

        return <div id="home">
            <Upload></Upload>
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
        </div>
    }
}

export default Home
