import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

import './index.scss'

class Sidebar extends Component{
    constructor(){
        super()
        const LIST = [
            { url: '/', title: '首页' },
            { url: '/article', title: '文章' },
            { url: '/about', title: '关于' },
        ]
        this.state = {
            list: LIST ,
            current: 0 ,
            // avatar: 'http://ww1.sinaimg.cn/mw1024/69b8b46egw1f5gv71trm4j21ho1hon94.jpg'
            avatar: 'http://ww3.sinaimg.cn/mw1024/69b8b46egw1f5h32f4t07j20k00qojwp.jpg'
        }
    }
    componentWillReceiveProps(newProps){
        this.setCurrent(newProps)
    }
    setCurrent(props){
        const PATH_NAME = props.location.pathname

        let current = 0
        const MATCHED = this.state.list.some((item, index) => {
            if (PATH_NAME === item.url) {
                current = index
                return true
            }
        })
        if(!MATCHED){
            current = -1
        }
        if(current != this.state.current){
            this.setState({current})
        }
    }
    componentDidMount(){
        this.setCurrent(this.props)
    }
    render(){
        const state = this.state
        const props = this.props

        return <div id="sidebar" className={props.sidebar ? 'show' : ''}>
                    <button className={props.sidebar ? 'show' : ''}
                            onClick={props.handleSidebarChange}>三</button>
                    <div className="sidebar-content">
                        <div className="avatar" style={{backgroundImage: `url(${state.avatar})`}} ></div>
                        <ul>
                            { state.list.map((item, index)=>{
                                return <li className={index==state.current?'current':''} key={item.url}>
                                    <Link to={item.url}>{item.title}</Link>
                                </li>
                            })}
                        </ul>

                        <Link to='/login'>登录</Link>
                    </div>
                </div>
    }
}

export default Sidebar
