import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Header from './../Header/index.js'
import Footer from './../Footer/index.js'
import Sidebar from './../Sidebar/index.js'

import Home from './../Home/index.js'
import Modal from 'module/modal/index.js'

require('./index.scss')

class Main extends Component{
    constructor(){
        super()
        this.state = {
            sidebar: false
        }
    }
    handleSidebarChange(){
        this.setState({
            sidebar: !this.state.sidebar
        })
    }
    componentDidMount(){

    }
    render(){
        let state = this.state

        return <div>
            <Modal></Modal>
            <Header sidebar={state.sidebar} />
            <div className="main">
                <Sidebar sidebar={state.sidebar}
                        handleSidebarChange={this.handleSidebarChange.bind(this)} />
                <div className={`${state.sidebar?'':'sidebar-hide'} content`}>
                    {this.props.children ? this.props.children : <Home/> }
                </div>
            </div>
            <Footer/>
        </div>
    }
}

export default Main
