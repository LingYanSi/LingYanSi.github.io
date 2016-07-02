import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

require('./index.scss')

class Details extends Component{
    constructor(){
        super()
        this.state = {
            title: '',
            content: '',
            time: '',
            tags: [],
            id: 0
        }
    }
    getData(){
        const url = `database/article/${this.props.params.id}.json`
        var that = this

        fetch(url)
            .then( function(response){
                return response.json()
            })
            .then(function(data){
                that.setState(data)
            })
    }
    componentDidMount(){
        this.getData()
    }
    del(){
        var is_del = confirm('确认删除？')
        if( !is_del ){
            return
        }

        fetch(`./article/del?id=${this.state.id}`)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log('删除成功')
                location.href = '#/'
            })
    }
    rawHtml(str){
        return {__html: str}
    }
    render(){
        const state = this.state

        document.body.scrollTop = 0

        return <div id="article-details">
            <h1>{state.title}</h1>
            <div className="tags-wrap">
                标签：{ state.tags.map(item=>{
                    return <span className="tag tag-pink cursor" title={item}>{item}</span>
                }) }
            </div>
            <div className="details-tool">
                <button onClick={this.del.bind(this)}>DEL</button>
                <Link to={`/article/edit/${state.id}`}>
                    <button>编辑</button>
                </Link>
            </div>
            <div className="details-content" dangerouslySetInnerHTML={this.rawHtml(state.content)}></div>
            <div className="details-time">时间：{Utils.time.toString(state.time)}</div>
        </div>
    }
}

export default Details
