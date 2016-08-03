import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import List from 'pages/Article/List'

import Modal from 'module/Modal'
import Tips from 'module/Tips'

import Swipe from 'module/swipe'

import './index.scss'

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
    deleteSwipe(item){
        this.setState({
            swipe: this.state.swipe.filter(index => index!=item)
        })
    }
    tipsClose(index){
        let tips = this.state.tips
        tips.splice(index, 1)

        this.setState({
            tips: tips
        })
    }
    render(){
        let state = this.state

        return <div id="home">
            {state.swipe.map(item => {
                const width = item/10 + 1
                return <Swipe width={width} key={item}>
                    <div className="text">
                        <div className="fuck" style={{width: 1/width * 100 + '%'}}></div>
                        <div className="side" onClick={this.deleteSwipe.bind(this, item)}></div>
                    </div>
                </Swipe>
            })}
            {
                this.state.tips.map((item, index) => {
                    return <Tips {...item} close={this.tipsClose.bind(this, index)} key={item.url}></Tips>
                })
            }
            <List len={0}></List>
        </div>
    }
}

export default Home
