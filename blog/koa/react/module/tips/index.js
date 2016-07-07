import React,{Component} from 'react'

require('./index.scss')

class Tips extends Component{
    constructor(){
        super()
    }
    render(){
        let props = this.props

        return <div className="tips">
            <a href={props.url ? props.url : 'javascript:0;'} target="_blank">
                {props.content}
            </a>
            <button onClick={props.close}>x</button>
        </div>
    }
}

export default Tips
