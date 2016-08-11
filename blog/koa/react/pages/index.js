import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'
import Main from './App'
import Home from './Home'
import About from './About'
import Article from './Article'
import Details from './Article/Details'
import ArticleNew from './Article/New'
import NotFound from './NotFound'
import Login from './Login'


// React.initializeTouchEvents(true)

class App extends React.Component{
    render(){
        return <Router history={hashHistory}>
            <Route path="/" component={Main}>
              <Route path="about" component={About}/>
              <Route path="article" component={Article}>
              </Route>
              <Route path="article/new" component={ArticleNew}/>
              <Route path="article/edit/:id" component={ArticleNew}/>
              <Route path="article/:id" component={Details} />
              <Route path="/Login" component={Login} />
              <Route path="*" component={NotFound}/>
            </Route>
          </Router>
    }
}

// 必要工具初始化
Utils.init().then(msg => {
    ReactDom.render(<App></App>, document.getElementById('app'))
})
