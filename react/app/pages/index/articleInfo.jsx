
import React,{Component} from 'react'
import ReactDOM,{render} from 'react-dom'
import {Router , Link, Route, IndexRoute, browserHistory, HistoryLocation} from 'react-router'

const ArticleInfo = React.createClass({
    getInitialState(){
        return {}
    },
    search(){
        let form = document.querySelector('#form')
        let fd = new FormData(form)

        Ajax({
            type: 'put',
            // url: '/test/'+this.props.params.id ,
            // url: '/upload',
            url:"/static/data/"+this.props.params.id+".json",
            dataType: 'string',
            // data: fd,
            // timeout: 1000 ,
            // upload: function( precent ){
            //     console.log('不得了',precent)
            // }
        }).then(( data )=>{
            console.log('数据请求成功了呢',data)
            this.setState( JSON.parse(data) )
        },(msg)=>{
            console.log(msg)
        })
    },
    componentDidMount(){
        Ajax({
            type: 'get', 
            url:"/static/data/"+this.props.params.id+".json",
            dataType: 'string',
        }).then(( data )=>{
            console.log('数据请求成功了呢',data)
            this.setState( JSON.parse(data) )
        },(msg)=>{
            console.log(msg)
        })
    },
    render(){
        var state = this.state

        return <div>
            文章ID:{ this.props.params.id }
            <button onClick={this.search }>搜搜</button>
            <form action="" id="form">
                <input type="file" name="heihei"/>
            </form>
            <h2>{state.title}</h2>
            <div>
                {state.content}
            </div>
        </div>
    }
})

export default ArticleInfo
