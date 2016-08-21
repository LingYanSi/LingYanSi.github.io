import {Component} from 'react'
import { Link } from 'react-router'
import Login from 'pages/Login'
import Modal from 'module/Modal'

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
    signout(){
        fetch('/signout', {
            method: 'POST',
            credentials: 'same-origin'
        }).then(res => res.json())
        .then(data => {
            location.reload()
        })
    }
    login(){
        Modal.open(<Login />)
    }
    componentDidMount(){
        this.setCurrent(this.props)
    }
    render(){
        const state = this.state
        const props = this.props

        // jiba
        let classnames = function(obj){
            return Object.keys(obj).map(key => {
                if(obj[key]){
                    return key
                }
            }).filter(item => item).join(' ')
        }

        let avatar_class = classnames({
            'avatar': true,
            login: __global__.login
        })

        return <div id="sidebar" className={props.sidebar ? 'show' : ''}>
                    <div className="sidebar-content">
                        <div className={avatar_class} style={{backgroundImage: `url(${state.avatar})`}} ></div>
                        <ul>
                            { state.list.map((item, index)=>{
                                return <li className={index==state.current?'current':''} key={item.url}>
                                    <Link to={item.url}>{item.title}</Link>
                                </li>
                            })}
                        </ul>
                        <div className="tool">
                            {__global__.login && 0 ? <button onClick={this.signout}>退出</button> : <button onClick={this.login}>登录</button>}
                        </div>
                    </div>
                </div>
    }
}

export default Sidebar
