import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

require('./index.scss')

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
        }
    }
    hashChange(){
        var hash = location.hash.slice(1)
        var current = 0
        this.state.list.forEach((item, index)=>{
            hash.startsWith(item.url) && (current=index)
        })

        this.setState({
            current: current
        })

    }
    addHashChange(){
        window.addEventListener('hashchange', this.hashChange.bind(this))
    }
    componentDidMount(){
        this.hashChange()
        this.addHashChange()
    }
    render(){
        const state = this.state
        const props = this.props

        return <div id="sidebar" className={props.sidebar ? 'show' : ''}>
                    <button className={props.sidebar ? 'show' : ''}
                            onClick={props.handleSidebarChange}>三</button>
                    <div className="avatar">

                    </div>
                    <ul>
                        { state.list.map((item, index)=>{
                            return <li className={index==state.current?'current':''} key={item.url}>
                                <Link to={item.url}>{item.title}</Link>
                            </li>
                        })}
                    </ul>
                </div>
    }
}

export default Sidebar
