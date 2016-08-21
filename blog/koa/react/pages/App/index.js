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
    render(){
        let state = this.state
        let props = this.props

        return <div>
            <Header sidebar={state.sidebar}
                    handleSidebarChange={this.handleSidebarChange.bind(this)}/>
            <Sidebar {...props} sidebar={state.sidebar} />
            <div className={`main`} >
                <div className={`${state.sidebar?'':'sidebar-hide'} content`}>
                    {this.props.children ? this.props.children : <Home/> }
                </div>
            </div>
            <Footer/>
            <Modal></Modal>
        </div>
    }
}

export default Main
