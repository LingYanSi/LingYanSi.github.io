import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import Main from './App/index.js'
import Home from './Home/index.js'
import About from './About/index.js'
import Article from './Article/index.js'
import Details from './Article/Details/index.js'
import ArticleNew from './Article/New/index.js'
import NotFound from './NotFound/index.js'

window.sidebar = {
    hide: true
}

// React.initializeTouchEvents(true)

class App extends React.Component{
    render(){
        return <Router history={browserHistory}>
            <Route path="/" component={Main}>
              <Route path="about" component={About}/>
              <Route path="article" component={Article}>
              </Route>
              <Route path="article/new" component={ArticleNew}/>
              <Route path="article/edit/:id" component={ArticleNew}/>
              <Route path="article/:id" component={Details} />
              <Route path="*" component={NotFound}/>
            </Route>
          </Router>
    }
}

ReactDom.render(<App></App>, document.getElementById('app'))
