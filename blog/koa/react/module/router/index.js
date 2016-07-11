import React,{Component} from 'react'
import url_match from './url_match.js'
import use from './history.js'

class Router extends Component{
    constructor(){
        super()
        // 返回一个更改url的方法
        let his = use('pathname', Router.forceUpdate)
        Router.changeUrl = his.changeUrl
        Router.currentURL = his.getPath()
    }
    componentDidMount(){
        Router.self = this
    }
    getChild(children, preUrl='', currentURL){
        // return this.props.children
        let arr = []

        React.Children.map( children , item => item)
            .some( Item => {
                // 这里是一个路由的匹配校验

                if(!Item.props) return
                let path = preUrl + Item.props.path
                let params = url_match(path, currentURL)

                console.log('路径', path, params);

                if( params ){
                    let Com = Item.props.component
                    // 把url参数传递给组件
                    arr.push(<Com params={params}>
                        {Item.props.children && this.getChild(Item.props.children, path, currentURL)}
                    </Com>)

                    return true
                }
        })

        return arr
    }
    render(){
        const currentURL = Router.currentURL
        // console.log('实际路径', currentURL);
        return <div>
            {this.getChild(this.props.children,'', currentURL)}
        </div>
    }
}

//
Router.loadTo = function(url ){
    // url更改函数，他去更改url，url又会触发回掉函数，所以说还需要一个参数，便是修改url，但不触发回掉函数
    Router.changeUrl && Router.changeUrl(url)
    Router.forceUpdate(url)
}

Router.forceUpdate = function ( url) {
    // url变化后，强制更新Router

    Router.currentURL = url
    Router.self.forceUpdate()
}



class Link extends Component{
    render(){
        let props = this.props

        return <a onClick={Router.loadTo.bind(this, props.to, false)} {...props}>
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
