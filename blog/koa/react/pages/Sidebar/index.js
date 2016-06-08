import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

require('./index.scss')

class Sidebar extends Component{
    constructor(){
        super()
        const LIST = [
            { url: '/', title: '首页' },
            { url: '/about', title: '关于' },
            { url: '/article', title: '文章' },
        ]
        this.state = {
            list: LIST ,
            current: 0
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

        console.log('current',current, hash)
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

        return <div id="sidebar">
                    { state.list.map((item, index)=>{
                        return <li className={index==state.current?'current':''}>
                            <Link to={item.url}>{item.title}</Link>
                        </li>
                    })}
                </div>
    }
}

export default Sidebar
