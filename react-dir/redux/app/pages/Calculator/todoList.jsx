import React,{Component} from 'react'
import ReactDom,{render, findDOMNode} from 'react-dom'

export class TodoList extends Component{
    constructor(){
        super()
    }
    onClick(index){
        this.props.onTodoClick(index)
    }
    render(){
        const { todos } = this.props
        return (<div>
            {todos.map((ele, index)=>{
                return <div onClick={this.onClick.bind(this,index)}>
                    <input type="checkbox" checked={ele.completed} />
                    <span>{ele.text}</span>
                </div>
            })}
        </div>)
    }
}

export default TodoList
