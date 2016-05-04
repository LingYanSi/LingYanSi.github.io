import React,{Component} from 'react'
import ReactDom,{render, findDOMNode} from 'react-dom'

export class Add extends Component{
    constructor(){
        super()
    }
    onClick(){
        var ele = findDOMNode(this.refs.input)
        var text = ele.value
        this.props.onAddClick(text)
        this.props.onFuck(text)
        ele.value = ''
    }
    render(){
        return (<div>
            <input ref="input" type="text"/><button onClick={this.onClick.bind(this) }>add</button>
        </div>)
    }
}

export default Add
