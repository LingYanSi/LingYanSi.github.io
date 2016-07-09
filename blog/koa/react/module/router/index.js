import React,{Component} from 'react'
import url_match from './url_match.js'

class Router extends Component{
    componentDidMount(){
        Router.self = this
    }
    getChild(children, preUrl='', currentURL){
        // return this.props.children
        return React.Children.map( children, Item => {
            // 这里是一个路由的匹配校验

            if(!Item.props) return
            let path = preUrl + Item.props.path
            let params = url_match(path, currentURL)

            // console.log('路径', path, params);

            if( params ){
                let Com = Item.props.component
                // 把url参数传递给组件
                return <Com params={params}>
                    {this.getChild(Item.props.children, path, currentURL)}
                </Com>
            }
        })
    }
    render(){
        const currentURL = Router.currentURL
        console.log('实际路径', currentURL);
        return <div>
            {this.getChild(this.props.children,'', currentURL)}
        </div>
    }
}

Router.urlChange = function ( url) {
    // url变化后，强制更新Router
    Router.currentURL = url
    Router.self.forceUpdate()
}

Router.currentURL = '/'


class Link extends Component{
    render(){
        let props = this.props

        return <a onClick={Router.urlChange.bind(this, props.to)} {...props}>
            {props.title}
            {props.children}
        </a>
    }
}

class Route extends Component{
    render() {
        // route不会渲染

        return null
    }
}

export {Router, Route, Link}
