
import React,{Component} from 'react'
import ReactDOM,{render} from 'react-dom'

// import Calendar from 'rc-calendar'

import {Router , Link, Route, browserHistory} from 'react-router'

import Nav from './nav.jsx'
import Home from './home.jsx'
import Article from './article.jsx'
import Message from './message.jsx'
import About from './about.jsx'

require('./index.less')


class App extends Component{
    constructor(){
        super(...arguments)
    }
    render(){
        return <div className="main">
            <Nav/>
            <div className="content">
                {this.props.children}
            </div>
        </div>
    }
}

render((
    <Router history={browserHistory}>
        <Route path='/' component={ App }>
            <Route path='home' component={ Home } />
            <Route path='article' component={ Article } />
            <Route path='message' component={ Message } />
            <Route path='about' component={ About } />
        </Route>
    </Router>
) ,
    document.getElementById('app')
)
