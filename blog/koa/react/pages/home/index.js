import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

require('./home.scss')

class Home extends Component{
    constructor(){
        super()
        console.log(this)
        this.state = {
            list: []
        }
    }
    render(){
        return <div id="home">
            我是首页
        </div>
    }
}

export default Home
