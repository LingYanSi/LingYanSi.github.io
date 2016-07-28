import React,{Component} from 'react'

class Wrap extends Component{
    render(){
        let store = this.props.store
        let App = this.props.children
        return <div>
            <h1>App</h1>
            <App fuck={}></App>
        </div>
    }
}

export default Wrap
