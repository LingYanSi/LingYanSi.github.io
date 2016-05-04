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
    getColor( state){
        const { visibilityFilter } = this.props
        return visibilityFilter==state ?'red' : ''
    }
    render(){

        return (<div>
            <button onClick={this.props.onShowAll}
                style={{background:this.getColor('SHOW_ALL') }}>all</button>
            <button onClick={this.props.onShowComplete}
                style={{background:this.getColor('SHOW_COMPLETED') }}>complete</button>
            <button onClick={this.props.onShowActive}
                style={{background:this.getColor('SHOW_ACTIVE') }}>active</button>
        </div>)
    }
}

export default Add
