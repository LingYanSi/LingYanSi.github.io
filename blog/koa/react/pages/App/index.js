import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Header from 'pages/Header'
import Footer from 'pages/Footer'
import Sidebar from 'pages/Sidebar'

import Home from 'pages/Home'
import Modal from 'module/Modal'

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
