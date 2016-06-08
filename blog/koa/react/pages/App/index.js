import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Header from './../Header/index.js'
import Footer from './../Footer/index.js'
import Sidebar from './../Sidebar/index.js'

import Home from './../Home/index.js'

require('./index.scss')

class Main extends Component{
    render(){
        return <div>
            <Header/>
            <div className="mian">
                <Sidebar />
                <div className="content">
                    {this.props.children ? this.props.children : <Home/> }
                </div>
            </div>
            <Footer/>
        </div>
    }
}

export default Main
