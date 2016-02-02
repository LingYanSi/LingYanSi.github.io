
import React,{Component} from 'react'
import {Router , Link, Route, browserHistory} from 'react-router'

const Nav = React.createClass({
    render(){
        return <div className="sidebar">
            <h1>SPA</h1>
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
