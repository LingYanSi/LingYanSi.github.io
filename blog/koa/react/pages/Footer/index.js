import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

require('./index.scss')

class Home extends Component{
    render(){
        return <div id="footer">
            lingyansi.github.io about all right @2016
        </div>
    }
}

export default Home
