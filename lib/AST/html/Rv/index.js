// let tokenizer = require('./tokenizer')
// let parser = require('./parser')

// scope 作用域问题
// expr : expr ? expr : expr
//      | element &&

// 为什么我们需要把数据处理写到jsx中
// 按理说jsx应该是只一个view层，只负责数据的渲染吗？

import tokenizer from './tokenizer'
import parser from './parser'
import transform from './transform'
import observe from './observe'

function DOMRender(Component, $parent, props = {}) {
    let fuck = new Component()
    let {data, method, template, components } = fuck

    let state = Object.assign({}, data, method)
    let {newState, listeners} = Ob(state)

    // 更该function指向newState
    for (let key in newState) {
        if (newState.hasOwnProperty(key) && typeof newState[key] == 'function') {
            newState[key] = newState[key].bind(newState)
        }
    }

    ;['componentDidMount', 'componentWillMount', 'componentWillUnMount', 'componentUnMount'].forEach(key => {
        let fun = fuck[key] || function(){}
        newState[key] = fun.bind(newState)
    })

    newState.props = props

    let tokens = tokenizer(addQuote(template))
    let ast = parser(tokens)
    let {refs, events, children, exprAtrributeQueue} = transform(ast, newState, listeners, $parent, components, props)

    // 添加refs，组件不直接调用dom
    newState.refs = refs

    // ele.appendChild(node)
    newState.componentDidMount && newState.componentDidMount()

    return {
        refs,
        events,
        children,
        exprAtrributeQueue
    }
}

// 给标签内的字符串添加双引号，方便token解析
function addQuote(template) {
    let str = template.replace(/>([^<]+)</g, function($0, $1){
        let str = $1.trim().replace(/\{([^}]+)\}/g, function($0){
            return `"${$0}"`
        })

        str = str ? `>"${str}"<` : $0
        return str.replace(/""/g, '')
    })

    return str
}

// 生成可以observe的数据，并新增一个事件监听器，用来监听数据的变化
function Ob(state) {
    let listeners = new ExprAtrributeQueue()

    let newState = observe(state, true, (...args) => {
        listeners.cache.forEach((listener, index) => {
            listener.callback(...args)
        })
    })

    return {newState, listeners}
}

// 属性为一个表达式的情况
// 一个组件的所有属性都在其中
class ExprAtrributeQueue {
    constructor(){
        this.cache = []
    }
    push($ele, id, callback){
        this.cache.push({
            id,
            callback,
            $ele
        })
    }
    remove(id, callback){
        this.cache = this.cache.filter(i => {
            if (callback) {
                return i.id != id && i.callback != callback
            }

            return i.id != id
        })
    }
    // 卸载子元素上的无属性监听
    unmountChildrenAttrs($parent){
        $parent.children && [...$parent.children].forEach($child => {
            this.unmount($child.__RVID)
            this.unmountElementAttrs($child)
        })
    }
    // 卸载元素、及其子元素的属性监听
    unmountElementAttrs($parent){
        this.unmount($parent.__RVID)
        this.unmountChildrenAttrs($parent)
    }
    // 卸载指定id的事件监听
    unmount(ID){
        this.remove(ID)
    }
}

// 组件卸载，移除事件监听，移除

// 单组件可以运行，下面还是有组件嵌套，组件通信、样式隔离，作用域隔离等等

class Component {
    constructor(){
        console.log('初始化了')
        console.log(this)
    }
}

window.Rv = {
    Component,
    DOMRender,
    __id: 0
}
export {
    Component,
    DOMRender
}
