
import React,{Component} from 'react'
import {Router , Link, Route, browserHistory} from 'react-router'

require('./style/sidebar.less')

const Nav = React.createClass({
    render(){
        return <div className="sidebar">
            <li>
                <Link to='/home'>主页</Link>
            </li>
            <li>
                <Link to='/article'>文章</Link>
            </li>
            <li>
                <Link to='/message'>留言</Link>
            </li>
            <li>
                <Link to='/about'>关于</Link>
            </li>
        </div>
    }
})

export default Nav
