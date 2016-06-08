import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

// require('./index.scss')

class NotFound extends Component{
    render(){
        return <div id="notfound">
                    404找不到页面
                </div>
    }
}

export default NotFound
