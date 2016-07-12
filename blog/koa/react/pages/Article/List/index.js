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

        fetch('/database/list.json')
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                that.setState({
                    list: data.list
                })
            })
    }
    componentDidMount(){
        this.getList()
    }
    rawHtml(str=''){
        return {
            __html: str
        }
    }
    render(){
        const len = this.props.len
        var list = len ? this.state.list.slice(0,len) : this.state.list

        return <div className="article-list">
            <ul>
                {list.map(item => {
                    return <li key={item.id}>
                        <Link to={`/article/${item.id}`}>
                            <h3>{item.title}</h3>
                            <div className="summary" dangerouslySetInnerHTML={this.rawHtml(item.content)}></div>
                            <p className="bott">
                                <span className="time">{Utils.time.toString(item.time)}</span>
                            </p>
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    }
}

// 用于检测类型，类型检测只能是class的静态方法
List.propTypes = {
    len: React.PropTypes.number.isRequired,
}

export default List
