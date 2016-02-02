
import React,{Component} from 'react'
import ReactDOM,{render} from 'react-dom'
import {Router , Link, Route, IndexRoute, browserHistory, HistoryLocation} from 'react-router'

const ArticleInfo = React.createClass({
    render(){
        return <div>
            文章ID:{ this.props.params.id }
        </div>
    }
})

export default ArticleInfo
