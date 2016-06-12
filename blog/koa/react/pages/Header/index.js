import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

require('./index.scss')

class Home extends Component{
    render(){
        return <div id="header">
            灵岩寺
        </div>
    }
}

export default Home
