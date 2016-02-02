
import React,{Component} from 'react'
import ReactDOM,{render} from 'react-dom'
import  { createHistory, useBasename } from 'history'

// import Calendar from 'rc-calendar' // 日历组件

import {Router , Link, Route, IndexRoute, browserHistory, HistoryLocation} from 'react-router'

import Sidebar from './Sidebar.jsx'
import Home from './home.jsx'
import Article from './article.jsx'
import ArticleInfo from './articleInfo.jsx'
import Message from './message.jsx'
import About from './about.jsx'

import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import NotFound from './NotFound.jsx'

require('./index.less')

// history 用来和React-router配合，使用html5的history API，默认使用的是hash
const history = useBasename(createHistory)({
  basename: ''
});

class App extends Component{
    constructor(){
        super(...arguments)
    }
    render(){
        return <div>
            <Nav />
            <div className="main">
                <Sidebar/>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
            <Footer />
        </div>
    }
} 

render((
    <Router history={history}>
        <Route path='/' component={ App }>
            <Route path='home' component={ Home } />
            <Route path='article' component={ Article } />
            <Route path='article/:id' component={ ArticleInfo } />
            <Route path='message' component={ Message } />
            <Route path='about' component={ About } />
            {/* path='*' 表示默认路由 */}
            <Route path='*' component={ NotFound } />
        </Route>
    </Router>
) ,
    document.getElementById('app')
)
