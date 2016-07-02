import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

require('./index.scss')

class Home extends Component{
    render(){
        var props = this.props
        
        return <div id="header" className={props.sidebar ? '' : 'sidebar-hide'}>
            灵岩寺
        </div>
    }
}

export default Home
