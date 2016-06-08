import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

require('./index.scss')

class List extends Component{
    constructor(){
        super()
        // console.log(this)
        this.state = {
            list: []
        }
    }
    getList(){
        var that = this

        fetch('database/list.json')
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data);
                that.setState({
                    list: data.list
                })
            })
    }
    componentDidMount(){
        this.getList()
    }
    render(){
        return <div id="article-list">
            <h1>-------文章列表-----</h1>
            <ul>
                {this.state.list.map(function(item){
                    return <li>
                        <Link to={`/article/${item.id}`}>
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    }
}

export default List
