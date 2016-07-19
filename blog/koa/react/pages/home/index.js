import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import List from './../Article/List/index.js'

import Modal from 'module/modal/index.js'
import Tips from 'module/tips/index.js'

require('./index.scss')

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
            }]
        }
    }
    tipsClose(index){
        let tips = this.state.tips
        tips.splice(index, 1)

        console.log(tips);
        this.setState({
            tips: tips
        })
    }
    render(){
        return <div id="home">
            {
                this.state.tips.map((item, index) => {
                    return <Tips {...item} close={this.tipsClose.bind(this, index)} key={item.url}></Tips>
                })
            }
            {/*<div className="banner"></div>*/}
            <List len={0}></List>
        </div>
    }
}

export default Home
