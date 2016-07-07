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
                content: `旅行者 ⇨ 吴俊德`,
                url: `http://www.xiami.com/song/1771509481?spm=a1z1s.6659509.0.0.q1s4GZ`
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
                    return <Tips {...item} close={this.tipsClose.bind(this, index)}></Tips>
                })
            }
            {/*<div className="banner"></div>*/}
            <List len={0}></List>
        </div>
    }
}

export default Home
