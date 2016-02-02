
import React,{Component} from 'react'
import {Router , Link } from 'react-router'

const Article = React.createClass({
    render(){
        const LIST = [
                {id: 1, title:'蒋门神'},
                {id: 2, title:'潘金莲'},
                {id: 3, title:'宋江山'},
                {id: 4, title:'蔡京'},
            ]
        return <div>
            <h1>文章</h1>
            <div>
                {LIST.map((item)=>{
                    let url = `/article/${item.id}`
                    return <li>
                        <Link to={url} > {item.title} </Link>
                    </li>
                })}
            </div>
        </div>
    }
})

export default Article
