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

function DOMRender(Component, ele) {
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

    let tokens = tokenizer(addQuote(template))
    let ast = parser(tokens)
    let {node, refs} = transform(ast, newState, listeners, ele, components)

    // 添加refs，组件不直接调用dom
    newState.refs = refs

    // ele.appendChild(node)
    console.log('componentDidMount', newState.componentDidMount)
    newState.componentDidMount && newState.componentDidMount()
}

// 给标签内的字符串添加双引号，方便token解析
function addQuote(template) {
    let str = template.replace(/>([^<]+)</g, function($0, $1){
        let str = $1.trim().replace(/\{([^}]+)\}/g, function($0){
            return `"${$0}"`
        })

        return str ? `>"${str}"<` : $0
    })

    return str
}

// 生成可以observe的数据，并新增一个事件监听器，用来监听数据的变化
function Ob(state) {
    let listeners = []

    let newState = window.fuck = observe(state, true, (...args) => {
        listeners.forEach(listener => listener(...args))
    })

    return {newState, listeners}
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
    DOMRender
}
export {
    Component,
    DOMRender
}
