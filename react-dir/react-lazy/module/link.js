import {Component} from 'react'
import Router from 'module/router'

class Link extends Component{
    handleClick(event){
        event.preventDefault()
        Router.pushState(this.props.href)
    }
    render(){
        return <a href={this.props.href} onClick={this.handleClick.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default Link
