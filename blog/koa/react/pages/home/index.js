import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import List from './../Article/List/index.js'

require('./index.scss')

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
            <List></List>
        </div>
    }
}

export default Home
